import React, { useContext, useState, useEffect } from "react";
import PokeContext from "../config/pokeContext";
import WideCard from "../components/WideCard";

const MyPokemonList = () => {
  const [pokeList, setPokeList] = useState();
  const context = useContext(PokeContext);

  const initPokes = async () => {
    let pokes = context.myPokemon;

    console.log(pokes);
    setPokeList(pokes);
  };

  useEffect(() => {
    initPokes();
  }, []);

  return (
    <div>
      <ul>
        {pokeList
          ? pokeList.map((data) => (
              <li>
                <WideCard
                  nickname={data.nickname}
                  name={data.name}
                  apiUrl={data.url}
                />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default MyPokemonList;
