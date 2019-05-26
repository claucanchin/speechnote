import React from 'react';
import './formstory.scss';

class Formstory extends React.Component {
    render() {
        return (
            <React.Fragment>
                <form onSubmit={(e) => {this.props.submitHandler(e)}}>
                    <label for="storytext">
                        <textarea className="form-control" id="storytext" name="story" placeholder="order pizza" rows="4"
                        value={this.props.word}
                        onChange={this.props.changeHandler}
                        required>
                        </textarea>
                    </label>

                        <button type="submit" id="speech" className="btn">
                            <div className="pulse-ring"></div>
                            <i className="fa fa-microphone"></i>
                        </button>
                </form>
            </React.Fragment>
        );
    }
}

export default Formstory;