import { useEffect, useState } from "react";
import Person from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/PersonData";
import { NotificationError, Notification } from "./components/Notification";

const Filter = ({ filterHandler }) => {
  return (
    <div>
      Filter Shown with <input onChange={filterHandler} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterd, setFiltered] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [userMessage, setUserMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setFiltered(initialPersons);
    });
  }, []);

  const handleNewPerson = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook,would you like to update the number?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const personId = person.id;
        const updatedPerson = { ...person, number: newNumber };

        personService.update(personId, updatedPerson).then((returnedPerson) => {
          setFiltered(
            persons.map((person) =>
              person.id !== personId ? person : returnedPerson
            )
          );
        });
      }
      const message = `${newName} updated Successfully`;
      setNewName("");
      setNewNumber("");
      setUserMessage(message);
      setTimeout(() => {
        setUserMessage(null);
      }, 5000);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(personObject)
      .then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setFiltered(persons.concat(newPerson));
        setUserMessage(`${newPerson.name} added successfully`);
        setTimeout(() => {
          setUserMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleFilter = (event) => {
    const filterText = event.target.value.toLowerCase();
    setFiltered(
      persons.filter((person) => person.name.toLowerCase().includes(filterText))
    );
  };

  const handleDeletePerson = (id) => {
    const personName = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personName.name} ?`)) {
      personService
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          setFiltered(persons.filter((person) => person.id !== id));
          setUserMessage(`${personName.name} deleted successfully`);
          setTimeout(() => {
            setUserMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `${personName.name} has alread been deleted from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
          setFiltered(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={userMessage} />
      <NotificationError message={errorMessage} />
      <Filter filterHandler={handleFilter} />
      <h3>Add a New</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewPerson={handleNewPerson}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      {filterd.map((person) => {
        return (
          <Person
            key={person.name}
            person={person}
            handleDeletePersons={() => handleDeletePerson(person.id)}
          />
        );
      })}
    </div>
  );
};

export default App;
