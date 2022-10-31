// import Dog from "../Dog/Dog";
import { dogData } from "../../utilities/interfaces";
import './FeaturedDogs.css'

const FeaturedDogs = ({dogs}: {dogs: dogData[]}): any => {
  const randomDogs = dogs.sort(() => 0.5 - Math.random()).slice(0,8)
  const showFeaturedDogs = randomDogs.map((dog: { image: {height: number; id: string; url: string; width: number }; name: string; id: number}) => {
      // console.log(dogs[0].image.url)
    return (
      <div className="individual-featured-dog" key={dog.id}>
        <img className="dog-image"
        src={dog.image.url}
        alt="dog"
        />
        <h3 className="dog-name">{dog.name}</h3>
      </div>
      )
    })

  return (
      <div className="featured-dogs-container">
        {showFeaturedDogs}
      </div>
  )
}

export default FeaturedDogs;