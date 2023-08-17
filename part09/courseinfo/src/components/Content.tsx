import CoursePart from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((coursePart, idx) => (
        <div key={idx}>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <Part coursePart={coursePart} />
        </div>
      ))}
    </div>
  );
};

export default Content;
