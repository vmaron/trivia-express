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

TriviaQuestion.getAll = result => {
  sql.query("select id, question, correct_answer, answers from trivia_qa", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, TriviaQuestion.mapRows(res));
  });
};

TriviaQuestion.getRandom = (limit, result) => {
  sql.query(`select id, question, correct_answer, answers
    from trivia_qa
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

module.exports = TriviaQuestion;
