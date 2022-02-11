import { useState, useEffect } from "react";
import { getLyricsData } from "../service/musixmatch";
import { useHistory } from "react-router-dom";
import "../style.css/searchedSong.css"


const SearchedLyrics = ({sendSearchString,searchString}) => {

    // console.log(sendSearchString)

    let history = useHistory();

    const trackName = sendSearchString.track.album_name;
    const albumBy = sendSearchString.track.artist_name;
    const trackRating = sendSearchString.track.track_rating;
    const trackId = sendSearchString.track.track_id;

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
        history.push(`/viewLyrics/${trackId}/${encodeURI(searchString)}`);
    }

  return (
  <div className="searchedLyrics">
      <div className="titleContainer">
            <h4>Track: {trackName} </h4>
            <h4>AlbumBy: {albumBy} </h4>
            <h4>Track rating: {trackRating}</h4>
      </div>
      <div className="parent-viewBtn">
            <input onClick={handleClick} className="view-btn" type="button" value="View Lyrics" />
      </div>
  </div>
)
};

export default SearchedLyrics;
