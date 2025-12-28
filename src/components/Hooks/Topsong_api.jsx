import { useEffect, useState } from "react";

export default function Topsong_api() {
    const [value , setvalue] = useState();
    
    useEffect(()=>{
        fetch(`https://saavn.sumit.co/api/search/songs?query=trending&limit=10`)
        .then(res => res.json())
        .then(data => setvalue(data))
    } ,[])

    return value
};
