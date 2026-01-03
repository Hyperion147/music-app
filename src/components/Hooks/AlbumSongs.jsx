import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "../../context/toastContext";

export default function useAlbumSongs(id) {
  const { showSuccess, showError } = useToast();
  const [value, setValue] = useState(null);
  // console.log("hook id" , id);
  useEffect(() => {
    if (!id) return;

    const fetchSong = async () => {
      try {
        const resp = await axios.get(
          `https://saavn.sumit.co/api/albums?id=${id}`,
        );
        // console.log("API DATA:", resp.data);
        setValue(resp.data);
      } catch (error) {
        console.log(error);
        showError("Api not responding!");
      }
    };

    fetchSong();
  }, [id]);

  return value;
}
