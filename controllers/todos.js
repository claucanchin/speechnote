module.exports = db => {

    let getAll = (req, res) => {
        db.todos.getAll(req, (err, result) => {
            !err ? res.status(200).send(result) : console.error(err);
        })
    }

    let createTodo = (request, response) => {
        db.todos.createOne(request, (error, todos) => {
            !error ? response.status(200).send(todos) : console.error(error);
        })
    }

    let deleteTodo = (request, response) => {
        db.todos.deleteOne(request, (error, todos) => {
            !error ? response.status(200).send(todos) : console.error(error);
        })
    };


    return {
        getAll: getAll,
        createTodo: createTodo,
        deleteTodo: deleteTodo
    }
};