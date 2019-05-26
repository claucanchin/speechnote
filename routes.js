module.exports = (app, db) => {

    const todosController = require('./controllers/todos')(db);
    const storyController = require('./controllers/story')(db);

    app.get('/todos', todosController.getAll);

    app.get('/story', storyController.getAll);
}