import { Link } from "react-router-dom";
import { dogData } from "../../utilities/interfaces";


const DogInfo = ({ breed, dogs }: { breed: string; dogs: dogData[] }) => {
  const selectedDog = dogs.find((dog: { name: string; }) => dog.name === breed)
  return (
    <section className="dog-info-container">
      <img alt='dog' className="dog-info-image" src={selectedDog?.image.url} />
      {selectedDog?.breed_group && <h2 className="dog-breed-info">Breed: {breed}</h2>}
      {selectedDog?.breed_group && <h3 className="breed-group">Breed Group: {selectedDog.breed_group}</h3>}
      {selectedDog?.bred_for && <h4 className="bred-for">Bred For: {selectedDog.bred_for}</h4>}
      {selectedDog?.origin && <h3 className="breed-origin">Origin: {selectedDog.origin}</h3>}
      {selectedDog?.life_span && <h3 className="life-span">Life Span: {selectedDog.life_span}</h3>}
      <div>
        <h3 className="height">Height:</h3>
        {selectedDog?.height.imperial && <h4 className="height-imperial">Imperial: {selectedDog.height.imperial} inches</h4>}
        {selectedDog?.height.metric && <h4 className="height-metric">Metric: {selectedDog.height.metric} cm</h4>}
      </div>
      <div>
        <h3 className="weight">Weight:</h3>
        {selectedDog?.weight.imperial && <h4 className="weight-imperial">Imperial: {selectedDog.weight.imperial} lbs</h4>}
        {selectedDog?.weight.metric && <h4 className="weight-metric">Metric: {selectedDog.weight.metric} kg</h4>}
      </div>
      {selectedDog?.temperament && <h3 className="temperament">Temperament: {selectedDog.temperament}</h3>}
      <Link to='/'>
        <button>Back</button>
      </Link>
    </section>
  )
}

export default DogInfo;