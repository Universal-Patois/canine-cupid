import React from "react";
import { dogData } from "../../utilities/interfaces";
import Dog from "../Dog/Dog";
import "./Favorites.css";

const Favorites = ({
  favoriteDogs,
  onToggleFavorite,
}: {
  favoriteDogs: dogData[];
  onToggleFavorite: (id: number, wasFavorite: boolean) => void;
}): any => {
  const showFavoriteDogs = favoriteDogs.map((dog: dogData) => {
    return (
      <Dog
        key={dog.id}
        image={dog.image.url}
        breed={dog.name}
        id={dog.id}
        isFavorite={true}
        onToggleFavorite={onToggleFavorite}
      />
    );
  });

  return <div className="favorite-dogs-container">{showFavoriteDogs}</div>
};

export default Favorites;
