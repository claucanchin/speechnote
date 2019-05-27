import React from 'react';

import Formlist from '../formlist/formlist';
import List from '../list/list';
import Formstory from '../formstory/formstory';
import Story from '../story/story';

class Content extends React.Component {

    render() {
        return (
            <React.Fragment>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="title text-center">LIST</div>
                        </div>
                        <div className="col-sm-4"></div>
                    </div>

                    <div className="row">
                        <div className="col-sm-8">
                            <div>
                                <List
                                list={this.props.list}
                                removeHandler={(e) => {this.props.removeHandler(e)}}
                                />
                            </div>
                            <div>
                                <Story
                                story={this.props.story}
                                removeHandler={(e) => {this.props.removeHandler(e)}}
                                />
                            </div>
                        </div>
                        <div className="col-sm-4 text-center">
                            <div>
                                <Formlist
                                submitHandler={(e) => {this.props.submitHandler(e)}}
                                changeHandler={(e) => {this.props.changeHandler(e)}}
                                inputText={this.props.inputText}
                                />
                            </div>
                            <div>
                                <Formstory
                                submitHandler={(e) => {this.props.submitHandler(e)}}
                                changeHandler={(e) => {this.props.changeHandler(e)}}
                                inputText={this.props.inputText}
                                />
                            </div>
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}

export default Content;