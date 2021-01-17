module.exports = app => {
  const controller = require("../controllers/question.controller");

  app.get("/api/v1/questions/all/:id", controller.findAll);
  app.get("/api/v1/questions/sequence/:id", controller.getRandomSequence);
  app.get("/api/v1/questions/random/:id/:limit", controller.getRandom);
  app.get("/api/v1/questions/:id", controller.getById);
};
