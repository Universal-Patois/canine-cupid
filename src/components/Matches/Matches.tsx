import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Matches.css"


type MatchDog = {
    id: number,
    name: string, 
    image: string, 
    favorite: boolean
}

const Matches = ({filteredDogs, onFavorite}: {filteredDogs: MatchDog[], onFavorite: (id:number) => void }) => {

    const handleClick = (event:any) => {
        onFavorite(event.target.value);
    }

const createSwiperSlides = () => {
    let matchedDogs = filteredDogs.map(dog => {
        return (
            <SwiperSlide className= "swiper-slide" key={dog.id}>
                <div className ="match-page">
                    <img src = {dog.image.url} alt = "dog" className="dog-image"/>
                    <h2 className = "dog-name">{dog.name}</h2>
                    <img src = {}
                </div>
            </SwiperSlide>
        )
    })
}



    return (
        <div className = "matches-container">
            <h1 className="matches-header">Your Matches:</h1>
            

        </div>
    )
}

export default Matches