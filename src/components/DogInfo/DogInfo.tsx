const DogInfo = ({image, breed, breedGroup, origin, bredFor, lifeSpan, imperialHeight, metricHeight, imperialWeight, metricWeight, temperament}: 
  {image: string; breed: string; breedGroup: string; origin: string; bredFor: string; lifeSpan: string; imperialHeight: string; metricHeight: string; imperialWeight: string; metricWeight: string;  temperament: string }) => {
  return (
    <section className="dog-info-container">
      <img alt='dog'className="dog-info-image" src={image}/>
      <h2 className="dog-breed-info">Breed: {breed}</h2>
      <h3 className="breed-group">Breed Group: {breedGroup}</h3>
      <h3 className="breed-origin">Origin: {origin}</h3>
      <h4 className="bred-for">Bred For: {bredFor}</h4>
      <h3 className="life-span">Life Span: {lifeSpan}</h3>
      <div className="height">
        <h3 className="height-imperial">{imperialHeight}</h3>
        <h3 className="height-metric">{metricHeight}</h3>
      </div>
      <div className="weight">
        <h3 className="weight-imperial">{imperialWeight}</h3>
        <h3 className="weight-metric">{metricWeight}</h3>
      </div>
      <h3 className="temperament">{temperament}</h3>
    </section>
  )
}

export default DogInfo;