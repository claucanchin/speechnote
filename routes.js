module.exports = (app, db) => {
    const todos = require('./controllers/todos')(db);

    app.get('/todos', todos.getAll)
}