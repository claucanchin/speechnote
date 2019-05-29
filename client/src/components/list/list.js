import React from 'react';
import './list.css';

class List extends React.Component {

    render() {
        // console.log("list propssss:",this.props.list);
        let tasks = this.props.list.map((todo, index) => {

            return  <div key={index} className="row list align-items-center">
                        <div className="col-sm-6 col-6">
                            {todo.task}
                        </div>
                        <div className="col-sm-6 col-6 remove align-middle">
                            <button value={index}
                                className="btn btn-outline-danger btn-sm"
                                onClick={(e) => {this.props.removeHandlerList(e, todo.id)
                            }}>Remove
                            </button>
                        </div>
                    </div>
        }).reverse();

        return (
            <React.Fragment>
                {tasks}
            </React.Fragment>
        );
    }
}

export default List;