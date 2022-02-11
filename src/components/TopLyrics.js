import { useEffect, useState } from "react";
import { getTopTen } from "../service/musixmatch";
import SongContainer from "./SongContainer";
import "../style.css/topLyrics.css";

const TopLyrics = () => {

  const[getTrack, setTrack] = useState([])

  useEffect(()=>{
    const fetchData = async() => {
      setTrack(await getTopTen())
    }
    fetchData()
  },[])

  return (
    <div className="topLyrics">
        <h2>Top 10 Lyrics</h2>
        <div className="parentSongContainer">
          {
            getTrack.length>0 && getTrack.map((trackDetails) => (
              <SongContainer key={trackDetails.track.track_id} trackDetails={trackDetails}/>
            ))
          }
        </div>
    </div>
  )
};

export default TopLyrics;
