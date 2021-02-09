import React, { useEffect, useState, useContext } from "react";
import { getAllPokemons } from "../api/pokeApi";
import Card from "../components/Card";
import MbCard from "../components/MbCard";
import PokeContext from "../config/pokeContext";
import useIsMobile from "../hooks/useIsMobile";

const PokemonList = () => {
  const context = useContext(PokeContext);
  const [pokeList, setPokeList] = useState();
  const isMb = useIsMobile(426);

  const checkOwned = (data) => {
    let myPoke = context.ownedPokemon;

    for (let i = 0; i < data.length; i++) {
      if (data[i].name in myPoke) {
        data[i].owned = myPoke[data[i].name];
      }
    }

    return data;
  };

  const initPokes = async () => {
    getAllPokemons().then((res) => {
      let finalPokes = checkOwned(res);
      setPokeList(finalPokes);
    });
  };

  useEffect(() => {
    initPokes();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingLeft: "25px",
        paddingRight: "25px",
      }}
    >
      <div
        style={{
          columnWidth: isMb ? "120px" : "260px",
          columnFill: "auto",
          columnCount: 5,
        }}
      >
        {pokeList
          ? pokeList.map((data) => {
              return isMb ? (
                <MbCard name={data.name} apiUrl={data.url} owned={data.owned} />
              ) : (
                <Card name={data.name} apiUrl={data.url} owned={data.owned} />
              );
            })
          : null}
      </div>
    </div>
  );
};
export default PokemonList;
