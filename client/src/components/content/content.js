import React from 'react';

import Formlist from '../formlist/formlist';
import List from '../list/list';
import Formstory from '../formstory/formstory';
import Story from '../story/story';

class Content extends React.Component {

    render() {
      let heading;
      let form;
      let contentList;
      if (this.props.isStory) {
        heading = "STORY";
        contentList = <Story
                story={this.props.story}
                removeHandlerStory={this.props.removeHandlerStory}
              />;
        form = <Formstory
                submitHandlerStory={(e) => {this.props.submitHandlerStory(e)}}
                changeHandler={(e) => {this.props.changeHandler(e)}}
                inputText = {this.props.inputText}
                isSpeak = {this.props.isSpeak}
                />;
      } else {
        heading = "LIST";
        contentList = <List
                  list={this.props.list}
                  removeHandlerList={this.props.removeHandlerList}
                />;
        form = <Formlist
                submitHandlerList={(e) => {this.props.submitHandlerList(e)}}
                changeHandler={(e) => {this.props.changeHandler(e)}}
                inputText={this.props.inputText}
                isSpeak = {this.props.isSpeak}
                />;
      }

        return (
            <React.Fragment>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="title text-center">{heading}</div>
                        </div>
                        <div className="col-sm-4"></div>
                    </div>

                    <div className="row">
                        <div className="col-sm-8">
                          <div>{ contentList }</div>
                        </div>
                        <div className="col-sm-4 text-center">
                            <div>
                              { form }
                            </div>
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}

export default Content;