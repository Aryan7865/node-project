var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database

mongoose.connect('mongodb://127.0.0.1:27017/Birthdaydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Create a Schema 

var birthdaySchema = new mongoose.Schema({
    name: { type: String, unique: true },
    birthdate: Date,
  });

var Birthday = mongoose.model('Birthday', birthdaySchema);  
console.log("hello");
module.exports = (app) => {
    // Add a person's birthday
    app.post('/add', async (req, res) => {
      try {
        const { name, birthdate } = req.body;
        const birthday = new Birthday({ name, birthdate });
        await birthday.save();
        res.status(201).send('Person added successfully');
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
    console.log("hello2");
    // Get the closest upcoming birthday
    app.get('/closest', async (req, res) => {
      try {
        const today = new Date();             
        const closestBirthday = await Birthday.findOne({
          birthdate: { $gte: today },
        }).sort('birthdate');
  
        if (closestBirthday) {
          res.send({
            name: closestBirthday.name,
            birthdate: closestBirthday.birthdate,
          });
        } else {
          res.status(404).send('No upcoming birthdays found');
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
    console.log("hello3");
    app.delete('/:name', async (req, res) => {
      try {
        const result = await Birthday.deleteOne({ name: req.params.name });
        if (result.deletedCount > 0) {
          res.send('Person deleted successfully');
        } else {
          res.status(404).send('Person not found');
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
  };
  console.log("hello6");
    // Get a specific person's birthdate
    app.get('/:name', async (req, res) => {
      try {
        const person = await Birthday.findOne({ name: req.params.name });
        if (person) {
          res.send({ birthdate: person.birthdate });
        } else {
          res.status(404).send('Person not found');
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
    console.log("hello4");
    // Update a person's birthdate
    app.put('/:name', async (req, res) => {
      try {
        const person = await Birthday.findOne({ name: req.params.name });
        if (person) {
          person.birthdate = req.body.birthdate;
          await person.save();
          res.send('Birthdate updated successfully');
        } else {
          res.status(404).send('Person not found');
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
    console.log("hello5");
    
