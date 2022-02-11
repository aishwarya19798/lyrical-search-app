import instance from "../instance";
const apiKey = process.env.REACT_APP_API_KEY;

const requests = {
  topTen: `chart.tracks.get?chart_name=top&page=1&page_size=10&f_has_lyrics=1&apikey=${apiKey}`,
};

export const searchLyrics = async (searchString) => {
  const response = await instance.get(
    `track.search?q_track=${searchString}&page_size=5&page=1&s_track_rating=desc&apikey=${apiKey}`
  );
  const data = response.data.message.body.track_list;
  return data;
};

export const getTopTen = async () => {
  const response = await instance.get(requests.topTen);
  const data = response.data.message.body.track_list;
  // console.log(data.message.body.track_list[0].track.album_name);
  // console.log(data);
  // setTrack(data);
  return data;
};

export const getLyricsData = async (trackId) => {
  try {
    const request = await instance.get(
      `track.lyrics.get?track_id=${trackId}&apikey=${apiKey}`
    );
    const data = request.data.message.body.lyrics.lyrics_body;
    // setLyrics(data.lyrics.lyrics_body);
    // console.log(data)
    return data;
  } catch (e) {
    console.log(e);
  }
};
