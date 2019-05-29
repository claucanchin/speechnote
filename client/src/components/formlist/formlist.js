import React from 'react';
import './formlist.css';

class Formlist extends React.Component {

    // constructor(){
    //     super();
    //     this.state = {
    //         isPulse: false,
    //    };
    //    this.onPulseChanged = this.onPulseChanged.bind(this);

    // onPulseChanged = () => {
    //     return (
    //         let currPulse = this.state.isPulse;
    //         if (currPulse === false) {
    //             this.setState({isPulse: !currPulse});
    //         } else {
    //             this.setState({isPulse: !currPulse});
    //         }
    //     )
    // }

    render() {
        let button;
        if (this.props.isSpeak) {

            button = <button type="submit" id="speech" className="btn" onClick={this.props.triggerAudioRecording}>
                        <div className="pulse-ring"></div>
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