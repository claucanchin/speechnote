import React, { Component } from 'react';
import './App.css';

import Content from './components/content/content';
import Toggle from './components/toggle/toggle';

class App extends Component {

	constructor(){
		super();
		this.state = {
            list: [],
            deletedList: [],
            inputText: "",
            story: [],
            deletedStory: [],
            isStory: true,
            isSpeak: true,
	   };
        this.submitHandlerList = this.submitHandlerList.bind(this);
        this.removeHandlerList = this.removeHandlerList.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandlerStory = this.submitHandlerStory.bind(this);
        this.removeHandlerStory = this.removeHandlerStory.bind(this);
        this.onStoryChanged = this.onStoryChanged.bind(this);
        this.onSpeakChanged = this.onSpeakChanged.bind(this);
	}

    componentDidMount() {
        Promise.all([fetch('/todos'), fetch('/story')])

        .then(([res1, res2]) => {
            return Promise.all([res1.json(), res2.json()])
        })
        .then(([res1, res2]) => {
            this.setState({list: res1})
            this.setState({story: res2})
        });
    }

    changeHandler(event) {
        this.setState({inputText: event.target.value});
        // console.log(event.target.value)
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

        } else {
            alert("Error: 'Task' must be more than 1 character!");
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

        } else {
            alert("Error: 'Task' must be more than 1 character!");
            this.setState({ inputText: "" })
        }
    }

    removeHandlerList(event) {
        // console.log(event.target.value)
        let index = event.target.value
        let newList = this.state.list
        let newDeletedList = this.state.deletedList
        // console.log('deleted item',newList[index])
        //add deleted item to delete list
        newDeletedList.push(newList[index])
        // console.log('deleted stuff:', newDeletedList)

        //remove item from to-do list
        newList.splice(index, 1)
        this.setState({
            list: newList,
            deletedList: newDeletedList
        });
    }

    removeHandlerStory(event) {
        // console.log(event.target.value)
        let index = event.target.value
        let newStory = this.state.story
        let newDeletedStory = this.state.deletedStory
        // console.log('deleted item',newList[index])
        //add deleted item to delete list
        newDeletedStory.push(newStory[index])
        // console.log('deleted stuff:', newDeletedList)

        //remove item from to-do list
        newStory.splice(index, 1)
        this.setState({
            story: newStory,
            deletedStory: newDeletedStory
        });
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

                <div className="heading text-center">speech.to.text</div>

                <div className="container">

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
                        removeHandlerList={(e) => {this.removeHandlerList(e)}}
                        submitHandlerList={(e) => {this.submitHandlerList(e)}}
                        changeHandler={(e) => {this.changeHandler(e)}}
                        inputText={this.state.inputText}
                        story={this.state.story}
                        removeHandlerStory={(e) => {this.removeHandlerStory(e)}}
                        submitHandlerStory={(e) => {this.submitHandlerStory(e)}}
                    />

                </div>
            </React.Fragment>
		);
	}
}

export default App;
