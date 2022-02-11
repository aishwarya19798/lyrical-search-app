import "./style.css/App.css";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import SearchSong from "./components/SearchSong";
import Header from "./components/Header";
import TopLyrics from "./components/TopLyrics";
import ViewLyrics from "./components/ViewLyrics";

function App() {
  return (
  <Router>
  <div className="App"> 
    <Switch>
      <Route exact path="/">
        <Header/>        
        <SearchSong/>
        <TopLyrics />
      </Route>
      <Route path="/viewLyrics/:id">
        <ViewLyrics />  
      </Route>  
    </Switch>
  </div>
  </Router>
  )
}

export default App;
