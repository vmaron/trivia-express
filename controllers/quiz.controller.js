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
