import React from 'react';
import './story.css';

class Story extends React.Component {

    render() {
        // console.log("list propssss:",this.props.data);
        let tasks = this.props.list.map((todo, index) => {

            return  <div key={index}>
                        <div className="d-flex justify-content-between story">
                            {todo.task}
                            <button value={index} className="btn btn-outline-danger btn-sm" onClick={this.props.removeHandler}>Remove</button>
                        </div>
                    </div>
        });

        return (
            <React.Fragment>
                {tasks}
            </React.Fragment>
        );
    }
}

export default Story;