const PersonForm = ( {persons, setPersons, newName, setNewName, newNumber, setNewNumber} ) => {
        
    const handleNameChange = (event) => {
        setNewName(event.target.value)
      }
    
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        
        if (persons.filter(person => person.name === newName).length) {
          alert(`${newName} is already added to phonebook`)
        }
        else {
          const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length+1
          }
    
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
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