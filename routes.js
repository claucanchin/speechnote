module.exports = (app, db) => {

    //require the controllers
    const todosController = require('./controllers/todos')(db);
    const storyController = require('./controllers/story')(db);

    app.get('/todos', todosController.getAll);
    // app.post('/todos' todosController.createTodo);

    app.get('/story', storyController.getAll);
    app.post('/story', storyController.createStory);
}