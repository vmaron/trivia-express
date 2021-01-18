const sql = require("./db.js");

const Quiz = function (entity) {
  this.id = entity.id;
  this.name = entity.name;
  this.public = entity.is_public;
};

Quiz.mapRows = (rows) => {
  const sets = [];
  for (let row of rows) {
    sets.push({
      id: row.id,
      name: row.name,
      public: row.is_public
    })
  }
  return sets;
}

Quiz.getAll = (result) => {
  sql.query('select id, name, is_public, created_by, created_date from questions_set', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, Quiz.mapRows(res));
  });
};

module.exports = Quiz;
