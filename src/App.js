import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import PokemonDetails from "./components/PokemonDetails";
import PokemonList from "./pages/pokemonList";

function App() {
  return (
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
  );
}

export default App;
