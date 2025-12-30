import axios from "axios";
import { useEffect, useState } from "react";

export default function ArtistApi() {
  const [data, setData] = useState(null);
  const queries = ["D", "A", "S", "R", "M", "K"];
  const q = queries[Math.floor(Math.random() * queries.length)];

  useEffect(() => {
    axios
      .get(
        `https://saavn.sumit.co/api/search/artists?query=${q}&page=0&limit=10`,
      )
      .then((res) => setData(res.data))
      .catch(console.log);
  }, []);

  return data;
}
