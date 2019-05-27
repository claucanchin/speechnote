module.exports = db => {

    let getAll = (req, res) => {
        db.story.getAll(req, (err, result) => {
            !err ? res.status(200).send(result) : console.error(err);
        })
    }

    let createStory = (request, response) => {
        console.log('from the controller ',request.body)
        db.story.createOne(request, (error, story) => {
            !error ? response.status(200).send(story) : console.error(error);
        })
    }

    return {
        getAll: getAll,
        createStory: createStory,
    }
};