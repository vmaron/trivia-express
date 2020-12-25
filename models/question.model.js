const sql = require("./db.js");

const TriviaQuestion = function(triviaQuestion) {
  this.question = triviaQuestion.question;
  this.correctAnswer = triviaQuestion.correctAnswer;
  this.answers = triviaQuestion.answers;
};

TriviaQuestion.getAll = result => {
  sql.query("select t.question, t.correct_answer, t.answers from trivia_qa t", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    var questions = [];
    for (let x of res) {
      questions.push({question: x.question, correctAnswer: x.correct_answer, answers: JSON.parse(x.answers)})
    }

    result(null, questions);
  });
};

module.exports = TriviaQuestion;
