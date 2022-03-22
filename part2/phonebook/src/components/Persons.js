const Person = ({ person, handleDeletePersons }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={handleDeletePersons}>Delete</button>
    </div>
  );
};

export default Person;
