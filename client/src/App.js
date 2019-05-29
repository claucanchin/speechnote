import React, { Component } from 'react';
import './App.css';

import Content from './components/content/content';
import Toggle from './components/toggle/toggle';

class App extends Component {

    constructor() {
        super();
        this.state = {
            list: [],
            deletedList: [],
            inputText: "",
            story: [],
            deletedStory: [],
            isStory: true,
            isSpeak: true,
            isRecordingStarted: false,
            audioContext: null,
            myStream: null,
            scriptProcessor: null,
            audioSocket: null,
        };
        this.submitHandlerList = this.submitHandlerList.bind(this);
        this.removeHandlerList = this.removeHandlerList.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandlerStory = this.submitHandlerStory.bind(this);
        this.removeHandlerStory = this.removeHandlerStory.bind(this);
        this.onStoryChanged = this.onStoryChanged.bind(this);
        this.onSpeakChanged = this.onSpeakChanged.bind(this);

        this.triggerAudioRecording = this.triggerAudioRecording.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.streamAudioData = this.streamAudioData.bind(this);
        this.stopAudioRecording = this.stopAudioRecording.bind(this);
        this.initAndStartAudioRecording = this.initAndStartAudioRecording.bind(this);
        this.setupAudioSocket = this.setupAudioSocket.bind(this);
    }

    componentDidMount() {
        Promise.all([fetch('/todos'), fetch('/story')])

            .then(([res1, res2]) => {
                return Promise.all([res1.json(), res2.json()])
            })
            .then(([res1, res2]) => {
                this.setState({ list: res1 })
                this.setState({ story: res2 })
            });
    }

    triggerAudioRecording() {
        if (this.state.isRecordingStarted) {
            this.stopAudioRecording();
            this.setState({ isRecordingStarted: !this.state.isRecordingStarted });
        } else {
            this.initAndStartAudioRecording();
            this.setState({ isRecordingStarted: !this.state.isRecordingStarted });
        }
    }

    stopAudioRecording() {
        if (this.state.myStream) {
            this.state.myStream.getTracks()[0].stop();
            this.setState({ myStream: null });
        }
        if (this.state.scriptProcessor) {
            this.state.scriptProcessor.removeEventListener('audioprocess', this.streamAudioData);
        }
        if (this.state.audioSocket) {
            this.state.audioSocket.close();
            this.setState({ audioSocket: null });
        }
    }

