const Header = ( {course} ) => {
    return (
        <h3>{course.name}</h3>
    )
}

const Content = ( {parts} ) => {
    return (
        <div>
            {parts.map(part => 
                <p key={part.id}>{part.name} {part.exercises}</p>
            )}
        </div>
    )
}

const Total = ( {parts} ) => {
    const total = parts.reduce((sum, part) => {
        return (
            sum + part.exercises
        )
    }, 0)
    
    return (
        <b>total of {total} exercises</b>
    )
}

const Course = ( {courses} ) => {

    return (
        <div>
            <h1>Web development curriculum</h1>

            {courses.map(course =>
                <div key={course.id}>
                    <Header course={course} />
                    <Content parts={course.parts} />
                    <Total parts={course.parts} />
                </div>
            )}

        </div>
    )
}

export default Course