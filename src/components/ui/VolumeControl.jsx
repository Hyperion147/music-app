<<<<<<< HEAD

import { Volume1, Volume2, VolumeX } from "lucide-react";
import {  useState } from "react";

export default function VolumeControl({ volume, setVolume , audioRef }) {

  const [isvloume , setIsVolume] = useState(false)
  

  const handlemute = () => {
    setIsVolume(!isvloume)

    if(isvloume == false){
      audioRef.current.muted = true
    }
    else{
      audioRef.current.muted = false

    }
    
  }



  return (
    <div className="flex items-center gap-3">

      <div onClick={handlemute}>
      {
        isvloume ? 
        <div>
          <VolumeX/>
        </div>
        :
        <div >
     {
      volume >= 50 && volume <= 100 ?
      <Volume2/>
      :
      volume >= 1 && volume <= 50 ? 
      <Volume1/>
      :
      <VolumeX/>

    }
      </div>
      }
      </div>
      
      

     
      <div className="relative w-28 h-2 bg-neutral-700 rounded-full">

        
=======
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export default function VolumeControl({ volume, setVolume, audioRef }) {
  const [isvloume, setIsVolume] = useState(false);

  const handlemute = () => {
    setIsVolume(!isvloume);

    if (isvloume == false) {
      audioRef.current.muted = true;
    } else {
      audioRef.current.muted = false;
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div onClick={handlemute}>
        {isvloume ? (
          <div>
            <VolumeX />
          </div>
        ) : (
          <div>
            {volume >= 50 && volume <= 100 ? (
              <Volume2 />
            ) : volume >= 1 && volume <= 50 ? (
              <Volume1 />
            ) : (
              <VolumeX />
            )}
          </div>
        )}
      </div>

      <div className="relative w-28 h-2 bg-neutral-700 rounded-full">
>>>>>>> 8cb3f65 (ui changes)
        <div
          className="absolute h-2 bg-[#00FF88] rounded-full"
          style={{ width: `${volume}%` }}
        />

<<<<<<< HEAD
        
=======
>>>>>>> 8cb3f65 (ui changes)
        <div
          className="absolute top-1/2 w-4 h-4 bg-[#00FF88] rounded-full -translate-y-1/2"
          style={{ left: `calc(${volume}% - 8px)` }}
        />

<<<<<<< HEAD
      
=======
>>>>>>> 8cb3f65 (ui changes)
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
