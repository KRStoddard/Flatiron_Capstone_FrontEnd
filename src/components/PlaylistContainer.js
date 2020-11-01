import React from 'react'
import {API_ROOT, createHeaders} from '../constants/index'
import Navbar from './Navbar'
import Playlist from './Playlist'


class PlaylistContainer extends React.Component{

    state = {
        playlists: [],
        bandId: ""
    }

    noPlaylists = () => {
        return(
        <h2>You have no playlists. Please make one!</h2>
        )
    }

    renderPlaylists = () => {
        return this.state.playlists.map(playlist => {
            return <Playlist key={playlist.id} playlist={playlist} />
        })
    }

    componentDidMount(){

        const reqObj = {
            method: 'GET',
            headers: createHeaders()
        }

        console.log(reqObj)
        fetch(`${API_ROOT}/playlists`, reqObj)
        .then(resp => resp.json())
        .then(data => { console.log(data)
            if (data.message) {
                this.props.history.push('/login')
            }
            else {
                const playlists = data.playlists.filter(playlist => playlist.band_id === data.band.id)
                this.setState({playlists})
            }
        })
    }

    render(){
        return(
            <div className="playlist-cont">
            <Navbar props={this.props} />
            <div className="playlist-div">
            <h2>Your Playlists</h2>
            <ul className="list-group">
            {this.state.playlists.length > 0 ?
            this.renderPlaylists()
            :
            this.noPlaylists()}
            </ul>
            </div>
            </div>
        )
    }
}

export default PlaylistContainer