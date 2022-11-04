import React from "react";
import { Link } from 'react-router-dom'
import './Dog.css'

const Dog = ({image, breed, id, onToggleFavorite, isFavorite}: { image: string; breed: string; id: number; onToggleFavorite: (id: number, wasFavorite: boolean) => void; isFavorite: boolean }) => {

  return (
    <section className="individual-featured-dog">

        <img alt="dog" className="featured-dog-image" src={image}/>
        <h3 className="dog-breed">{breed}</h3>
        <button className='favorite-button'onClick = {() => {onToggleFavorite(id, isFavorite), isFavorite=true}}>{isFavorite ? "Unfavorite" : "Favorite"}</button>
        <Link to={`${breed}`}>
          <button className="info-button">Information</button>
        </Link>
      </section>

  )
}

export default Dog;