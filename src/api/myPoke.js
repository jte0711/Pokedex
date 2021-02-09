import { mypokes } from "../config/env";

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
  console.log(JSON.parse(temp));
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

export { catchPokemon, getMyPokemon, releasePokemon };
