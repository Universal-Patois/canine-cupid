import React from "react";
import { fetchErrorImage } from "../../utilities/apiCalls";
import './Error.css'

const Error = ({codeNumber}: {codeNumber: number}, {message}: {message: string}) => {
  return (
    <div className="error-container">
      <p>{message}</p>
      <img
        alt='error image'
        className="error-image"
        src={`${fetchErrorImage(codeNumber)}`}
        ></img>
    </div>
  )
}

export default Error;