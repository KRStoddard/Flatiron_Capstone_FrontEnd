import './App.css';
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import NewAccount from './components/NewAccount'
import BandPage from './components/BandPage'
import NewShow from './components/NewShow'
import PlaylistContainer from './components/PlaylistContainer'

function App() {
  return (
      <Switch>
        <Route path='/NewAccount' component={NewAccount} />
        <Route path='/bandpage/:id' component={BandPage} />
        <Route path='/NewShow' component={NewShow} />
        <Route path='/playlists' component={PlaylistContainer} />
        <Route path='/' component={Login}/>
      </Switch>
  );
}

export default App;
