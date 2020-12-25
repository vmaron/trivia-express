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
