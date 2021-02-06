import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemon } from "../api/pokeApi";
import PokeContext from "../config/pokeContext";

const PokemonDetails = (props) => {
  const [moves, setMoves] = useState();
  const [pokemon, setPokemon] = useState();
  const { pokeId } = useParams();
  const context = useContext(PokeContext);

  const catchPokemon = () => {
    let pokeName = pokeId;
    let pokeNickname = prompt("Please name your pokemon");
    context.setMyPokemon({ name: pokeName, nickname: pokeNickname });
  };

  const initData = async () => {
    const pokeDeets = await getPokemon(pokeId); //replace with props.name
    setPokemon(pokeDeets);
    console.log(pokeDeets);

    let temp = pokeDeets.moves;
    let maxMove = temp.length;
    if (temp.length > 4) {
      maxMove = 4;
    }
    setMoves(temp.slice(0, maxMove));
  };

  useEffect(() => {
    console.log("init data");
    initData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "50%",
        height: "500px",
        border: "solid",
        zIndex: 1,
      }}
    >
      <div style={{ width: "40%", height: "100%", border: "solid" }}>
        <div
          style={{
            height: "50%",
            width: "100%",
            border: "solid",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {pokemon ? (
            <img
              src={pokemon.sprites.front_default}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : null}
        </div>
        <div style={{ width: "100%", border: "solid" }}>
          <div>{pokeId}</div>
          <div>
            {pokemon
              ? pokemon.types.map((data) => <li>{data.type.name}</li>)
              : null}
          </div>
        </div>
        <div style={{ width: "100%", border: "solid" }}>
          <button onClick={catchPokemon}>CATCH</button>
        </div>
      </div>
      <div style={{ width: "60%", height: "100%", border: "solid" }}>
        <div style={{ width: "100%", border: "solid" }}>
          {pokemon
            ? pokemon.stats.map((data) => (
                <div>
                  <span>{data.stat.name}</span>
                  <span>{data.base_stat}</span>
                </div>
              ))
            : null}
        </div>
        <div>
          {moves
            ? moves.map((data) => (
                <div>
                  <span>{data.move.name}</span>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
