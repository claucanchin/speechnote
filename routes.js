module.exports = (app, db) => {

    //require the controllers
    const todosController = require('./controllers/todos')(db);
    const storyController = require('./controllers/story')(db);

    app.get('/todos', todosController.getAll);
    app.post('/todos', todosController.createTodo);

    app.delete('/todos/:id/delete', todosController.deleteTodo);

    app.get('/story', storyController.getAll);
    app.post('/story', storyController.createStory);

    app.delete('/story/:id/delete', storyController.deleteStory);

}