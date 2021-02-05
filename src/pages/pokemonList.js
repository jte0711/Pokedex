import React, { useEffect, useState } from "react";
import { getAllPokemons } from "../api/pokeApi";
import Card from "../components/Card";

const PokemonList = () => {
  const [pokeList, setPokeList] = useState();

  const initPokes = async () => {
    let pokes = await getAllPokemons();
    console.log(pokes);
    setPokeList(pokes);
  };

  useEffect(() => {
    console.log("rest");
    initPokes();
  }, []);

  return (
    <div>
      <ul>
        {pokeList
          ? pokeList.map((data) => (
              <li>
                <Card name={data.name} apiUrl={data.url} />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default PokemonList;
