module.exports = app => {
  const controller = require("../controllers/quiz.controller");

  app.get("/api/v1/quizzes/all", controller.findAll);
};
