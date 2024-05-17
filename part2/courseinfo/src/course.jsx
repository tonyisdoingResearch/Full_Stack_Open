const Course = ({ name, parts }) => (
    <div>
        <h3>{name}</h3>
        {parts.map(({ name, exercises, id }) => (
            <p key={id}>{name} {exercises}</p>
        ))}
        <Sum parts={parts} />
    </div>
);

const Sum = ({ parts }) => {
    const totalSum = parts.reduce((sum, part) => sum + part.exercises, 0);
    return <p><strong>total of: {totalSum} exercises</strong></p>;
}

const Courses = ({ courses }) => (
    <div>
        {courses.map(course => (
            <Course key={course.id} name={course.name} parts={course.parts} />
        ))}
    </div>
);


export { Course, Courses };