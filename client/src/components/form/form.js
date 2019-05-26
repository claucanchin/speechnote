import React from 'react';

class Form extends React.Component {
    render() {
        return (
            <form onSubmit={(e) => {this.props.submitHandler(e)}}>
                <label>
                    <input type="text" name="task" placeholder="order pizza"
                    value={this.props.word}
                    onChange={this.props.changeHandler}
                    />
                </label>
                <button type="submit">+ Task</button>
            </form>
        );
    }
}

export default Form;