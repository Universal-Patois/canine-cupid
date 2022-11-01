import React from "react";
import './Dog.css'

const Dog = ({image, breed, id, onFavorite}: { image: string; breed: string; id: number; onFavorite: (id: number) => void }) => {

  return (
    <section className="individual-featured-dog">
      <img alt="dog" className="featured-dog">{image}</img>
      <h3 className="dog-breed">{breed}</h3>
      <button onClick = {() => onFavorite(id)}>Favorite</button>
    </section>
  )
}

export default Dog;