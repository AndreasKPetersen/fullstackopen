function Course( {course} ) {
    const courseName = course.name
    const parts = course.parts
    
    const total = parts.reduce((sum, part) => {
        return (
            sum + part.exercises
        )
    }, 0)

    return (
        <div>
            <h1>{courseName}</h1>
            
            {parts.map(x => 
                <div key={x.id}>{x.name} {x.exercises}</div>
            )}

            total of {total} exercises
        </div>
    )
}

export default Course