import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemon } from "../api/pokeApi";
import { typeColor } from "../config/color";
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
    context.setOwnedPokemon(pokeName);
  };

  const initData = async () => {
    // const pokeDeets = await getPokemon(pokeId);
    // setPokemon(pokeDeets);

    getPokemon(pokeId).then((res) => {
      setPokemon(res);
      let temp = res.moves;
      let maxMove = temp.length;
      if (temp.length > 4) {
        maxMove = 4;
      }
      setMoves(temp.slice(0, maxMove));
    });

    // let temp = pokeDeets.moves;
    // let maxMove = temp.length;
    // if (temp.length > 4) {
    //   maxMove = 4;
    // }
    // setMoves(temp.slice(0, maxMove));
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
        zIndex: 1,
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          height: "100%",
          alignItems: "center",
          paddingLeft: "25px",
          paddingRight: "25px",
        }}
      >
        <div
          style={{
            maxHeight: "100px",
            width: "100%",
            display: "flex",
            paddingTop: "20px",
            paddingBottom: "20px",
            justifyContent: "center",
          }}
        >
          {pokemon ? (
            <img
              src={pokemon.sprites.front_default}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : null}
        </div>
        <div
          style={{
            paddingBottom: "20px",
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "18px",
            lineHeight: "21px",
          }}
        >
          {pokeId.charAt(0).toUpperCase() + pokeId.slice(1)}
        </div>
        <div
          style={{
            paddingBottom: "20px",
            fontFamily: "Roboto",
            fontStyle: "italic",
            fontWeight: "300",
            fontSize: "14px",
            lineHeight: "16px",
          }}
        >
          This is flavor text This is flavor text This is flavor text This is
          flavor text This is flavor text This is flavor text This is flavor
          text
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingBottom: "20px",
          }}
        >
          {pokemon
            ? pokemon.types.map((data) => (
                <div
                  style={{
                    width: "80px",
                    height: "25px",
                    borderRadius: "10px",
                    backgroundColor: typeColor[data.type.name],
                    color: "white",
                    fontWeight: "700",
                    fontSize: "12px",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    margin: "5px",
                  }}
                >
                  {data.type.name.charAt(0).toUpperCase() +
                    data.type.name.slice(1)}
                </div>
              ))
            : null}
        </div>
        <div style={styleA}>
          <div style={hw}>Height</div>
          {pokemon ? (
            <div style={{ ...hw, fontWeight: "normal" }}>
              {pokemon.height / 10}m
            </div>
          ) : null}
        </div>
        <div style={styleA}>
          <div style={{ ...hw, fontWeight: "normal" }}>Weight</div>
          {pokemon ? <div style={hw}>{pokemon.weight / 10}kg</div> : null}
        </div>
        <button
          style={{
            fontWeight: "700",
            fontSize: "14px",
            lineHeight: "16px",
            color: "white",
            width: "150px",
            height: "40px",
            backgroundColor: "#F04C4C",
            border: "none",
            borderRadius: "25px",
            marginTop: "40px",
          }}
          onClick={catchPokemon}
        >
          CATCH
        </button>
      </div>
      <div
        style={{
          width: "60%",
          height: "100%",
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      >
        <div style={h2}>Stats</div>
        <hr></hr>
        <div style={{ columns: "2 auto" }}>
          {pokemon
            ? pokemon.stats.map((data) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    {data.stat.name.charAt(0).toUpperCase() +
                      data.stat.name.slice(1, 11)}
                  </span>
                  <span>{data.base_stat}</span>
                </div>
              ))
            : null}
        </div>
        <div style={h2}>Moves</div>
        <hr></hr>
        <div>
          {moves
            ? moves.map((data) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <p style={{ paddingBottom: "10px", margin: "0" }}>
                      {data.move.name.charAt(0).toUpperCase() +
                        data.move.name.slice(1)}
                    </p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={mr}>Test</p>
                      <p style={mr}>Test</p>
                    </div>
                  </div>
                  <div>Moves Type</div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

const styleA = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-around",
};

const h2 = {
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "24px",
  width: "100%",
  textAlign: "left",
  paddingTop: "20px",
};

const mr = {
  margin: "0",
  paddingRight: "10px",
};

const font = { fontFamily: "Roboto", fontStyle: "normal" };
const hw = {
  ...font,
  paddingBottom: "10px",
  fontWeight: "300",
  fontSize: "14px",
  lineHeight: "16px",
};

export default PokemonDetails;
