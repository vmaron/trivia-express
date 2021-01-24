const Quiz = require("../models/quiz.model");
const {NotFound} = require("../utils/errors");
const {BadRequest} = require("../utils/errors");

const findAll = async (req, res, next) => {
  try {
    const quizzes = await Quiz.getAll();
    return res.status(200).send(quizzes);
  } catch (err) {
    next(err)
  }
};

const getQuiz = async (req, res, next) => {
  try {
    const {id} = req.params;

    if (id == null || isNaN(id)) {
      throw new BadRequest(`${id} is not a valid quiz id.`);
    }

    const quiz = await Quiz.getQuestions(id);
    if (!quiz || quiz.questions.length <= 0) {
      throw new NotFound(`could not find a quiz by id: ${id}`);
    }

    return res.status(200).send(quiz);
  } catch (err) {
    next(err)
  }
};


module.exports = {
  findAll,
  getQuiz
};

