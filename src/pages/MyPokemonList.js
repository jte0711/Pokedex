import React, { useContext, useState, useEffect } from "react";
import PokeContext from "../config/pokeContext";
import WideCard from "../components/WideCard";

const MyPokemonList = () => {
  const [pokeList, setPokeList] = useState();
  const context = useContext(PokeContext);

  useEffect(() => {
    setPokeList(context.myPokemon);
  }, [context]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: "25px",
        paddingRight: "25px",
      }}
    >
      {pokeList
        ? pokeList.map((data, index) => (
            <WideCard
              nickname={data.nickname}
              name={data.name}
              apiUrl={data.url}
              key={index}
            />
          ))
        : null}
    </div>
  );
};

export default MyPokemonList;
