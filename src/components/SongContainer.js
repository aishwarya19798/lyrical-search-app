import { useEffect, useState } from "react";
import { getLyricsData } from "../service/musixmatch";
import { useHistory } from "react-router-dom";
import "../style.css/topLyrics.css";

const SongContainer = ({trackDetails}) => {
    // use-change
    // console.log(trackDetails)

    let history = useHistory();
    
    const trackName = trackDetails.track.album_name;
    const albumBy = trackDetails.track.artist_name;
    const trackId = trackDetails.track.track_id;
    const trackRating = trackDetails.track.track_rating;
    
    const [getLyrics, setLyrics] = useState("");
    
    useEffect(()=>{
      const fetchData = async() =>{
          setLyrics(await getLyricsData(trackId))
      }
      fetchData()
    },[])
    
    function handleClick() {
        const sendData = [
            {
                "trackName" : trackName,
                "albumBy" : albumBy,
                "lyrics" : getLyrics
            }
        ]
        // console.log(sendData)
        history.push(`/viewLyrics/${trackId}`);
    }

  return (
    <div className="song-container">
        <div className="parent-songBody">
            <h4>Track: {trackName} </h4>
            <h4>AlbumBy: {albumBy} </h4>
            <h4>Track rating: {trackRating}</h4>
        </div>
        <div className="parent-viewBtn">
            <input onClick={handleClick} className="view-btn" type="button" value="View Lyrics" />
        </div>
    </div>
  );
};

export default SongContainer;
