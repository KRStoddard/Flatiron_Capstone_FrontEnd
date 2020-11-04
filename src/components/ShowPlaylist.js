import React from 'react'
import {API_ROOT, createHeaders} from '../constants/index'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'

class ShowPlaylist extends React.Component{

    state = {
        playlist: {}
    }

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
            console.log(addition)
            let playlist = {...this.state.playlist}
            playlist.playlist_additions = this.state.playlist.playlist_additions.filter(pAddition => pAddition.song_id !== addition.song_id)
            this.setState({playlist})
        })
    }

    renderSongs = () => {
        return this.state.playlist.playlist_additions.map(addition => 
        {return (
            <div>
           <li className="list-group-item">{`${addition.song.name}, ${addition.song.artist}, ${addition.song.album}, ${addition.song.release_year}`}<br></br><br></br>
           <Link onClick={() => this.removeSong(addition.song.id)}>Remove Song</Link>
           </li>
           
           </div>
           )})
    }

    handleToNewSong = () => {
        this.props.history.push(`/playlists/${this.state.playlist.id}/AddSong`)
    }

    deletePlaylist = () => {
        const reqObj = {
            method: 'DELETE',
            headers: createHeaders(),
            body: JSON.stringify({id: this.state.playlist.id})
        }
        fetch(`${API_ROOT}/playlists/${this.state.playlist.id}`, reqObj)
        .then(() => this.props.history.push(`/playlists`))
    }

    componentDidMount(){

        const reqObj = {
            method: 'GET',
            headers: createHeaders()
        }

        fetch(`${API_ROOT}/playlists/${this.props.match.params.id}`, reqObj)
        .then(resp => resp.json())
        .then(playlist => this.setState({playlist}))
    }

    render(){
        return(
            <div>
            <Navbar props={this.props}/>
            <div className="playlist-div">
            <h1>{this.state.playlist.name}</h1>
            <button onClick={this.handleToNewSong} className="btn spl">Add Song</button>
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