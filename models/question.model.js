const sql = require("./db.js");

const QuizQuestion = function (entity) {
  this.question = entity.question;
  this.correctAnswer = entity.correctAnswer;
  this.options = entity.answers;
};

QuizQuestion.mapRows = (rows) => {
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

QuizQuestion.getAll = (setId, result) => {
  sql.query(`select id, question, correct_answer, answers from questions
    where setid = ${setId}
    order by rand()`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, QuizQuestion.mapRows(res));
  });
};

QuizQuestion.getRandom = (setId, limit, result) => {
  sql.query(`select id, question, correct_answer, answers from questions
    where setid = ${setId}
    order by rand()
    limit ${limit}`, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, QuizQuestion.mapRows(res));
  });
};

QuizQuestion.getSequence = async (quizId) => {
  try {
    const quiz = await sql.query(`select id, name, is_public, created_by, created_date
                                  from questions_set
                                  where id = ${quizId}`);

    const sequence = await sql.query(`select id from questions 
                                       where setid = ${quizId}`);
    return {...quiz[0], sequence};
  } catch (err) {
    console.log("error: ", err);
    return null;
  }
};

QuizQuestion.getById = (id, result) => {
  sql.query(`select id, question, correct_answer, answers
    from questions
    where id = ${id}`, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, QuizQuestion.mapRows(res));
  });
};

module.exports = QuizQuestion;
