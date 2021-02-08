import { useState } from "react";

const useAsync = (asyncFunc) => {
  const [data, setData] = useState([]);
  // const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await asyncFunc(...args);

    console.log("in async ", response);

    setLoading(false);
    setData(response ? response : null);
    return response;
  };

  return { data, loading, request };
};

export default useAsync;
