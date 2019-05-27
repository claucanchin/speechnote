import React from 'react';

class Toggle extends React.Component {

    render() {
        return (
            <React.Fragment>
                    <div className="row">
                        <div className="col-sm-8"></div>
                        <div className="col-sm-4 flex-container">

                                <div className="togcapsule1 btn-group btn-group-toggle" data-toggle="buttons">
                                  <label className="btn btn-outline-secondary active btn-sm">
                                    <input type="radio" name="options" id="optionSpeak" autoComplete="off" checked/> Speak
                                  </label>
                                  <label className="btn btn-outline-secondary btn-sm">
                                    <input type="radio" name="options" id="optionType" autoComplete="off"/> Type
                                  </label>
                                </div>

                                <div className="togcapsule2 btn-group btn-group-toggle" data-toggle="buttons">
                                  <label className="btn btn-outline-secondary active btn-sm">
                                    <input type="radio" name="options" id="optionList" autoComplete="off" checked/> List
                                  </label>
                                  <label className="btn btn-outline-secondary btn-sm">
                                    <input type="radio" name="options" id="optionStory" autoComplete="off"/> Story
                                  </label>
                                </div>
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}

export default Toggle;