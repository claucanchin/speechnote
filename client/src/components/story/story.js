import React from 'react';
import './story.css';

class Story extends React.Component {

    render() {
        // console.log("story propssss:",this.props.story);
        let stories = this.props.story.map((story, index) => {

            return  <div key={index} className="row">
                        <div className="col-sm-8">
                            {story.words}
                        </div>
                        <div className="col-sm-4">
                            <button value={index}
                                    className="btn btn-outline-danger btn"
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