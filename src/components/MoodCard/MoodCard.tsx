import "./MoodCard.css";
import { personalityState } from "../../utilities/interfaces";
import React, { useState } from "react";

const MoodCard = ({
  personality,
  selectDog,
}: {
  personality: personalityState;
  selectDog: Function;
}) => {
  return (
    <div
      style={{ borderColor: `${personality.color}` }}
      className="mood-card"
      key={personality.name}
      onClick={() => {
        selectDog(personality);
      }}
    >
      <h2>{personality.name}</h2>
      <p>{personality.description}</p>
    </div>
  );
};

export default MoodCard;
