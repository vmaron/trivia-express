const express = require('express');
const app = express();
require('dotenv').config();


app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

require("./routes/question.routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => `Server running on port ${PORT}`);
