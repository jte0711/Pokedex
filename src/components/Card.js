import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getPokemon } from "../api/pokeApi";
import PokeType from "./PokeType";

const Card = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [type, setType] = useState([]);
  const history = useHistory();

  const goToPokemon = () => {
    history.push("/pokemon/" + props.name);
  };
  const getDeets = () => {
    getPokemon(props.name).then((res) => {
      setImageUrl(res.sprites.front_default); //url
      setType(res.types);
    }); //list, check api call});
  };

  useEffect(() => {
    getDeets();
  }, [props]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "150px",
        width: "250px",
        marginBottom: "20px",
        borderRadius: "10px",
        backgroundColor: "white",
        pageBreakInside: "avoid",
        breakInside: "avoid",
      }}
      onClick={goToPokemon}
    >
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          backgroundColor: "#F04C4C",
          borderRadius: "50px",
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontWeight: "700",
        }}
      >
        {props.owned}
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
        <img
          src={imageUrl}
          alt={props.name + " sprite"}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            zIndex: 2,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          paddingTop: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            margin: "0px",
            padding: "0px",
          }}
        >
          <p style={{ fontSize: "18px", margin: "0px", padding: "0px" }}>
            {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {type.map((data) => (
            <PokeType colorName={data.type.name}>
              {data.type.name.toUpperCase()}
            </PokeType>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
