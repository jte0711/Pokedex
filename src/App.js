import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import PokemonDetails from "./pages/PokemonDetails";
import PokemonList from "./pages/pokemonList";
import MyPokemonList from "./pages/MyPokemonList";
import PokeContext from "./config/pokeContext";
import { useState } from "react";
import { colors } from "./config/color";
import { Icon } from "@iconify/react";
import backpack28Filled from "@iconify/icons-fluent/backpack-28-filled";

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
  const [ownedPokemon, setOwnedPokemon] = useState({
    squirtle: 1,
    bulbasaur: 1,
  });

  return (
    <PokeContext.Provider
      value={{
        myPokemon: myPokemon,
        setMyPokemon: (newData) => {
          setMyPokemon([...myPokemon, newData]);
        },
        releasePokemon: (name, nickname) => {
          let temp = [];
          for (let i = 0; i < myPokemon.length; i++) {
            if (myPokemon[i].nickname == nickname) {
              temp = myPokemon.slice(i, 1);
            }
          }
          let nCount = ownedPokemon["name"] - 1;
          setMyPokemon(temp);
          setOwnedPokemon(Object.assign({}, ownedPokemon, { [name]: nCount }));
        },
        ownedPokemon: ownedPokemon,
        setOwnedPokemon: (newData) => {
          let newCount = 1;
          if (newData in ownedPokemon) {
            newCount = ownedPokemon[newData] + 1;
          }
          setOwnedPokemon(
            Object.assign({}, ownedPokemon, { [newData]: newCount })
          );
        },
      }}
    >
      <Router>
        <div
          className="App"
          style={{ backgroundColor: colors.background, minHeight: "100vh" }}
        >
          <div style={navbar}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <p
                className="logo"
                style={{
                  color: colors.pokeGold,
                  paddingTop: "25px",
                  paddingBottom: "25px",
                }}
              >
                POKEMON
              </p>
            </Link>
            <Link to="/mypokemon">
              <div
                style={{
                  width: "100px",
                  height: "50px",
                  background: "#FFDE00",
                  border: "2px solid #3B4CCA",
                  boxSizing: "border-box",
                  borderRadius: "25px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Icon
                  style={{ width: "30px", height: "30px" }}
                  icon={backpack28Filled}
                />
              </div>
            </Link>
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

const navbar = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: "25px",
  paddingRight: "25px",
  marginBottom: "50px",
  backgroundColor: colors.navbar,
};
export default App;
