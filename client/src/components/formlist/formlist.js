import React from 'react';
import './formlist.css';

class Formlist extends React.Component {
    render() {
        return (
                <form onSubmit={(e) => {this.props.submitHandlerList(e)}}>
                    <label>
                        <input className="form-control" type="text" name="task" placeholder="order pizza"
                        value={this.props.inputText}
                        onChange={this.props.changeHandler}
                        required/>
                    </label>
                    <div>
                        <button type="submit" className="btn btn-primary">+ Task</button>
                    </div>
                </form>
        );
    }
}

export default Formlist;