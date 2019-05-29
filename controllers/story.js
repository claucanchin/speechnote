const { exec } = require("child_process");

module.exports = db => {

    let getAll = (req, res) => {
        db.story.getAll(req, (err, result) => {
            !err ? res.status(200).send(result) : console.error(err);
        })
    }

    let createStory = (request, response) => {
        console.log(request.body.words, "what i said");

        let whatSaid = request.body.words;
        if (whatSaid === "open Sublime") {
            exec("subl .")
        } else if (whatSaid === "hey Simon open Spotify") {
            exec("open -a Spotify")
        } else {
            db.story.createOne(request, (error, story) => {
                !error ? response.status(200).send(story) : console.error(error);
            })
        }
    }

    let deleteStory = (request, response) => {
        db.story.deleteOne(request, (error, story) => {
            !error ? response.status(200).send(story) : console.error(error);
        })
    };

    return {
        getAll: getAll,
        createStory: createStory,
        deleteStory: deleteStory
    }
};