import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import personsService from "./services/persons";

const Notification = ({ message }) => {
  const notificationStyle = {
    padding: 10,
    marginBottom: 5,
    fontSize: 20,
    background: "lightgrey",
    color: "green",
    borderStyle: "solid",
    borderRadius: 5,
  };
  if (message === null) {
    return null;
  }
  return <div style={notificationStyle}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setnewNumber] = useState("");
  const [newFilter, setnewFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then((returnedPersons) => setPersons(returnedPersons));
  }, []);

  const checkName = (name) => {
    return persons.some(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkName(newName)) {
      alert(`${newName} already exists!`);
      setNewName("");
      setnewNumber("");
    } else {
      const newPerson = { name: newName, number: newNumber };
      personsService
        .create(newPerson)
        .then((returnedPerson) => setPersons([...persons, returnedPerson]));
      setMessage(`Added ${newPerson.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
      setNewName("");
      setnewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setnewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setnewFilter(event.target.value);
  };

  const handleDelete = (personToDelete) => {
    if (
      window.confirm(`Are you sure you want to delete ${personToDelete.name}`)
    ) {
      personsService
        .remove(personToDelete.id)
        .then((deletedPerson) =>
          personsService
            .getAll()
            .then((returnedPersons) => setPersons(returnedPersons))
        );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilter={handleFilter} />
      <h3> Add a new </h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        newName={newName}
      />
      <h2>Numbers</h2>
      <Persons
        newFilter={newFilter}
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
