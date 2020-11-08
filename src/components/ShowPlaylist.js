import React from 'react'
import {API_ROOT, createHeaders, GET_REQUEST} from '../constants/index'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'

class ShowPlaylist extends React.Component{

    //state for component class
    state = {
        playlist: {}
    }

    //removes song from playlist
    removeSong = songId => {
        const newAddition = {song_id: songId, playlist_id: this.props.match.params.id}
        const reqObj = {
            method: 'DELETE',
            headers: createHeaders(),
            body: JSON.stringify(newAddition)
        }
        fetch(`${API_ROOT}/playlist_additions/${songId}`, reqObj)
        .then(resp => resp.json())
        .then(addition => {
            let playlist = {...this.state.playlist}
            playlist.playlist_additions = this.state.playlist.playlist_additions.filter(pAddition => pAddition.song_id !== addition.song_id)
            this.setState({playlist})
        })
    }

    //renders songs sorted by artist
    renderSongs = () => {
        if (this.state.playlist.playlist_additions.length > 0){
            const additions = this.state.playlist.playlist_additions.sort(function(a,b){
                if (a.song.artist < b.song.artist) {return -1}
                if (a.song.artist > b.song.artist) {return 1}
                return 0
            })
        return this.state.playlist.playlist_additions.map(addition => 
        {return (
            <div>
           <li className="list-group-item">{`${addition.song.name}, ${addition.song.artist}, ${addition.song.album}`}<br></br><br></br>
           <Link onClick={() => this.removeSong(addition.song.id)}>Remove Song</Link>
           </li>
           
           </div>
           )})
        }
    }

    //deletes playlist from database
    deletePlaylist = () => {
        const reqObj = {
            method: 'DELETE',
            headers: createHeaders(),
            body: JSON.stringify({id: this.state.playlist.id})
        }
        fetch(`${API_ROOT}/playlists/${this.state.playlist.id}`, reqObj)
        .then(() => this.props.history.push(`/playlists`))
    }

    //immediately fetches playlist info
    componentDidMount(){

        fetch(`${API_ROOT}/playlists/${this.props.match.params.id}`, GET_REQUEST())
        .then(resp => resp.json())
        .then(playlist => this.setState({playlist}))
    }

    //renders page
    render(){
        return(
            <div>
            <Navbar props={this.props}/>
            <div className="playlist-div">
            <h1>{this.state.playlist.name}</h1>
            <Link to={`/playlists/${this.state.playlist.id}/AddSong`}>
                <button className="btn spl">Add Song</button>
            </Link>
            <button onClick={this.deletePlaylist} className="btn spl">Delete Playlist</button>
            <ul className="list-group">
            {this.state.playlist.playlist_additions ?
            this.renderSongs()
        : null}
        </ul>
        </div>
            </div>
        )
    }
}

export default ShowPlaylist