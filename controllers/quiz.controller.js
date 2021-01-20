const Quiz = require("../models/quiz.model");

exports.findAll = (req, res) => {
  Quiz.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving list of quizzes."
      });
    else res.send(data);
  });
};

exports.getQuestions = (req, res) => {
  const { id } = req.params;
  if (id == null || isNaN(id)) {
    return res.status(400).send({ error: `${id} is not a valid quiz id.`, status: 400 });
  }
  Quiz.getQuestions(id,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving list of quiz questions."
      });
    else res.send(data);
  });
};

