import axios from "axios";
import { useEffect, useState } from "react";

export default function ArtistSongs(id) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchSong = async () => {
      try {
        const resp = await axios.get(
          `https://saavn.sumit.co/api/artists?id=${id}`,
        );

        setValue(resp.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSong();
  }, [id]);

  return value;
}
