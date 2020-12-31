module.exports = app => {
  const controller = require("../controllers/question.controller");

  app.get("/api/v1/questions", controller.findAll);
  app.get("/api/v1/questions/sequence", controller.getRandomSequence);
  app.get("/api/v1/questions/random/:limit", controller.getRandom);
  app.get("/api/v1/questions/:id", controller.getById);
};
