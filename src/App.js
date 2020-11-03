import './App.css';
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import NewAccount from './components/NewAccount'
import BandPage from './components/BandPage'
import NewShow from './components/NewShow'
import PlaylistContainer from './components/PlaylistContainer'
import ShowPlaylist from './components/ShowPlaylist'
import AddSong from './components/AddSong'
import BandShowPage from './components/BandShowPage'
import Homepage from './components/Homepage'
import AttendeeHomepage from './components/AttendeeHomepage'
import AttendeeShowPage from './components/AttendeeShowPage'
import NewPlaylist from './components/NewPlaylist'
import RequestSong from './components/RequestSong'

function App() {
  return (
      <Switch>
        <Route path='/NewAccount' component={NewAccount} />
        <Route path='/bandpage/:id' component={BandPage} />
        <Route path='/bandshowpage/:id' component={BandShowPage} />
        <Route path='/NewShow' component={NewShow} />
        <Route path='/NewPlaylist' component={NewPlaylist} />
        <Route path='/playlists/:id/AddSong' component={AddSong} />
        <Route path='/playlists/:id' component={ShowPlaylist} />
        <Route exact path='/playlists' component={PlaylistContainer} />
        <Route path='/attendee/show/:id' component={AttendeeShowPage} />
        <Route path='/attendeepage' component={AttendeeHomepage} />
        <Route path='/requestsong/:id' component={RequestSong} />
        <Route path='/login' component={Login}/>
        <Route path='/' component={Homepage} />
      </Switch>
  );
}

export default App;
