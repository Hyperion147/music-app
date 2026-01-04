import axios from "axios";
import { useEffect, useState } from "react";

export default function SerchResult(str) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (!str) return;

    const fetchSong = async () => {
      try {
        const resp = await axios.get(
          `https://saavn.sumit.co/api/search/albums?query=${str}&page=0&limit=10`,
        );

        setValue(resp.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSong();
  }, [str]);

  return value;
}
