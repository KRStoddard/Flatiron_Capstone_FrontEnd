import React from 'react'
import {API_ROOT} from '../constants/index'

class PlaylistContainer extends React.Component{

    state = {
        playlists: []
    }

    noPlaylists = () => {
        return(
        <h2>You have no playlists. Please make one!</h2>
        )
    }

    renderPlaylists = () => {
        return this.state.playlists.map(playlist => <p>{playlist.name}</p>)
    }

    componentDidMount(){
        fetch(`${API_ROOT}/playlists`)
        .then(resp => resp.json())
        .then(playlists => {
            playlists = playlists.filter(playlist => playlist.band_id === this.props.match.params.id)
            console.log(playlists)
        })
    }

    render(){
        return(
            <div>
            {this.state.playlists.length > 0 ?
            this.renderPlaylists()
            :
            this.noPlaylists()}
            </div>
        )
    }
}

export default PlaylistContainer