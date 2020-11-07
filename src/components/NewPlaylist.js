import React from 'react'
import {API_ROOT, createHeaders} from '../constants/index'

class NewPlaylist extends React.Component{

    state = {
        errors: []
    }

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

    renderErrors = () => {
        return this.state.errors.map(error => {
            return <p className="error">{error}</p>
        })
    }

    render(){
        return(
            <div className="playlist-div new-form">
                <h2>Create Playlist</h2>
                {this.renderErrors()}
            <form onSubmit={this.handleSubmit}>
                <input className="form-control" name="name" placeholder="Playlist Name" />
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            </div>
        )
    }
}

export default NewPlaylist