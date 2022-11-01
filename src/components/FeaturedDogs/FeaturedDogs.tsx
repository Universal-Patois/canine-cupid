import React from 'react';
import { dogData } from "../../utilities/interfaces";
import Dog from '../Dog/Dog'
import './FeaturedDogs.css'

const FeaturedDogs = ({dogs, onFavorite}: {dogs: dogData[]; onFavorite: (id:number) => void}): any => {
  const randomDogs = dogs.sort(() => 0.5 - Math.random()).slice(0,8)
  const showFeaturedDogs = randomDogs.map((dog: dogData) => {
    return (
      <Dog 
        key={dog.id}
        image = {dog.image.url}
        breed = {dog.name}
        id = {dog.id}
        onFavorite = {onFavorite}
      />
      )
    })

  return (
      <div className="featured-dogs-container">
        {showFeaturedDogs}
      </div>
  )
}

export default FeaturedDogs;