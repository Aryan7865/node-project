var express = require('express');
var birthdayController = require('./controllers/birthdayController');

var app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


birthdayController(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
