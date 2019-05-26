import React from 'react';
import './list.css';

class List extends React.Component {

    render() {
        // console.log("list propssss:",this.props.data);
        let tasks = this.props.list.map((todo, index) => {

            return  <div key={index}>
                        <div className="row">
                            <div className="col-sm-9 todo">
                                {todo.task}
                            </div>
                            <div className="col-sm-3 remove">
                                <button value={index} onClick={this.props.removeHandler}>Remove</button>
                            </div>
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

export default List;