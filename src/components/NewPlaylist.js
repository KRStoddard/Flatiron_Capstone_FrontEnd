import React from 'react'
import {API_ROOT, createHeaders} from '../constants/index'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'

class NewPlaylist extends React.Component{

    //local state for component class
    state = {
        errors: []
    }

    //sends info for new playlist to backend
    //handles errors if validations aren't met
    handleSubmit = e => {
        e.preventDefault()
        const newList = {name: e.target.name.value}
        const reqObj = {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify(newList)
        }

        fetch(`${API_ROOT}/playlists`, reqObj)
        .then(resp => resp.json())
        .then(playlist => {
            if (!playlist.errors) {
            this.props.history.push(`/playlists/${playlist.id}`)
            } else {
                this.setState({errors: playlist.errors})
            }
        
        })
    }

    handleLogin = () => {
        window.location = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_KEY}&redirect_uri=http://localhost:3000/WithSpotify&response_type=token&show_dialog=true`
    }

    //renders errors to page
    renderErrors = () => {
        return this.state.errors.map(error => {
            return <p className="error">{error}</p>
        })
    }

    //renders page
    render(){
        return(
            <>
            <Navbar props={this.props} />
            <div className="playlist-div new-form">
                <h2>Create Playlist Manually</h2>
                {this.renderErrors()}
            <form onSubmit={this.handleSubmit}>
                <input className="form-control" name="name" placeholder="Playlist Name" />
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <p>Or</p>
            <h2>Import Playlist From Spotify</h2>
            <button className="btn" onClick={this.handleLogin}>Login With Spotify</button>
            </div>
            </>
        )
    }
}

export default NewPlaylist