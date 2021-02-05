import React, { useState } from "react";

const MyPokemonList = () => {
  const [pokeList, setPokeList] = useState();

  const initPokes = async () => {
    let pokes = await getMyPokemon();
    console.log(pokes);
    setPokeList(pokes);
  };

  useEffect(() => {
    initPokes();
  }, []);

  return (
    <div>
      <ul>
        {pokeList
          ? pokeList.map((data) => (
              <li>
                <WideCard name={data.name} apiUrl={data.url} />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default MyPokemonList;
