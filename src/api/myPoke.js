import { mypokes, ownPokes } from "../config/env";

const catchPokemon = (data) => {
  let temp = {
    name: data.name,
    nickname: data.nickname,
  };
  let res = JSON.parse(localStorage.getItem(mypokes));
  if (res) {
    res.push(temp);
  } else {
    res = [temp];
  }
  localStorage.setItem(mypokes, JSON.stringify(res));
};
const getMyPokemon = () => {
  let temp = localStorage.getItem(mypokes);
  return temp ? JSON.parse(temp) : [];
};
const releasePokemon = async (data) => {
  let temp = JSON.parse(localStorage.getItem(mypokes));

  for (let i = 0; i < temp.length; i++) {
    if (temp[i].nickname == data.nickname) {
      temp.splice(i, 1);
    }
  }

  localStorage.setItem(mypokes, JSON.stringify(temp));
};

const getOwnedPokemon = () => {
  let temp = localStorage.getItem(ownPokes);
  return temp ? JSON.parse(temp) : {};
};

const putOwnedPokemon = (newData) => {
  localStorage.setItem(ownPokes, JSON.stringify(newData));
};

export {
  catchPokemon,
  getMyPokemon,
  releasePokemon,
  getOwnedPokemon,
  putOwnedPokemon,
};
