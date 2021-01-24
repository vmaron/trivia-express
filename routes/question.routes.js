module.exports = app => {
  const controller = require("../controllers/question.controller");

  app.get("/api/v1/questions/all/:id", controller.getAll);
  app.get("/api/v1/questions/sequence/:id", controller.getSequence);
  app.get("/api/v1/questions/random/:id/:limit", controller.getRandom);
  app.get("/api/v1/questions/:id", controller.getById);
};
