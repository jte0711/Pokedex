import React, { useState, useEffect, useContext } from "react";
import { getPokemon } from "../api/pokeApi";
import { colors } from "../config/color";
import PokeContext from "../config/pokeContext";
import PokeType from "./PokeType";
import ReleaseButton from "./ReleaseButton";

const WideCard = (props) => {
  const [type, setType] = useState([]);
  const [poke, setPoke] = useState();
  const context = useContext(PokeContext);

  const releaseHandler = () => {
    context.releasePokemon(props.name, props.nickname);
  };

  const initPoke = async () => {
    //Get Pokemon data
    const pokeDeets = await getPokemon(props.name);
    setPoke(pokeDeets);
    setType(pokeDeets.types); //list, check api call
  };

  useEffect(() => {
    initPoke();
  }, [props]);

  return (
    <div style={card}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "25%",
        }}
      >
        <img src={poke ? poke.sprites.front_default : null} />
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

const hBar = {
  height: "15px",
  backgroundColor: colors.hp,
  borderRadius: "20px",
};

const pad = {
  padding: "0 20px 0 20px",
};

const card = {
  display: "flex",
  flexDirection: "row",
  width: "500px",
  height: "150px",
  backgroundColor: "white",
  marginBottom: "10px",
  borderRadius: "10px",
};
const mbCard = {
  ...card,
  width: "100%",
};
export default WideCard;
