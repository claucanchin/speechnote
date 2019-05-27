module.exports = db => {

    let getAll = (req, callback) => {
        db.query(`SELECT * FROM todos`, (err, result) => {
            if (err) {
                callback(err, null);
            }
            if (result.rows){
                console.log(result.rows)
                callback(null, result.rows);
            } else {
                callback(null, null);
            }
        })
    }

    let createOne = (request, callback) => {

        const queryString = 'INSERT INTO todos (task) VALUES ($1) RETURNING *';
        const values = [request.body.task];

        db.query(queryString, values, (error, result) => {
            error ? callback(error, null) : callback(null, result.rows);
        })
    }

    return {
        getAll,
        createOne
    }
}