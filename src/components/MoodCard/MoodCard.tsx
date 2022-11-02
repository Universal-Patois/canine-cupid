import "./MoodCard.css";
import { personalityState } from "../../utilities/interfaces";

const MoodCard = ({
  personality,
  selectDog,
}: {
  personality: personalityState;
  selectDog: Function;
}) => {
  return (
    <div className="mood-card" onClick={() => selectDog(personality)}>
      <h2>{personality.name}</h2>
      <p>{personality.description}</p>
    </div>
  );
};

export default MoodCard;
