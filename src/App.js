import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import PokemonDetails from "./pages/PokemonDetails";
import PokemonList from "./pages/pokemonList";
import MyPokemonList from "./pages/MyPokemonList";
import PokeContext from "./config/pokeContext";
import { useEffect, useState } from "react";
import { colors } from "./config/color";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import {
  catchPokemon,
  putOwnedPokemon,
  getMyPokemon,
  releasePokemon,
  getOwnedPokemon,
} from "./api/myPoke";

function App() {
  const [myPokemon, setMyPokemon] = useState([]);
  const [ownedPokemon, setOwnedPokemon] = useState({});
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  useEffect(() => {
    let temp = getMyPokemon();
    let ownTemp = getOwnedPokemon();
    setOwnedPokemon(ownTemp);
    setMyPokemon(temp);
  }, []);

  return (
    <PokeContext.Provider
      value={{
        myPokemon: myPokemon,
        setMyPokemon: (newData) => {
          catchPokemon(newData);
          setMyPokemon([...myPokemon, newData]);
        },
        releasePokemon: (name, nickname) => {
          releasePokemon({ name: name, nickname: nickname });
          let temp = myPokemon;
          for (let i = 0; i < myPokemon.length; i++) {
            if (myPokemon[i].nickname == nickname) {
              temp.splice(i, 1);
              break;
            }
          }
          let nCount = ownedPokemon[name] - 1;
          let newOwn = Object.assign({}, ownedPokemon, { [name]: nCount });
          putOwnedPokemon(newOwn);
          setMyPokemon(temp);
          setOwnedPokemon(newOwn);
        },
        ownedPokemon: ownedPokemon,
        setOwnedPokemon: (newData) => {
          let newCount = 1;
          if (newData in ownedPokemon) {
            newCount = ownedPokemon[newData] + 1;
          }
          let newOwn = Object.assign({}, ownedPokemon, { [newData]: newCount });
          putOwnedPokemon(newOwn);
          setOwnedPokemon(newOwn);
        },
      }}
    >
      <Router>
        <div
          className="App"
          style={{
            backgroundColor: colors.background,
            minHeight: "100vh",
            paddingBottom: "25px",
          }}
        >
          <Navbar
            color="faded"
            light
            expand="md"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: "25px",
              paddingRight: "25px",
              marginBottom: "25px",
            }}
          >
            <NavbarBrand className="mr-auto">
              <Link to="/Pokedex" style={{ textDecoration: "none" }}>
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
            </NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar style={{ flexGrow: "0" }}>
              <Nav navbar>
                <NavItem>
                  <Link to="/mypokemon" style={{ textDecoration: "none" }}>
                    <p
                      className="mypoke"
                      style={{ fontSize: "16px", color: colors.pokeGold }}
                    >
                      My Pokemon
                    </p>
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/Pokedex">
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
