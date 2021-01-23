const Quiz = require("../models/quiz.model");

const findAll = (req, res) => {
  Quiz.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving list of quizzes."
      });
    else res.send(data);
  });
};

const getQuiz = async (req, res) => {
  const { id } = req.params;

  if (id == null || isNaN(id)) {
    return res.status(400).send({ error: `${id} is not a valid id.`, status: 400 });
  }

  const quiz = await Quiz.getQuestions(id);
  if (!quiz || quiz.questions.length <= 0) {
    return res.status(400).send({ error: `could not find a quiz by id ${id}`, status: 404 });
  }

  return res.status(200).send(quiz);
};


module.exports = {
  findAll,
  getQuiz
};

