const TriviaQuestion = require("../models/question.model");

exports.findAll = (req, res) => {
  TriviaQuestion.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving trivia questions."
      });
    else res.send(data);
  });
};

exports.getRandom = (req, res) => {
  const limit = req.params.limit;
  const verifiedLimit = (limit != null && !isNaN(limit)
    && limit <= 10 && limit >= 1) ? limit : 1;

  TriviaQuestion.getRandom(verifiedLimit, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving random trivia questions."
      });
    else res.send(data);
  });
};

