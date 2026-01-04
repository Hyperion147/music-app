import axios from "axios";
import { useEffect, useState } from "react";

const CHUNK_SIZE = 5;

export default function LikedSongApi(ids) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ids || ids.length === 0) {
      setData([]);
      setLoading(false);
      return;
    }

    async function fetchAllSongs() {
      setLoading(true);

      try {
        const chunks = [];
        for (let i = 0; i < ids.length; i += CHUNK_SIZE) {
          chunks.push(ids.slice(i, i + CHUNK_SIZE));
        }

        const requests = chunks.map((chunk) =>
          axios.get(`https://saavn.sumit.co/api/songs/${chunk.join(",")}`),
        );

        const responses = await Promise.all(requests);

        const allSongs = responses.flatMap((res) => {
          const result = res.data?.data;
          return Array.isArray(result) ? result : result ? [result] : [];
        });

        setData(allSongs);
      } catch (err) {
        console.log(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAllSongs();
  }, [JSON.stringify(ids)]);

  return { data, loading };
}
