import "../style.css/searchSong.css";
import { useEffect, useState } from "react";
import { searchLyrics } from '../service/musixmatch';
import SearchedLyrics from "./SearchedLyrics";

const SearchSong = () => {

  const[searchString, setSearchString] = useState("");
  const[sendSearchString, setSendSearchString] = useState(null);
  const[showTitle, setShowTitle] = useState(false)

  const fetchData = async() =>{
    // console.log(await searchLyrics(searchString));
    setSendSearchString(await searchLyrics(searchString))
    // setSearchString("");
    setShowTitle(true)
  }

  return (
      <div className="searchSong">
          <h1>Search For A Song</h1>
          <h3>Get the lyrics for any track</h3>
          <input className="title-input" type="text" placeholder="Song title..." value={searchString} onChange={(e) => setSearchString(e.target.value)} />
          <input className="search-btn" type="button" value="Search Lyrics" onClick={fetchData} />
          <div className="parentContainer">
            <div className="title">
              {showTitle && <h2>Top 5 Lyrics for your search</h2>}
            </div>
            <div className="sendSearchString">
              {
                sendSearchString && sendSearchString.map(x => (
                  <SearchedLyrics key={x.track.track_id} sendSearchString={x} searchString={searchString}/>
                ))
              }
            </div>
          </div>
      </div>
  );
};

export default SearchSong;
