import React from 'react';
import './story.css';

class Story extends React.Component {

    render() {
        // console.log("story propssss:",this.props.story);
        let stories = this.props.story.map((story, index) => {

            return  <div key={index} className="row story align-items-center">
                        <div className="col-md-8 col-8">
                            {story.words}
                        </div>
                        <div className="col-md-4 col-4 remove">
                            <button value={index}
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={(e) => {this.props.removeHandlerStory(e, story.id)
                                }}>Remove
                            </button>
                        </div>
                    </div>
        }).reverse();

        return (
            <React.Fragment>
                {stories}
            </React.Fragment>
        );
    }
}

export default Story;