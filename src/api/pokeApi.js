import { apiUrl, pokes } from "../config/env";

const axios = require("axios");

async function getAllPokemons() {
  //check if pokemons stored in localStorage
  const localRes = localStorage.getItem(pokes);
  if (localRes != null) {
    return JSON.parse(localRes);
  }

  //request pokemons data
  const endpoint = apiUrl + "pokemon?limit=30";
  try {
    const res = await axios.get(endpoint);
    let result = res.data.results;
    result = result.map((data) => {
      return Object.assign(data, { owned: 0 });
    });
    localStorage.setItem(pokes, JSON.stringify(result));
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function getPokemon(name) {
  const localRes = localStorage.getItem(name);
  if (localRes != null) {
    return JSON.parse(localRes);
  }

  const endpoint = apiUrl + "pokemon/" + name;
  try {
    const res = await axios.get(endpoint);
    localStorage.setItem(name, JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function getPokeMoves(name, url) {
  const localRes = localStorage.getItem(name);
  if (localRes != null) {
    return JSON.parse(localRes);
  }

  const endpoint = url;
  try {
    const res = await axios.get(endpoint);
    let temp = {
      name: res.data.name,
      type: res.data.type,
      pp: res.data.pp,
      power: res.data.power,
    };
    localStorage.setItem(name, JSON.stringify(temp));
    return temp;
  } catch (err) {
    console.log(err);
  }
}

async function getPokeSpecies(name, url) {
  const localRes = localStorage.getItem("species" + name);
  if (localRes != null) {
    return JSON.parse(localRes);
  }

  const endpoint = url;
  try {
    const res = await axios.get(endpoint);
    localStorage.setItem(
      "species" + name,
      JSON.stringify(res.data.flavor_text_entries[0].flavor_text)
    );
    return res.data.flavor_text_entries[0].flavor_text;
  } catch (err) {
    console.log(err);
  }
}

export { getAllPokemons, getPokemon, getPokeMoves, getPokeSpecies };
