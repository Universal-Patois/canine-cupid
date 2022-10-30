import React from "react";

const Dog = ({image, breed}: { image: string; breed: string}) => {

  return (
    <main>
      <img alt="dog" className="featured-dog">{image}</img>
      <h3 className="dog-breed">{breed}</h3>
    </main>
  )
}

export default Dog;