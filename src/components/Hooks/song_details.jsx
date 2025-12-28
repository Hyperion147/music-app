import { useEffect, useState } from "react";

export default function song_details() {
  const [value, setvalue] = useState();

  useEffect(() => {
    fetch(`https://saavn.sumit.co/api/songs/prJPLljw`)
      .then((res) => res.json())
      .then((data) => setvalue(data));
  }, []);

  return value;
}
