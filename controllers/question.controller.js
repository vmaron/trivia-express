const QuizQuestion = require("../models/question.model");

exports.findAll = (req, res) => {
  const { id } = req.params;
  if (id == null || isNaN(id)) {
    return res.status(400).send({ error: `${id} is not a valid questions set id.`, status: 400 });
  }
  QuizQuestion.getAll(id,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving trivia questions."
      });
    else res.send(data);
  });
};

exports.getRandom = (req, res) => {
  const { id } = req.params;
  if (id == null || isNaN(id)) {
    return res.status(400).send({ error: `${id} is not a valid questions set id.`, status: 400 });
  }

  const limit = req.params.limit;
  const verifiedLimit = (limit != null && !isNaN(limit)
    && limit <= 10 && limit >= 1) ? limit : 1;

  QuizQuestion.getRandom(id, verifiedLimit, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving random trivia questions."
      });
    else res.send(data);
  });
};

exports.getSequence = async (req, res) => {
  const { id } = req.params;

  if (id == null || isNaN(id)) {
    return res.status(400).send({ error: `${id} is not a valid id.`, status: 400 });
  }

  const quiz = await QuizQuestion.getSequence(id);
  if (!quiz || quiz.sequence.length <= 0) {
    return res.status(400).send({ error: `could not find a quiz by id ${id}`, status: 404 });
  }

  return res.status(200).send(quiz);
};

exports.getById = (req, res) => {
  const { id } = req.params;
  if (id == null || isNaN(id)) {
    return res.status(400).send({ error: `${id} is not a valid id.`, status: 400 });
  }

  QuizQuestion.getById(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving random trivia questions."
      });
    else res.send(data);
  });
};



