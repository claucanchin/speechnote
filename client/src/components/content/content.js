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
                                removeHandlerList={(e) => {this.props.removeHandlerList(e)}}
                                />
                            </div>
                            <div>
                                <Story
                                story={this.props.story}
                                removeHandlerStory={(e) => {this.props.removeHandlerStory(e)}}
                                />
                            </div>
                        </div>
                        <div className="col-sm-4 text-center">
                            <div>
                                <Formlist
                                submitHandlerList={(e) => {this.props.submitHandlerList(e)}}
                                changeHandler={(e) => {this.props.changeHandler(e)}}
                                inputText={this.props.inputText}
                                />
                            </div>
                            <div>
                                <Formstory
                                submitHandlerStory={(e) => {this.props.submitHandlerStory(e)}}
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