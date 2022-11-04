import { Link, useHistory } from "react-router-dom";
import { dogData } from "../../utilities/interfaces";

const DogInfo = ({ breed, dogs }: { breed: string; dogs: dogData[] }) => {
  const selectedDog = dogs.find((dog: { name: string }) => dog.name === breed);
  const history = useHistory();

  return (
    <section className="dog-info-container">
      <img alt="dog" className="dog-info-image" src={selectedDog?.image.url} />
      <h2 className="dog-breed-info">Breed: {breed}</h2>
      <h3 className="breed-group">Breed Group: {selectedDog?.breed_group}</h3>
      <h4 className="bred-for">Bred For: {selectedDog?.bred_for}</h4>
      <h3 className="breed-origin">Origin: {selectedDog?.origin}</h3>
      <h3 className="life-span">Life Span: {selectedDog?.life_span}</h3>
      <div className="height">
        <h3>Height:</h3>
        <h4 className="height-imperial">
          Imperial: {selectedDog?.height.imperial} inches
        </h4>
        <h4 className="height-metric">
          Metric: {selectedDog?.height.metric} cm
        </h4>
      </div>
      <div className="weight">
        <h3>Weight:</h3>
        <h4 className="weight-imperial">
          Imperial: {selectedDog?.weight.imperial} lbs
        </h4>
        <h4 className="weight-metric">
          Metric: {selectedDog?.weight.metric} kg
        </h4>
      </div>
      <h3 className="temperament">Temperament: {selectedDog?.temperament}</h3>
      <Link to="/">
        <button>Back</button>
      </Link>
    </section>
  );
};

export default DogInfo;
