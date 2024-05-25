const mongoose = require("mongoose");

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb://fso:${password}@ac-ztqtyx3-shard-00-00.e1fxjwx.mongodb.net:27017,ac-ztqtyx3-shard-00-01.e1fxjwx.mongodb.net:27017,ac-ztqtyx3-shard-00-02.e1fxjwx.mongodb.net:27017/phonebookApp?ssl=true&replicaSet=atlas-p0fjew-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv[3] && process.argv[4]) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((result) => {
    console.log("person saved!");
    mongoose.connection.close();
  });
} else {
  console.log("phonebook: ");
  Person.find({}).then((results) => {
    results.forEach((result) => console.log(`${result.name} ${result.number}`));
    mongoose.connection.close();
  });
}
