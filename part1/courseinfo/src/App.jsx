const App = () => {

  //------------------ Header component --------------------------//

  const Header = ({ course }) => <h1>{course.name}</h1>;

  //----------------------- array of parts -----------------------//

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  //--- The Content function generates paragraphs for each course part ---//

  const Content = ({ parts }) => (
    <div>
      {parts.map(({ name, exercises }) => (
        <p key={name}>
          {name} {exercises}
        </p>
      ))}
    </div>
  );

  //--- Calculate total exercises from parts array, displaying the count. ---//

  const Total = ({ parts }) => {
    const totalExercises = parts.reduce((acc, { exercises }) => acc + exercises, 0);
    return <p>Number of exercises: {totalExercises}</p>;
  };

  //--- Render header, content, and total exercises components within a div. ---//
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