    initAndStartAudioRecording() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.mediaDevices.getUserMedia({
                audio: {
                    mandatory: {
                        googEchoCancellation: 'false',
                        googAutoGainControl: 'false',
                        googNoiseSuppression: 'false',
                        googHighpassFilter: 'false',
                    },
                },
            }).then(this.startRecording)
            .catch(e => {
                /* If there are some errors with parameter configurations or
    user didn’t give you the access to the microphone inside the browser, you end here. */
                console.log(e);
            });
    }

    startRecording(stream, callback) {
        let AudioContext = window.AudioContext || window.webkitAudioContext;
        this.setState({
            audioContext: this.state.audioContext || new AudioContext({ latencyHint: 'interactive' }),
        })
        if (!this.state.audioContext) {
            return;
        }

        // AudioNode used to control the overall gain (or volume) of the audio graph
        const inputPoint = this.state.audioContext.createGain();
        this.setState({
            myStream: stream,
            scriptProcessor: inputPoint.context.createScriptProcessor(2048, 1, 1)
        });
        const microphone = this.state.audioContext.createMediaStreamSource(this.state.myStream);
        const analyser = this.state.audioContext.createAnalyser();

        microphone.connect(inputPoint);
        inputPoint.connect(analyser);
        inputPoint.connect(this.state.scriptProcessor);
        this.state.scriptProcessor.connect(inputPoint.context.destination);
        // This is for registering to the “data” event of audio stream, without overwriting the default scriptProcessor.onAudioProcess function if there is one.
        this.state.scriptProcessor.addEventListener('audioprocess', this.streamAudioData);
    }

    // Function that streams the data to our nodejs backend.
    streamAudioData(e) {
        if (!this.state.audioSocket) {
            this.setupAudioSocket();
        }
        const floatSamples = e.inputBuffer.getChannelData(0);
        if (this.state.audioSocket.readyState === this.state.audioSocket.OPEN) {
            this.state.audioSocket.send(this.downsampleBuffer(floatSamples, 44100, 16000));
        }
    };

    downsampleBuffer(buffer, sampleRate, outSampleRate) {
        if (outSampleRate === sampleRate) {
            return buffer;
        } else if (outSampleRate > sampleRate) {
            let errorMessage = { code: 418, message: "downsampling rate show be smaller than original sample rate" };
            throw errorMessage;
            // throw "downsampling rate show be smaller than original sample rate";
        }
        let sampleRateRatio = sampleRate / outSampleRate;
        let newLength = Math.round(buffer.length / sampleRateRatio);
        let result = new Int16Array(newLength);
        let offsetResult = 0;
        let offsetBuffer = 0;
        while (offsetResult < result.length) {
            let nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
            let accum = 0,
                count = 0;
            for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
                accum += buffer[i];
                count++;
            }

            result[offsetResult] = Math.min(1, accum / count) * 0x7FFF;
            offsetResult++;
            offsetBuffer = nextOffsetBuffer;
        }
        return result.buffer;
    }


    setupAudioSocket() {
        if (!this.state.audioSocket) {
            let aWS = new WebSocket('ws://localhost:3002');
            aWS.onerror = (err) => { console.log('audioSocket error', err) };
            aWS.onopen = () => { console.log('audioSocket open') }
            aWS.onclose = () => { console.log('audioSocket closed') }
            aWS.onmessage = (data) => {
                // let spoken = data.data.substr(1).slice(0, -1);
                // if (spoken == "delete everything") {
                //     this.setState({ story: [] })
                // }
                this.setState({ inputText: this.state.inputText + data.data.substr(1).slice(0, -1) });
            }
            this.setState({ audioSocket: aWS });
        }
    }

    changeHandler(event) {
        this.setState({ inputText: event.target.value });
    }

    submitHandlerList(event) {
        let newList = this.state.list;
        let inputTask = event.target.task.value;
        event.preventDefault();

        if (inputTask.length > 1) {
            newList.push({
                task: inputTask,
            });

            this.setState({
                list: newList,
                inputText: ""
            })

            let url = "/todos";
            let data = { task: inputTask };
            fetch(url, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .then(response => console.log('Success:', JSON.stringify(response)))
                .catch(error => console.error('Error:', error));

        } else {
            // alert("Error: 'Item' must be more than 1 character!");
            this.setState({ inputText: "" })
        }
    }


    submitHandlerStory(event) {
        let newStory = this.state.story;
        let inputWords = event.target.words.value;
        event.preventDefault();

        if (inputWords.length > 1) {
            newStory.push({
                words: inputWords,
            });

            this.setState({
                story: newStory,
                inputText: ""
            })

            let url = "/story";
            let data = { words: inputWords };

            fetch(url, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .then(response => console.log('Success:', JSON.stringify(response)))
                .catch(error => console.error('Error:', error));

        } else {
            // alert("Error: 'Story' must be more than 1 character!");
            this.setState({ inputText: "" })
        }
    }

    removeHandlerList(event, id) {

        let index = event.target.value
        let newList = this.state.list
        let newDeletedList = this.state.deletedList

        //add deleted item to delete list
        newDeletedList.push(newList[index])

        //remove item from to-do list
        newList.splice(index, 1)
        this.setState({
            list: newList,
            deletedList: newDeletedList
        });

        fetch(`/todos/${id}/delete`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            })
            .then(res => res.json())
            .then(res => console.log(res))
    }

    removeHandlerStory(event, id) {

        let index = event.target.value
        let newStory = this.state.story
        let newDeletedStory = this.state.deletedStory

        //add deleted item to delete list
        newDeletedStory.push(newStory[index])

        //remove item from story
        newStory.splice(index, 1)
        this.setState({
            story: newStory,
            deletedStory: newDeletedStory
        });

        fetch(`/story/${id}/delete`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            })
            .then(res => res.json())
            .then(res => console.log(res))
    }

    onStoryChanged(isStory) {
        this.setState({
            isStory: (isStory === "story")
        });
    }

    onSpeakChanged(isSpeak) {
        this.setState({
            isSpeak: (isSpeak === "speak")
        });
    }

    render() {
        return (
            <React.Fragment>

                <div className="heading text-center">
                    <img src="/images/logo.png" width="140" height="150" alt="logo"/>
                </div>


                <div className="container mainbox">

                    <Toggle
                        isStory={this.state.isStory}
                        isSpeak={this.state.isSpeak}
                        onStoryChanged={this.onStoryChanged}
                        onSpeakChanged={this.onSpeakChanged}
                    />
                    <Content
                        isStory={this.state.isStory}
                        isSpeak={this.state.isSpeak}
                        list={this.state.list}
                        removeHandlerList={this.removeHandlerList}
                        submitHandlerList={(e) => {this.submitHandlerList(e)}}
                        changeHandler={(e) => {this.changeHandler(e)}}
                        inputText={this.state.inputText}
                        story={this.state.story}
                        removeHandlerStory={this.removeHandlerStory}
                        submitHandlerStory={(e) => {this.submitHandlerStory(e)}}
                        triggerAudioRecording={this.triggerAudioRecording}
                    />
                </div>
                <div className="footer">
                    <div className="copyright">Copyright © 2019 Claucanchin, Inc. All rights reserved.</div>
                        <a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a>
                </div>
            </React.Fragment>
        );
    }
}

export default App;