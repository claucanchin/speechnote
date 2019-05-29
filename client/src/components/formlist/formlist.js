import React from 'react';
import './formlist.css';

class Formlist extends React.Component {
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
                    }}>
                        <div className={this.state.isPulsing ? "pulse-ring" : ""}></div>
                        <i className="fa fa-microphone"></i>
                    </button>;
        } else {
            button = <button type="submit" className="btn btn-primary">Add Item</button>;
        }
        return (
            <form onSubmit={(e) => {this.props.submitHandlerList(e)}}>
                    <label>
                        <input className="form-control" type="text" name="task" placeholder="order pizza"
                        value={this.props.inputText}
                        onChange={this.props.changeHandler}
                        />
                    </label>
                    <div>{button}</div>
                </form>
        );
    };
}

export default Formlist;