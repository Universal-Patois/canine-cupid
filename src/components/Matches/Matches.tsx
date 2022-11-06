import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { dogData } from "../../utilities/interfaces";
import Dog from '../Dog/Dog'
import { Navigation, Mousewheel, Keyboard, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Matches.css";

const Matches = ({filteredDogs, favorites, onToggleFavorite}: {filteredDogs: dogData[]; favorites: number[]; onToggleFavorite: (id: number, wasFavorite: boolean) => void}): any => {
  const createSwiperSlides = () => {
    let matchedDogs = filteredDogs.map((dog) => {
      return (
        <SwiperSlide className="swiper-slide" key={dog.id}>
           <Dog 
            key={dog.id}
            image = {dog.image.url}
            breed = {dog.name}
            id = {dog.id}
            isFavorite= {favorites.includes(dog.id)}
            onToggleFavorite = {onToggleFavorite}
          />
        </SwiperSlide>
      );
    });
    return matchedDogs;
  };
  return (
    <div className="matches-container">
      <h1 className="matches-header">Your Matches:</h1>
      {filteredDogs.length > 0 &&
      <section className="matches-swiper">
        <Swiper
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          keyboard={true}
          mousewheel={true}
          className="all-swiper-matches"
        >
          {createSwiperSlides()}
        </Swiper>
      </section>
      }
      {filteredDogs.length === 0 && <h2>Sorry! We lost your matches. Please click the logo at the top to go back home.</h2>}
    </div>
  );
};

export default Matches;
