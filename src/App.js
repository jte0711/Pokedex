import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import PokemonDetails from "./pages/PokemonDetails";
import PokemonList from "./pages/pokemonList";
import PokeContext from "./config/pokeContext";
import { useState } from "react";

function App() {
  const [myPokemon, setMyPokemon] = useState([]);

  return (
    <PokeContext
      value={{
        myPokemon: myPokemon,
        setMyPokemon: (newData) => {
          setMyPokemon(newData);
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
            <Link to="/pokemon/ivysaur">Pokemon details</Link>
          </div>
          <Switch>
            <Route exact path="/">
              <PokemonList />
            </Route>
            <Route exact path="/pokemon/:pokeId">
              <PokemonDetails />
            </Route>
          </Switch>
        </div>
      </Router>
    </PokeContext>
  );
}

export default App;
