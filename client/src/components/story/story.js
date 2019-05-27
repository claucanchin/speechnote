import React from 'react';
import './story.css';

class Story extends React.Component {

    render() {
        console.log("story propssss:",this.props.story);
        let stories = this.props.story.map((story, index) => {

            return  <div key={index}>
                        <div className="d-flex justify-content-between story">
                            {story.words}
                            <button value={index} className="btn btn-outline-danger btn-sm" onClick={this.props.removeHandlerStory}>Remove</button>
                        </div>
                    </div>
        });

        return (
            <React.Fragment>
                {stories}
            </React.Fragment>
        );
    }
}

export default Story;