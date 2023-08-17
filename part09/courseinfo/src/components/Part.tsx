import CoursePart from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case "basic":
      return <i>{coursePart.description}</i>;
    case "group":
      return <div>project exercises {coursePart.groupProjectCount}</div>;
    case "background":
      return (
        <div>
          <i>{coursePart.description}</i>
          <div>submit to {coursePart.backgroundMaterial}</div>
        </div>
      );
    case "special":
      return (
        <div>
          <i>{coursePart.description}</i>
          <div>required skills: {coursePart.requirements.join(", ")}</div>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
