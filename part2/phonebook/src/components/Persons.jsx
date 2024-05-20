const Persons = ({ newFilter, persons, handleDelete }) => {
  const personsToShow = newFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    : persons;

  return (
    <div className="persons">
      {personsToShow.map((person) => {
        return (
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
