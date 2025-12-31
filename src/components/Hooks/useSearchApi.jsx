// useSearchApi.jsx
import axios from "axios";
import { useEffect, useState } from "react";

export default function useSearchApi(categorie) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (!categorie) return; // do nothing if no category selected

    const fetchData = async () => {
      try {
        const resp = await axios.get(
          `https://saavn.sumit.co/api/search/albums?query=${categorie}&page=0&limit=10`,
        );
        setValue(resp.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [categorie]); // refetch whenever category changes

  return value;
}
