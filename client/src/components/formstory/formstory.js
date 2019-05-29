import React from 'react';
import './formstory.scss';

class Formstory extends React.Component {
    constructor() {
        super();
        this.state = {
            isPulsing: false,
        };
    };

    render() {
        let button;
        if (this.props.isSpeak) {
            button = <button type="submit" id="speech" className="btn"
                    onClick={ (e) => {
                        this.setState({isPulsing: !this.state.isPulsing});
                        this.props.triggerAudioRecording();
                    }} >
                        <div className={this.state.isPulsing ? "pulse-ring" : ""}></div>
                        <i className="fa fa-microphone"></i>
                      </button>;
        } else {
            button = <button type="submit" className="btn btn-primary">Add Story</button>
        }

        return (
            <span>
                <form onSubmit={(e) => {this.props.submitHandlerStory(e)}}>
                    <label>
                        <textarea className="form-control" name="words" placeholder="once upon a time" rows="4"
                        value={this.props.inputText}
                        onChange={this.props.changeHandler}
                        >
                        </textarea>
                    </label>
                    <div>{button}</div>
                </form>
          </span>
        );
    }
}

export default Formstory;