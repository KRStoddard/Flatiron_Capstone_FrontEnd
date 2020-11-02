import React from 'react'
import {API_ROOT, createHeaders} from '../constants/index'

class NewPlaylist extends React.Component{

    handleSubmit = e => {
        e.preventDefault()
        const newList = {name: e.target.name.value}
        const reqObj = {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({newList})
        }

        fetch(`${API_ROOT}/playlists`, reqObj)
        .then(resp => resp.json())
        .then(playlist => this.props.history.push(`/playlists/${playlist.id}`))
    }

    render(){
        return(
            <div className="playlist-div new-form">
                <h2>Create Playlist</h2>
            <form onSubmit={this.handleSubmit}>
                <input className="form-control" name="name" placeholder="Playlist Name" />
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            </div>
        )
    }
}

export default NewPlaylist