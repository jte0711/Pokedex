import { apiUrl, pokes } from "../config/env";

const axios = require("axios");

function getAllPokemons() {
  //check if pokemons stored in localStorage

  const localRes = localStorage.getItem(pokes);
  if (localRes != null) {
    return JSON.parse(localRes);
  }

  //request pokemons data
  const endpoint = apiUrl + "pokemon/";
  axios
    .get(endpoint)
    .then((res) => {
      localStorage.setItem(pokes, JSON.stringify(res));
      return res.result; //result only up to twenty, adjust limiter or make a code to iterate through the rest
    })
    .catch((err) => {
      console.log(err);
    });
}

function getPokemon(pokeId) {
  const localRes = localStorage.getitem(str(pokeId));
  if (localRes != null) {
    return JSON.parse(localRes);
  }

  const endpoint = apiUrl + "pokemon/" + str(pokeId);

  axios
    .get(endpoint)
    .then((res) => {
      localStorage.setItem(str(pokeId), JSON.stringify(res));
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}

export { getAllPokemons, getPokemon };
