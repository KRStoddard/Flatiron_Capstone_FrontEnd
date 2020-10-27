import './App.css';
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import NewAccount from './components/NewAccount'
import BandPage from './components/BandPage'
import VenuePage from './components/VenuePage'
import NewShow from './components/NewShow'
import PlaylistContainer from './components/PlaylistContainer'

function App() {
  return (
      <Switch>
        <Route path='/NewAccount' component={NewAccount} />
        <Route path='/bandpage/:id' component={BandPage} />
        <Route path='/venuepage/:id' component={VenuePage} />
        <Route path='/NewShow' component={NewShow} />
        <Route path='/playlists' component={PlaylistContainer} />
        <Route path='/' component={Login}/>
      </Switch>
  );
}

export default App;
