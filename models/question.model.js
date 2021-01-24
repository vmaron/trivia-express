const sql = require("./db.js");

const mapRows = (rows) => {
  return rows.map(x => ({
    id: x.id,
    question: x.question,
    correctAnswer: x.correct_answer,
    options: JSON.parse(x.answers)
  }));
}

const getAll = async (quizId) => {
  const result = await sql.poolQuery(
    `select id, question, correct_answer, answers
     from questions
     where setid = ?
     order by rand()`, [quizId]);
  return mapRows(result);
};

const getRandom = async (quizId, limit) => {
  const result = await sql.poolQuery(
    `select id, question, correct_answer, answers
     from questions
     where setid = ?
     order by rand() limit ?`, [quizId, parseInt(limit)]);
  return mapRows(result);
};

const getSequence = async (quizId) => {
  const quiz = await sql.poolQuery(`select id, name, is_public, created_by, created_date
                                    from questions_set
                                    where id = ?`, [quizId]);

  const sequence = await sql.poolQuery(`select id
                                        from questions
                                        where setid = ?`, [quizId]);
  return {...quiz[0], sequence};
};

const getById = async (questionId) => {
  const result = await sql.poolQuery(`select id, question, correct_answer, answers
                                      from questions
                                      where id = ?`, [questionId]);
  return mapRows(result);
};


module.exports = {
  getAll,
  getRandom,
  getSequence,
  getById
};

