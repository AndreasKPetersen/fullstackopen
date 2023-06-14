const Persons = ( {persons, newFilter} ) => {

    const personsToShow = (!newFilter.length)
    ? persons
    : persons.filter(person => person.name.includes(newFilter))

    return (
        <div>
            {personsToShow.map(person => 
                <p key={person.name}>{person.name} {person.number}</p>  
            )}
        </div>
    )
}

export default Persons