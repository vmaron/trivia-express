const QuizQuestion = require("../models/question.model");
const {BadRequest} = require("../utils/errors");

const getAll = async (req, res, next) => {
  try {
    const {id} = req.params;
    if (id == null || isNaN(id)) {
      throw new BadRequest(`${id} is not a valid quiz id.`);
    }
    const questions = await QuizQuestion.getAll(id);
    return res.status(200).send(questions);
  } catch (err) {
    next(err)
  }
};

const getRandom = async (req, res, next) => {
  try {
    const {id} = req.params;
    if (id == null || isNaN(id)) {
      throw new BadRequest(`${id} is not a valid quiz id.`);
    }

    const limit = req.params.limit;
    const verifiedLimit = (limit != null && !isNaN(limit) && limit <= 10 && limit >= 1) ? limit : 1;

    const questions = await QuizQuestion.getRandom(id, verifiedLimit);
    return res.status(200).send(questions);
  } catch (err) {
    next(err)
  }
};

const getSequence = async (req, res, next) => {
  try {
    const {id} = req.params;
    if (id == null || isNaN(id)) {
      throw new BadRequest(`${id} is not a valid quiz id.`);
    }
    const questions = await QuizQuestion.getSequence(id);
    return res.status(200).send(questions);
  } catch (err) {
    next(err)
  }
};

const getById = async (req, res, next) => {
  try {
    const {id} = req.params;
    if (id == null || isNaN(id)) {
      throw new BadRequest(`${id} is not a valid question id.`);
    }
    const questions = await QuizQuestion.getById(id);
    return res.status(200).send(questions);
  } catch (err) {
    next(err)
  }
};

module.exports = {
  getAll,
  getRandom,
  getSequence,
  getById
};




