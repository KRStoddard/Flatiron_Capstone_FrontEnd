import React from 'react'
import {API_ROOT, HEADERS} from '../constants/index'
import Navbar from './Navbar'


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
        return this.state.playlists.map(playlist => <p>{playlist.name}</p>)
    }

    componentDidMount(){

        const reqObj = {
            method: 'GET',
            headers: HEADERS
        }

        fetch(`${API_ROOT}/playlists`, reqObj)
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

    render(){
        return(
            <div className="playlist-cont">
            <Navbar/>
            {this.state.playlists.length > 0 ?
            this.renderPlaylists()
            :
            this.noPlaylists()}
            </div>
        )
    }
}

export default PlaylistContainer