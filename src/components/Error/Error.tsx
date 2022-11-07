import React from "react";
import './Error.css'

const Error = ({url}: { url: string}) => {
  return (
    <div className="error-container">
      <h2 className="error-message">Oops! Try again.</h2>
      <img
        alt='error dog'
        className="error-image"
        src={url}
        ></img>
    </div>
  )
}

export default Error;