import React, { useEffect, useState, useContext } from "react";
import { getAllPokemons } from "../api/pokeApi";
import Card from "../components/Card";
import PokeContext from "../config/pokeContext";

const PokemonList = () => {
  const context = useContext(PokeContext);
  const [pokeList, setPokeList] = useState();

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
    <div>
      <div style={{ columns: "300px 4" }}>
        {pokeList
          ? pokeList.map((data) => (
              <Card name={data.name} apiUrl={data.url} owned={data.owned} />
            ))
          : null}
      </div>
    </div>
  );
};

export default PokemonList;
