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
  return (
    <div className="favorite-dogs-container">
      <h1 className="favorites-header">Favorite Dogs:</h1>
      <div className="favorite-dogs">
        {favoriteDogs.length > 0 && showFavoriteDogs}
        {favoriteDogs.length === 0 && (
          <h2>You have no favorite dogs at this time, go find a new match!</h2>
        )}
      </div>
    </div>
  );
};

export default Favorites;
