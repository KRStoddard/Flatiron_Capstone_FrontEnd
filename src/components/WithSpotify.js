import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'
import {API_ROOT, createHeaders} from '../constants/index'

class WithSpotify extends React.Component {

    //component class state
    state = {
        playlists: [],
        errors: [],
        tracks: [],
        id: ""
    }

    //sets auth token header
    setAuthHeader = () => {
        const params = JSON.parse(localStorage.getItem('params'))
        if(params) {
            return {Authorization: `Bearer ${params.access_token}`}
        } else {
            this.history.push(`/NewPlaylist`)
        }
        
    }

//sets token and token type
    getParamValues = (url) => {
        return url
            .slice(1)
            .split('&')
            .reduce((prev, curr) => {
            const [title, value] = curr.split('=')
            prev[title] = value
            return prev
            }, {})
    }

    //creates a new playlist when one is selected
    createPlaylist = e => {
    const newList = {name: e.target.innerText}
    const reqObj = {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify(newList)
    }

    fetch(`${API_ROOT}/playlists`, reqObj)
    .then(resp => resp.json())
    .then(playlist => {
        if (!playlist.errors) {
            this.importPlaylist(e, playlist.id)
        } else {
            this.setState({errors: playlist.errors})
        }
    })
    }

    //gets the tracks from selected playlist
    importPlaylist = (e, id) => {
        const reqObj = {method: 'GET', headers: this.setAuthHeader()}
        fetch(`${e.target.id}/tracks`, reqObj)
        .then(resp => resp.json())
        .then(tracks => {
        this.importTracks(tracks.items, id)
    })
    }

    //sets track info to the state
    importTracks = (tracks, id) => {
        const theseTracks = []
        tracks.forEach(track => {
        const newSong = {id: track.track.id, name: track.track.name, artist: track.track.album.name, album: track.track.artists[0].name, playlist_id: id}
        theseTracks.push(newSong)
        })
        this.setState({tracks: theseTracks, id: id})
    }

    //gets user's playlists from spotify on load
   componentDidMount(){
        const {history, location} = this.props
        const access_token = this.getParamValues(location.hash)
        const expiryTime = new Date().getTime() + access_token.expires_in * 1000
        if (!access_token) {
            history.push(`/NewPlaylist`)
        } else {
            localStorage.setItem('params', JSON.stringify(access_token))
            localStorage.setItem('expiry_time', expiryTime)
        }
        const reqObj = {method: 'GET', headers: this.setAuthHeader()}
        fetch(`https://api.spotify.com/v1/me/playlists`, reqObj)
        .then(resp => resp.json())
        .then(playlists => this.setState({playlists}))
    }

    //executes executeAddTrack when componenet updates
    componentDidUpdate(){
        this.executeAddTrack()
    }

    //adds each playlist track to the database
    executeAddTrack = () => {
        if (this.state.tracks.length > 0) {
            this.state.tracks.forEach(track => {
                const {id, name, artist, album, playlist_id} = track
                const newSong = {name, artist, album, playlist_id}
                const reqObj = {
                    method: 'POST',
                    headers: createHeaders(),
                    body: JSON.stringify({song: newSong})
                }
                fetch(`${API_ROOT}/songs`, reqObj)
            })
            this.props.history.push(`/playlists/${this.state.id}`)
        }
    }

    //renders user's playlists
    renderPlaylists = () => {
        if (this.state.playlists.items) {
        return this.state.playlists.items.map(playlist => {
            return <li onClick={this.createPlaylist} className="list-group-item spotify" id={playlist.href}>{playlist.description}</li>
        })
        }
    }

    //renders page 
    render(){
        return(
            <>
            <Navbar props={this.props} />
            <div className="playlist-div">
                <h2>Select a Playlist to Import</h2>
                <ul classname="list-group">
                    {this.renderPlaylists()}
                </ul>
            </div>
            </>
        )
    }
}

export default WithSpotify