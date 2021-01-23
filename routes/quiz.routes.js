module.exports = app => {
  const controller = require("../controllers/quiz.controller");

  app.get("/api/v1/quiz", controller.findAll);
  app.get("/api/v1/quiz/:id", controller.getQuiz);
};
