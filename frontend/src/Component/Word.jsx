import React from "react";
import { NavLink, useParams } from "react-router-dom";

const word = () => {
  const word = useParams();
console.log("invoed word page");
  return (
    <>
      <div>{word}</div> 
    </>
  );
};

export default word;
