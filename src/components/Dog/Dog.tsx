import React from "react";
import { Link } from "react-router-dom";
import "./Dog.css";
import unfavorited from "../../assets/unfavorite.png";
import favorited from "../../assets/favorited.png";
import infoIcon from "../../assets/info-icon.png";

const Dog = ({
  image,
  breed,
  id,
  onToggleFavorite,
  isFavorite,
}: {
  image: string;
  breed: string;
  id: number;
  onToggleFavorite: (id: number, event: any) => void;
  isFavorite: boolean;
}) => {
  return (
    <section className="individual-featured-dog">
      <img alt="dog" className="featured-dog-image" src={image} />
      <h3 className="dog-breed">{breed}</h3>
      <div className="image-and-info">
        <img
          className="favorite-image"
          alt="heart icon"
          onClick={(event) => onToggleFavorite(id, event)}
          src={isFavorite ? favorited : unfavorited}
        />
        <Link to={`/breeds/${breed}`}>
          <img className="info-icon" src={infoIcon} alt="info icon"/>
        </Link>
      </div>
    </section>
  );
};

export default Dog;
