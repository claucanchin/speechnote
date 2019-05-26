import React, { Component } from 'react';
import './App.css';

import Form from './components/form/form';
import List from './components/list/list';

class App extends Component {

	constructor(){
		super();
		this.state = {
            list: [],
            deleted: [],
            word: "",
	   };
        this.submitHandler = this.submitHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
	}

	componentDidMount(){
		fetch('/todos')
		.then(res => {
			return res.json();
		})
		.then(json => {
            console.log('jsonnn', json)
			this.setState({list: json})
		})
	}

    changeHandler(event) {
        this.setState({word: event.target.value});
        console.log(event.target.value)
    }

    submitHandler(event) {
        let newList = this.state.list;
        let inputTask = event.target.task.value;
        event.preventDefault();

        if (inputTask.length > 1) {
            newList.push({
                task: inputTask,
            });

            this.setState({
                list: newList,
                word: ""
            })

        } else {
            alert("Error: 'Task' must be more than 1 character!");
            this.setState({ word: "" })
        }
    }

    removeHandler(event) {
        // console.log(event.target.value)
        let index = event.target.value
        let newList = this.state.list
        let newDeletedList = this.state.deleted
        // console.log('deleted item',newList[index])
        //add deleted item to delete list
        newDeletedList.push(newList[index])
        console.log('deleted stuff:', newDeletedList)

        //remove item from to-do list
        newList.splice(index, 1)
        this.setState({
            list: newList,
            deleted: newDeletedList
        });
    }

	render() {
		return (
            <React.Fragment>

                <div className="heading text-center">
                    speech.to.text
                </div>

                <div className="container">

                    <div className="row">
                        <div className="col-sm-8">
                        </div>
                        <div className="col-sm-4 d-flex bd-highlight">
                            <div className="d-flex align-items-end">
                            toggle | toggle
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-8">
                            <div className="title text-center">CHECKLIST</div>
                            <div>
                                <List
                                list={this.state.list}
                                removeHandler={(e) => {this.removeHandler(e)}}
                                />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <Form
                            submitHandler={(e) => {this.submitHandler(e)}}
                            changeHandler={(e) => {this.changeHandler(e)}}
                            word={this.state.word}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
		);
	}
}

export default App;