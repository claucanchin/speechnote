import React from 'react';
import './formstory.scss';

class Formstory extends React.Component {
    render() {
      let button;
      if (this.props.isSpeak) {
        button = <button type="submit" id="speech" className="btn">
                        <div className="pulse-ring"></div>
                        <i className="fa fa-microphone"></i>
                      </button>;
      } else {
        button = <button type="submit" className="btn btn-primary">Add Story</button>
      }

        return (
                <form onSubmit={(e) => {this.props.submitHandlerStory(e)}}>
                    <label>
                        <textarea className="form-control" name="words" placeholder="once upon a time" rows="4"
                        value={this.props.inputText}
                        onChange={this.props.changeHandler}
                        required>
                        </textarea>
                    </label>
                    <div>{button}</div>
                </form>
        );
    }
}

export default Formstory;