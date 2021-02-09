import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getPokemon } from "../api/pokeApi";

const MbCard = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const history = useHistory();

  const goToPokemon = () => {
    history.push("/pokemon/" + props.name);
  };

  const getDeets = async () => {
    const pokeDeets = await getPokemon(props.name);
    setImageUrl(pokeDeets.sprites.front_default); //url
  };

  useEffect(() => {
    getDeets();
  }, [props]);

  return (
    <div
      style={{
        backgroundColor: "white",
        marginBottom: "10px",
        borderRadius: "10px",
        padding: "5px",
      }}
      onClick={goToPokemon}
    >
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          backgroundColor: "#F04C4C",
          borderRadius: "50px",
          width: "20px",
          height: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontWeight: "700",
        }}
      >
        {props.owned}
      </div>
      <div>
        <img src={imageUrl} alt={props.name + " sprite"} />
      </div>
      <div>
        <p style={{ margin: "0px" }}>
          {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default MbCard;
