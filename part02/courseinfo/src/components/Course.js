function Course( {course} ) {
    const courseName = course.name
    const parts = course.parts

    return (
        <div>
            <h1>{courseName}</h1>
            
            {parts.map(x => 
                <div key={x.id}>{x.name} {x.exercises}</div>
            )}
        </div>
    )
}

export default Course