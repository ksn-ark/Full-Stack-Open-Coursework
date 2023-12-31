const Part = (props) => {
  return (
    <p>
      {props.p.name} {props.p.exercises}
    </p>
  );
};

const Header = (props) => {
  return (
    <>
      <h1>{props.c}</h1>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <Part p={props.p[0]} />
      <Part p={props.p[1]} />
      <Part p={props.p[2]} />
    </>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.p[0].exercises + props.p[1].exercises + props.p[2].exercises}{" "}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header c={course.name} />
      <Content p={course.parts} />
      <Total p={course.parts} />
    </div>
  );
};

export default App;
