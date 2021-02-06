import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getPokemon } from "../api/pokeApi";

const Card = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [type, setType] = useState([]);
  const history = useHistory();

  const goToPokemon = () => {
    history.push("/pokemon/" + props.name);
  };
  const getDeets = async () => {
    const pokeDeets = await getPokemon(props.name);
    console.log(pokeDeets);
    setImageUrl(pokeDeets.sprites.front_default); //url
    setType(pokeDeets.types); //list, check api call
  };

  useEffect(() => {
    getDeets();
  }, [props]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "150px",
        width: "250px",
        borderStyle: "solid",
      }}
      onClick={goToPokemon}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          height: "100%",
          borderRight: "solid",
        }}
      >
        <img
          src={imageUrl}
          alt="Ivysaur sprite"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "solid",
          }}
        >
          <p>{props.name}</p>
          <p>{props.owned}</p>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {type.map((data) => (
            <li>{data.type.name}</li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
