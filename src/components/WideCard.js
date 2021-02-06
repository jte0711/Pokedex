import React, { useState, useEffect } from "react";
import { getPokemon } from "../api/pokeApi";

const WideCard = (props) => {
  const [imgUrl, setImgUrl] = useState("");
  const [type, setType] = useState([]);

  const initPoke = async () => {
    const pokeDeets = await getPokemon(props.name);
    //console.log(pokeDeets);
    setImgUrl(pokeDeets.sprites.front_default); //url
    setType(pokeDeets.types); //list, check api call
  };

  useEffect(() => {
    initPoke();
  }, [props]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "40%",
        border: "solid",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRight: "solid",
          width: "25%",
        }}
      >
        <img src={imgUrl} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "75%" }}>
        <p>{props.nickname}</p>
        <ul>
          <li>Type 1</li>
          <li>Type 2</li>
        </ul>
        <p>More Details</p>
      </div>
    </div>
  );
};

export default WideCard;
