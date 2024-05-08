import React from 'react';
import courses from './course';


const Header = () => {

  return <h1>Web development curriculum</h1>;
};

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  );
};

const CourseTitle = ({ course }) => {

  return <h2>{course.name}</h2>;
};

const Content = ({ course }) => {

  return <div>{course.parts.map(part => <Part key={part.id} part={part} />)}</div>;

}

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p><strong>Total of {total} exercises</strong></p>;
}




const App = () => {

  return (
    <div>
      <Header />
      {courses.map(course => (
        <div key={course.id}>
          <CourseTitle course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>
      ))}
    </div>
  );

};

export default App;