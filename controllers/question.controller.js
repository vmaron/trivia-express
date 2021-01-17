const TriviaQuestion = require("../models/question.model");

exports.findAll = (req, res) => {
  const { id } = req.params;
  if (id == null || isNaN(id)) {
    return res.status(400).send({ error: `${id} is not a valid questions set id.`, status: 400 });
  }
  TriviaQuestion.getAll(id,(err, data) => {
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

  TriviaQuestion.getRandom(id, verifiedLimit, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving random trivia questions."
      });
    else res.send(data);
  });
};

exports.getRandomSequence = (req, res) => {
  const { id } = req.params;
  if (id == null || isNaN(id)) {
    return res.status(400).send({ error: `${id} is not a valid questions set id.`, status: 400 });
  }
  TriviaQuestion.getRandomSequence(id,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving random question list."
      });
    else res.send(data);
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;
  if (id == null || isNaN(id)) {
    return res.status(400).send({ error: `${id} is not a valid id.`, status: 400 });
  }

  TriviaQuestion.getById(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving random trivia questions."
      });
    else res.send(data);
  });
};



