import React from 'react'
import {API_ROOT, createHeaders, GET_REQUEST} from '../constants/index'
import Navbar from './Navbar'
import Playlist from './Playlist'


class PlaylistContainer extends React.Component{

    //state for component class
    state = {
        playlists: [],
        bandId: ""
    }

    //render option if no playlists currently exist
    noPlaylists = () => {
        return(
        <h2>You have no playlists. Please make one!</h2>
        )
    }

    //renders list of band's playlists if they exist
    renderPlaylists = () => {
        return this.state.playlists.map(playlist => {
            return <Playlist key={playlist.id} playlist={playlist} />
        })
    }

    //immediately fetches list of of playlists
    //if not logged in will push user to login
    componentDidMount(){

        fetch(`${API_ROOT}/playlists`, GET_REQUEST())
        .then(resp => resp.json())
        .then(data => {
            if (data.message) {
                this.props.history.push('/login')
            }
            else {
                const playlists = data.playlists.filter(playlist => playlist.band_id === data.band.id)
                this.setState({playlists})
            }
        })
    }

    //renders page
    render(){
        return(
            <>
            <Navbar props={this.props} />
            <div className="playlist-cont">
            
            <div className="playlist-div">
            <h2>Your Playlists</h2>
            <button className="btn" onClick={() => {this.props.history.push(`/NewPlaylist`)}}>Create a New Playlist</button>
            <ul className="list-group">
            {this.state.playlists.length > 0 ?
            this.renderPlaylists()
            :
            this.noPlaylists()}
            </ul>
            </div>
            </div>
            </>
        )
    }
}

export default PlaylistContainer