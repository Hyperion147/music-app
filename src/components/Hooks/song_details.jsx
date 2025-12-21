import { useEffect, useState } from "react";

export default function song_details() {
<<<<<<< HEAD
    const [value , setvalue] = useState();
    
    useEffect(()=>{
        fetch(`https://saavn.sumit.co/api/songs/prJPLljw`)
        .then(res => res.json())
        .then(data => setvalue(data))
    } ,[])

    return value
};
=======
  const [value, setvalue] = useState();

  useEffect(() => {
    fetch("/api/songs/prJPL1jw")
      .then((res) => res.json())
      .then((data) => setvalue(data));
  }, []);

  return value;
}
>>>>>>> 8cb3f65 (ui changes)
