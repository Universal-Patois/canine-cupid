import React from "react";
import './Dog.css'

const Dog = ({image, breed, id, onToggleFavorite, isFavorite}: { image: string; breed: string; id: number; onToggleFavorite: (id: number, wasFavorite: boolean) => void; isFavorite: boolean }) => {

  return (
    <section className="individual-featured-dog">
      <img alt="dog" className="featured-dog-image" src={image}/>
      <h3 className="dog-breed">{breed}</h3>
      <button onClick = {() => onToggleFavorite(id, isFavorite)}>{isFavorite ? "Unfavorite" : "Favorite"}</button>
    </section>
  )
}

export default Dog;