import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import PokemonDetails from "./pages/PokemonDetails";
import PokemonList from "./pages/pokemonList";
import MyPokemonList from "./pages/MyPokemonList";
import PokeContext from "./config/pokeContext";
import { useState } from "react";

function App() {
  const [myPokemon, setMyPokemon] = useState([
    {
      name: "squirtle",
      nickname: "turtle",
      url: "https://pokeapi.co/api/v2/pokemon/7/",
    },
    {
      name: "bulbasaur",
      nickname: "moving plant",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
  ]);
  const [ownedPokemon, setOwnedPokemon] = useState({ squirtle: 1 });

  return (
    <PokeContext.Provider
      value={{
        myPokemon: myPokemon,
        setMyPokemon: (newData) => {
          setMyPokemon([...myPokemon, newData]);
        },
        ownedPokemon: ownedPokemon,
        setOwnedPokemon: (newData) => {
          let newCount = newData;
          if (newData in ownedPokemon) {
            newCount = ownedPokemon[newData] + 1;
          }

          setOwnedPokemon(
            Object.assign({}, ownedPokemon, { newData: newCount })
          );
        },
      }}
    >
      <Router>
        <div className="App">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: "50px",
            }}
          >
            <Link to="/">Pokedex</Link>
            <Link to="/mypokemon">My Pokemons</Link>
          </div>
          <Switch>
            <Route exact path="/">
              <PokemonList />
            </Route>
            <Route exact path="/pokemon/:pokeId">
              <PokemonDetails />
            </Route>
            <Route exact path="/mypokemon">
              <MyPokemonList />
            </Route>
          </Switch>
        </div>
      </Router>
    </PokeContext.Provider>
  );
}

export default App;
