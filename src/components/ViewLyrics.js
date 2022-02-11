import "../style.css/viewLyrics.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getLyricsData, getTopTen, searchLyrics } from "../service/musixmatch";

const ViewLyrics = () => {
  // use-change
  const location = useLocation();
  
  const [songDetails, setSongDetails] = useState(null);
  // const [searchedDetails, setSearchedDetails] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const trackId = location.pathname.split("/")[2];
      const trackName = decodeURI(location.pathname.split('/')[3]);
      const lyrics = await getLyricsData(trackId);
      const songs = await getTopTen();
      const searchSong = await searchLyrics(trackName);
      const searchedSong = searchSong.filter((x) => x.track.track_id == trackId)[0];
      const currentSong = songs.filter((x) => x.track.track_id == trackId)[0];
      // console.log(searchedSong);
      // console.log(currentSong);
      const fullData = {
        trackName: currentSong?.track.album_name ?? searchedSong.track.album_name,
        albumBy: currentSong?.track.artist_name ?? searchedSong.track.artist_name,
        lyrics,
      };
      // const searchData = {
      //   trackName: searchedSong.track.album_name,
      //   albumBy: searchedSong.track.artist_name,
      //   lyrics,
      // };
      setSongDetails(fullData);
      // setSearchedDetails(fullData);
      // console.log(fullData);
    };
    fetchData();
  }, []);

  const lyricsList =
    songDetails && songDetails.lyrics.split("*")[0].split("\n");
  // console.log(lyricsList)

  return (
    <div className="viewLyricsContainer">
      <div className="heading">
        <h2>Lyrics</h2>
      </div>
      {songDetails && (
          <div className="viewLyrics">
            <h3>{songDetails.trackName}</h3>
            <h4>{songDetails.albumBy}</h4>
            <h5>
              {lyricsList.map((x, i) => (
                <p key={i}>{x}</p>
              ))}
            </h5>
          </div>
        )}
    </div>
  );
};

export default ViewLyrics;
