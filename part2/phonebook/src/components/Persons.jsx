import Person from "./Person";

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.id} person={person} handleClick={handleDelete} />
      ))}
    </div>
  );
};

export default Persons;
