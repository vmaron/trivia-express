module.exports = app => {
  const customers = require("../controllers/question.controller");

  app.get("/api/v1/questions", customers.findAll);
  app.get("/api/v1/questions/random/:limit", customers.getRandom);
};
