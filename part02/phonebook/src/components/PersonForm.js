import personService from './../services/persons'

const PersonForm = ( {persons, setPersons, newName, setNewName, newNumber, setNewNumber} ) => {
        
    const handleNameChange = (event) => {
        setNewName(event.target.value)
      }
    
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()

        const newPerson = persons.find(person => person.name === newName)
        
        const personObject = {
          name: newName,
          number: newNumber
        }

        if (newPerson === undefined) {
          personService
            .create(personObject)
            .then(response => {
                setPersons(persons.concat(personObject))
                setNewName('')
                setNewNumber('')
            })
        }
        else {
          window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
          personService
            .update(newPerson.id, personObject)
            .then(response => {
              setPersons(persons.map(person =>
                person.id !== response.data.id ? person : response.data))
            })
        }
    }

    return (
        <form onSubmit={addPerson}>
            <div>name: <input value={newName} onChange={handleNameChange} /></div>
            <div>number: <input value={newNumber} onChange={handleNumberChange}></input></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm