import React from 'react';
import './formlist.css';

class Formlist extends React.Component {
    render() {
      let button;
      if (this.props.isSpeak) {
        button = <button type="submit" id="speech" className="btn">
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
                        required/>
                    </label>
                    <div>{button}</div>
                </form>
        );
    }
}

export default Formlist;