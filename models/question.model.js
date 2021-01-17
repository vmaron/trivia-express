const sql = require("./db.js");

const TriviaQuestion = function (triviaQuestion) {
  this.question = triviaQuestion.question;
  this.correctAnswer = triviaQuestion.correctAnswer;
  this.options = triviaQuestion.answers;
};

TriviaQuestion.mapRows = (rows) => {
  const questions = [];
  for (let row of rows) {
    questions.push({
      id: row.id,
      question: row.question,
      correctAnswer: row.correct_answer,
      options: JSON.parse(row.answers)
    })
  }
  return questions;
}

TriviaQuestion.getAll = (setId, result) => {
  sql.query(`select id, question, correct_answer, answers from questions
    where setid = ${setId}
    order by rand()`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, TriviaQuestion.mapRows(res));
  });
};

TriviaQuestion.getRandom = (setId, limit, result) => {
  sql.query(`select id, question, correct_answer, answers from questions
    where setid = ${setId}
    order by rand()
    limit ${limit}`, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, TriviaQuestion.mapRows(res));
  });
};

TriviaQuestion.getRandomSequence = (setId, result) => {
  sql.query(`select id from questions where setid = ${setId} order by rand()`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

TriviaQuestion.getById = (id, result) => {
  sql.query(`select id, question, correct_answer, answers
    from questions
    where id = ${id}`, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, TriviaQuestion.mapRows(res));
  });
};

module.exports = TriviaQuestion;
