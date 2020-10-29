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
           <p>{`${addition.song.name}, ${addition.song.artist}, ${addition.song.album}, ${addition.song.release_year}`}</p>
           <button onClick={() => this.removeSong(addition.song.id)}>Remove Song</button>
           </div>
           )})
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
            <div className="show-playlist">
            <Navbar props={this.props}/>
            <h1>{this.state.playlist.name}</h1>
            <Link to={`/playlists/${this.state.playlist.id}/AddSong`}>Add Song</Link>
            {this.state.playlist.playlist_additions ?
            this.renderSongs()
        : null}
            </div>
        )
    }
}

export default ShowPlaylist