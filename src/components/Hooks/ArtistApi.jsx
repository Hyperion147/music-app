import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "../../context/toastContext";

export default function ArtistApi() {
  const [data, setData] = useState(null);
  const queries = ["D", "A", "S", "R", "M", "K"];
  const q = queries[Math.floor(Math.random() * queries.length)];
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    axios
      .get(
        `https://saavn.sumit.co/api/search/artists?query=${q}&page=0&limit=10`,
      )
      .then((res) => setData(res.data))
      .catch((error) => {
        console.log(error);
        showError("Api not responding!");
      });
  }, []);

  return data;
}
