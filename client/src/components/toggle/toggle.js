import React from 'react';

class Toggle extends React.Component {

    render() {
        return (
            <React.Fragment>
                    <div className="row">
                        <div className="col-md-8"></div>
                        <div className="col-md-4 flex-container">

                            <div className="togcapsule1 btn-group btn-group-toggle" data-toggle="buttons">
                              <label className={"btn btn-outline-light btn " + (this.props.isStory ? 'active' : '')} onClick={() => this.props.onStoryChanged("story")}>
                                <input type="radio" name="options" id="optionStory" autoComplete="off" /> Story
                              </label>
                              <label className={"btn btn-outline-light btn " + (!this.props.isStory ? 'active' : '')} onClick={() => this.props.onStoryChanged("list")}>
                                <input type="radio" name="options" id="optionList" autoComplete="off" /> List
                              </label>
                            </div>

                            <div className="togcapsule2 btn-group btn-group-toggle" data-toggle="buttons">
                              <label className={"btn btn-outline-light btn " + (this.props.isSpeak? 'active': '')} onClick={() => this.props.onSpeakChanged("speak")}>
                                <input type="radio" name="options" id="optionSpeak" autoComplete="off"/> Speak
                              </label>
                              <label className={"btn btn-outline-light btn " + (!this.props.isSpeak? 'active': '')} onClick={() => this.props.onSpeakChanged("type")}>
                                <input type="radio" name="options" id="optionType" autoComplete="off"/> Type
                              </label>
                            </div>

                        </div>
                    </div>
            </React.Fragment>
        );
    }
}

export default Toggle;