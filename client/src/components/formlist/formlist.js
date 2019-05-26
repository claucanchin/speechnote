import React from 'react';

class Formlist extends React.Component {
    render() {
        return (
            <form onSubmit={(e) => {this.props.submitHandler(e)}}>
                <label>
                    <input className="form-control" type="text" name="task" placeholder="order pizza"
                    value={this.props.word}
                    onChange={this.props.changeHandler}
                    required/>
                </label>
                <button type="submit">+ Task</button>
            </form>
        );
    }
}

export default Formlist;