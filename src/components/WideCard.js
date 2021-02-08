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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "75%",
        }}
      >
        <div
          style={{
            ...pad,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "18px", fontStyle: "bold" }}>
            {props.nickname.charAt(0).toUpperCase() + props.nickname.slice(1)}
          </p>
          <ReleaseButton size={"20px"} clickHandler={releaseHandler} />
        </div>
        <div
          style={{
            margin: "0 20px 0 20px",
            backgroundColor: colors.hp,
            borderRadius: "25px",
            fontSize: "12px",
            color: "white",
          }}
        >
          {poke ? poke.stats[0].base_stat : null}/
          {poke ? poke.stats[0].base_stat : null}
        </div>
        <div
          style={{
            ...pad,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {type.map((data) => {
            console.log(data);
            return (
              <PokeType colorName={data.type.name}>
                {data.type.name.toUpperCase()}
              </PokeType>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WideCard;
