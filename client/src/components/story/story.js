import React from 'react';
import './story.css';

class Story extends React.Component {

    render() {
        // console.log("list propssss:",this.props.data);
        let words = this.props.story.map((story, index) => {

            return  <div key={index}>
                        <div className="d-flex justify-content-between story">
                            {story.words}
                            <button value={index} className="btn btn-outline-danger btn-sm" onClick={this.props.removeHandler}>Remove</button>
                        </div>
                    </div>
        });

        return (
            <React.Fragment>
                {words}
            </React.Fragment>
        );
    }
}

export default Story;