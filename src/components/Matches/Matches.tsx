import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { dogData } from "../../utilities/interfaces";
import { Navigation, Mousewheel, Keyboard, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Matches.css";
import info from "../../assets/info.png";
import animal from "../../assets/info.png";

const Matches = ({
  filteredDogs,
  onFavorite,
}: {
  filteredDogs: dogData[];
  onFavorite: (id: number) => void;
}) => {
  const handleClick = (event: any) => {
    onFavorite(event.target.getAttribute("data-id"));
  };

  const createSwiperSlides = () => {
    let matchedDogs = filteredDogs.map((dog) => {
      return (
        <SwiperSlide className="swiper-slide" key={dog.id}>
          <img src={dog.image.url} alt="dog" className="dog-image" />
          <h2 className="dog-name">{dog.name}</h2>
          <div className="icons">
            <img src={info} alt="information" className="info-image" />
            <img
              src={animal}
              alt="favorite"
              data-id={dog.id}
              className="favorite-image"
              onClick={handleClick}
            />
          </div>
        </SwiperSlide>
      );
    });
    return matchedDogs;
  };
  return (
    <div className="matches-container">
      <h1 className="matches-header">Your Matches:</h1>
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
    </div>
  );
};

export default Matches;
