const sql = require("./db.js");

const getAll = async () => {
  const res = await sql.poolQuery(
    `select id, name, is_public, created_by, created_date
     from questions_set`);

  return res.map(x => ({id: x.id, name: x.name, isPublic: x.is_public}));
};

const getQuestions = async (quizId) => {
  const quiz = await sql.poolQuery(
    `select id, name, is_public, created_by, created_date
     from questions_set
     where id = ?`, [quizId]);

  const questions = await sql.poolQuery(
    `select id, question
     from questions
     where setid = ?`, [quizId]);

  return {...quiz[0], questions};
};


module.exports = {
  getAll,
  getQuestions
};

