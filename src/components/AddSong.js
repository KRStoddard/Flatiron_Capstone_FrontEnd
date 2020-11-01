import React from 'react'
import {API_ROOT, createHeaders} from '../constants/index'

class AddSong extends React.Component{

    handleSubmit = e => {
        e.preventDefault()
        const playlistId = this.props.match.params.id
        const {name, artist, album, year} = e.target
        const newAlbum = {name: name.value, artist: artist.value, album: album.value, release_year: year.value, playlist_id: playlistId}
        const reqObj = {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({song: newAlbum})
        }

        fetch(`${API_ROOT}/songs`, reqObj)
        .then(resp => resp.json())
        .then(() => this.props.history.push(`/playlists/${playlistId}`))
    }

    render(){
        return(
            <div className="playlist-div new-form">
                <h2>Add Song</h2>
            <form onSubmit={this.handleSubmit}>
                <input className="form-control" name="name" placeholder="Song Title"/>
                <input className="form-control" name="album" placeholder="Album"/>
                <input className="form-control" name="artist" placeholder="Artist"/>
                <input className="form-control" name="year" placeholder="Release Year"/>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            </div>
        )
    }
}

export default AddSong