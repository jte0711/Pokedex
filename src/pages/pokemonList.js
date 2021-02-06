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
    let pokes = await getAllPokemons();
    let finalPokes = checkOwned(pokes);
    console.log(finalPokes);
    setPokeList(finalPokes);
  };

  useEffect(() => {
    initPokes();
  }, [context]);

  return (
    <div>
      <ul>
        {pokeList
          ? pokeList.map((data) => (
              <li>
                <Card name={data.name} apiUrl={data.url} owned={data.owned} />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default PokemonList;
