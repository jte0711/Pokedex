import React from "react";
import Card from "../components/Card";

const PokemonList = () => {
  return (
    <div>
      <div style={headerStyle}>
        <div>Pokedex</div>
        <div>Tabs div</div>
      </div>
      <div>
        <Card />
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
