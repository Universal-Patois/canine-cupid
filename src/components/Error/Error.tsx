import React from "react";
import './Error.css'

const Error = ({message, url}: {message: string, url: string}) => {
  return (
    <div className="error-container">
      <h2 className="error-message">{message}</h2>
      <img
        alt='error dog'
        className="error-image"
        src={url}
        ></img>
    </div>
  )
}

export default Error;