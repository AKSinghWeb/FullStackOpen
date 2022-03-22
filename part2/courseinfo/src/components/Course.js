import React from 'react'

const Course = ({ course }) => {
    const Header = ({ courseHeading }) => <h2>{courseHeading.name}</h2>;
  
    const Total = ({ parts }) => {
      return (
        <h4>Total of exercises {parts.reduce((a, b) => a + b.exercises, 0)}</h4>
      );
    };
  
    const Part = ({ part }) => (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  
    const Content = ({ parts }) => {
      return (
        <>
          {parts.map((part) => {
            return <Part key={part.id} part={part} />;
          })}
        </>
      );
    };
    return (
      <>
        <Header courseHeading={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    );
  };

  export default Course