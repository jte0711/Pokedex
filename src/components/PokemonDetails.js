import React, { useEffect, useState } from "react";
import { getPokemon } from "../api/pokeApi";

const PokemonDetails = (props) => {
  const [imgUrl, setImgUrl] = useState();
  const [type, setType] = useState();
  const [stats, setStats] = useState();
  const [moves, setMoves] = useState();

  const initData = async () => {
    const pokeDeets = await getPokemon("bulbasaur"); //replace with props.name
    console.log(pokeDeets);
    setImgUrl(pokeDeets.sprites.front_default); //url
    setType(pokeDeets.types); //list, check api call  }
    setStats(pokeDeets.stats);
    let temp = pokeDeets.moves;
    let maxMove = temp.length;
    if (temp.length > 4) {
      maxMove = 4;
    }
    setMoves(temp.slice(0, maxMove));
  };

  useEffect(() => {
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
          <img src={imgUrl} style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </div>
        <div style={{ width: "100%", border: "solid" }}>
          <div>bulbasaur</div>
          <div>
            {type ? type.map((data) => <li>{data.type.name}</li>) : null}
          </div>
        </div>
        <div style={{ width: "100%", border: "solid" }}>Button</div>
      </div>
      <div style={{ width: "60%", height: "100%", border: "solid" }}>
        <div style={{ width: "100%", border: "solid" }}>
          {stats
            ? stats.map((data) => (
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
