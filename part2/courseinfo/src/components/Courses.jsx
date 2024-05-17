const Header = ({text}) => {
    return (
        <h1>{text}</h1>
    )
}

const Part = ({id, name, exercises}) => {
    return (
        <p key={id}>{name} {exercises}</p>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((s,p) => s+p.exercises, 0)
    return (
        <strong>total of {total} exercises</strong>
    )
}

const Courses = ({courses}) => {
    return (
        <div>
            {
                courses.map((course) => {
                    return (
                        <div key={course.id}>
                            <Header key={course.id} text={course.name} />
                            {course.parts.map(part => <Part id={part.id} name={part.name} exercises={part.exercises}/>)}
                            <Total parts={course.parts} />
                        </div>   
                    )
                })
            }
        </div>
    )
}

export default Courses;