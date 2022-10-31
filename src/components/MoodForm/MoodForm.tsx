import { dogData } from "../../utilities/interfaces";
import "./MoodForm.css";
import { Link } from "react-router-dom";

const MoodForm = ({
  dogs,
  filterDogsByTemperament,
}: {
  dogs: dogData[];
  filterDogsByTemperament: Function;
}) => {
  let checkedMoods: string[] = [];
  let uniqueMoods: string[] = [];
  const handleChange = (event: any) => {
    if (checkedMoods.length === 10) {
      alert("You can only choose 10 moods!");
      event.target.checked = false;
    } else if (
      event.target.checked === true &&
      !checkedMoods.includes(event.target.name)
    ) {
      checkedMoods.push(event.target.name);
    } else if (event.target.checked === false) {
      let falseCheckedBox: number = checkedMoods.indexOf(event.target.name);
      checkedMoods.splice(falseCheckedBox, 1);
    }
  };
  const temperamentArray = dogs.flatMap((dog: dogData) => {
    if (dog.temperament !== undefined) {
      return dog.temperament.split(", ");
    }
  });
  temperamentArray.forEach((temp: any) => {
    if (!uniqueMoods.includes(temp) && temp !== undefined) {
      uniqueMoods.push(temp);
    }
  });
  const moodForm = uniqueMoods.map((mood: string) => {
    return (
      <div className="mood-buttons">
        <div>
          <input
            type="checkbox"
            key={mood}
            value={mood}
            name={mood}
            onClick={(e) => handleChange(e)}
          />
        </div>
        <label>{mood}</label>
      </div>
    );
  });
  return (
    <div className="mood-form">
      <h2>Choose up to 10 Moods:</h2>
      <div className="mood-form-checkbox">{moodForm}</div>
      <Link to="/matches">
        <button
          className="submit-button"
          onClick={() => filterDogsByTemperament(checkedMoods)}
        >
          Find A Match!
        </button>
      </Link>
    </div>
  );
};

export default MoodForm;
