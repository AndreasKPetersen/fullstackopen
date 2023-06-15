import personService from './../services/persons'

const Persons = ( {persons, setPersons, newFilter, setMessage} ) => {

    const personsToShow = (!newFilter.length)
    ? persons
    : persons.filter(person => person.name.includes(newFilter))

    const deletePerson = (name, id) => {
        if (window.confirm(`Do you really want to delete ${name} from the phonebook?`)) {
            personService
            .remove(id)
            .then(response => {
                setPersons(persons.filter(person => person.id !== id))
                setMessage( {
                    message: `${name} was succesfully deleted from the phonebook`,
                    type: "success"
                } )
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
            .catch(error => {
                setPersons(persons.filter(person => person.id !== id))
                setMessage( {
                    message: `${name} was already deleted from the phonebook`,
                    type: "error"
                } )
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
              })
        }
    }

    return (
        <div>
            {personsToShow.map(person => 
                <p key={person.name}>{person.name} {person.number} 
                <button onClick={() => deletePerson(person.name, person.id)}>delete</button>
                </p>  
            )}
        </div>
    )
}

export default Persons