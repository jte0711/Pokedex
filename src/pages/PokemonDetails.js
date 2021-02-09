import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemon, getPokeMoves, getPokeSpecies } from "../api/pokeApi";
import PokeType from "../components/PokeType";
import PokeContext from "../config/pokeContext";
import isMobile from "../hooks/useIsMobile";

const PokemonDetails = (props) => {
  const [moves, setMoves] = useState();
  const [pokemon, setPokemon] = useState();
  const [flavourText, setFlavourText] = useState();
  const isMb = isMobile(769);
  const { pokeId } = useParams();
  const context = useContext(PokeContext);

  const nameIsTaken = (nickname) => {
    for (let i = 0; i < context.myPokemon.length; i++) {
      if (nickname == context.myPokemon[i].nickname) {
        return true;
      }
    }
    return false;
  };

  const catchPokemon = () => {
    if (Math.random() < 0.5) {
      alert(pokeId.charAt(0).toUpperCase() + pokeId.slice(1) + " run away!");
      return;
    }
    let pokeName = pokeId;
    let pokeNickname = prompt("Please name your pokemon");
    if (nameIsTaken(pokeNickname)) {
      alert("Nickname is used by other Pokemon");
      return;
    }
    context.setMyPokemon({ name: pokeName, nickname: pokeNickname });
    context.setOwnedPokemon(pokeName);
  };

  const initFlTxt = (data) => {
    getPokeSpecies(data.name, data.url).then((res) => {
      setFlavourText(res);
    });
  };

  const initData = () => {
    getPokemon(pokeId).then(async (res) => {
      setPokemon(res);
      let temp = res.moves;
      let maxMove = temp.length;
      if (temp.length > 4) {
        maxMove = 4;
      }
      initFlTxt(res.species);
      temp = temp.slice(0, maxMove);
      temp = await Promise.all(
        temp.map(async (el) => {
          return await getPokeMoves(el.move.name, el.move.url);
        })
      );

      setMoves(temp);
    });
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMb ? "column" : "row",
        maxWidth: isMb ? null : "50%",
        zIndex: 1,
        backgroundColor: "white",
        borderRadius: "10px",
        margin: isMb ? "25px" : "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: isMb ? null : "40%",
          height: "100%",
          alignItems: "center",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <div
          style={{
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
              alt={pokeId + " sprite"}
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
          {flavourText ? flavourText : null}
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
                <PokeType colorName={data.type.name}>
                  {data.type.name.charAt(0).toUpperCase() +
                    data.type.name.slice(1)}
                </PokeType>
              ))
            : null}
        </div>
        <div style={styleA}>
          <div style={lTxt}>Height</div>
          {pokemon ? (
            <div style={{ fontSize: "14px" }}>{pokemon.height / 10}m</div>
          ) : null}
        </div>
        <div style={styleA}>
          <div style={lTxt}>Weight</div>
          {pokemon ? (
            <div style={{ fontSize: "14px" }}>{pokemon.weight / 10}kg</div>
          ) : null}
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
          alt={"Catch pokemon"}
          onClick={catchPokemon}
        >
          CATCH
        </button>
      </div>
      <div
        style={{
          width: isMb ? null : "60%",
          height: "100%",
          paddingLeft: "20px",
          paddingRight: "20px",
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
                  <span style={lTxt}>
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
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "15px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        ...lTxt,
                        paddingBottom: "10px",
                        margin: "0",
                        textAlign: "left",
                        fontWeight: "normal",
                      }}
                    >
                      {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                    </p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p style={{ ...mr, ...lTxt }}>PP: {data.pp}</p>
                      <p style={{ ...mr, ...lTxt }}>Power: {data.power}</p>
                    </div>
                  </div>
                  <PokeType colorName={data.type.name}>
                    {data.type.name.charAt(0).toUpperCase() +
                      data.type.name.slice(1, 11)}
                  </PokeType>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

const lTxt = {
  fontWeight: "300",
  fontStyle: "normal",
  fontSize: "14px",
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

export default PokemonDetails;
