module.exports = db => {

    let getAll = (req, res) => {
        db.story.getAll(req, (err, result) => {
            !err ? res.status(200).send(result) : console.error(err);
        })
    }

    // let createStory = (request, response) => {
    //     db.story.createOne(request, (error, story) => {
    //         !err ? res.status(200).send(story) : console.error(err);
    //     })
    // }

    return {
        getAll: getAll,
        // createStory: createStory,
    }
};