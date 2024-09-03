import { useEffect, useState } from "react";

const UseFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  async function fetchData() {
    setPending(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(response.statusText);
      const result = await response.json();
      setData(result);
      setError(null);
      setPending(false);
    } catch (e) {
      setError(`${e} error has occured`);
      setPending(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [url]);
  return { data, pending, error };
};

export default UseFetch;
