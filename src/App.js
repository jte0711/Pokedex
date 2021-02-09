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
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";

function App() {
  const [myPokemon, setMyPokemon] = useState([]);
  const [ownedPokemon, setOwnedPokemon] = useState({});
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <PokeContext.Provider
      value={{
        myPokemon: myPokemon,
        setMyPokemon: (newData) => {
          setMyPokemon([...myPokemon, newData]);
        },
        releasePokemon: (name, nickname) => {
          let temp = myPokemon;
          for (let i = 0; i < myPokemon.length; i++) {
            if (myPokemon[i].nickname == nickname) {
              temp.splice(i, 1);
              break;
            }
          }
          let nCount = ownedPokemon[name] - 1;
          setMyPokemon(temp);
          setOwnedPokemon(Object.assign({}, ownedPokemon, { [name]: nCount });
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
              marginBottom: "50px",
            }}
          >
            <NavbarBrand href="/" className="mr-auto">
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
                    {/* <div
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
                    </div> */}
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>{" "}
          {/* <div style={navbar}></div> */}
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
