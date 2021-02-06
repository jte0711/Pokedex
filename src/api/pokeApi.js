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
      let result = res.data.results;
      result = result.map((data) => {
        return Object.assign(data, { owned: 0 });
      });
      localStorage.setItem(pokes, JSON.stringify(result));
      return result; //result only up to twenty, adjust limiter or make a code to iterate through the rest
    })
    .catch((err) => {
      console.log(err);
    });
}

function getPokemon(name) {
  const localRes = localStorage.getItem(name);
  if (localRes != null) {
    return JSON.parse(localRes);
  }

  const endpoint = apiUrl + "pokemon/" + name;

  axios
    .get(endpoint)
    .then((res) => {
      localStorage.setItem(name, JSON.stringify(res.data));
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export { getAllPokemons, getPokemon };
