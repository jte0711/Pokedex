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
      <div style={headerStyle}>
        <div>Pokedex</div>
        <div>Tabs div</div>
      </div>
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
    </div>
  );
};

const headerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingBottom: "50px",
};

export default PokemonList;
