const express = require('express');
const path = require("path");
const handleErrors = require('./middleware/handleErrors');
const bodyparser = require('body-parser');
require('dotenv').config();
const {LOCAL} = require('./config/environments');
const {httpLogger} = require("./middleware/logger");

const app = express();

// Update the headers to handle CORS
// i.e., allow AJAX requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

require("./routes/question.routes")(app);
require("./routes/quiz.routes")(app);

app.use(httpLogger());
app.use(handleErrors);

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || LOCAL;
app.listen(port, () =>
  console.log(`${env.toUpperCase()} server running on port ${port}`)
);
