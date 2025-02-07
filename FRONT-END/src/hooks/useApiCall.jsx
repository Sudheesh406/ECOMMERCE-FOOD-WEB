import axios from "../axios";
import { useEffect, useState } from "react";

const useApiCall = (url) => {
  const [value, setvalue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url ) {
    async function fetchData() {      
      try {
        const {data}  = await axios.get(url);
        setvalue(data.result);
      } catch (error) {
        console.log(error);
        setError(error.response?.message || error.message);
      } finally {
        setLoading(false);
      }
    }
  

    fetchData();
  }
  }, [url]);

  return { loading, value, error };
};

export default useApiCall;
