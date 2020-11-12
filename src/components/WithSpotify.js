import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'
import {API_ROOT, createHeaders} from '../constants/index'
import Vinyl from '../images/vinyl.jpg'

class WithSpotify extends React.Component {

    state = {
        playlists: [],
        errors: [],
        tracks: [],
        id: ""
    }

    setAuthHeader = () => {
        const params = JSON.parse(localStorage.getItem('params'))
        if(params) {
            return {Authorization: `Bearer ${params.access_token}`}
        } else {
            this.history.push(`/NewPlaylist`)
        }
        
    }

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

      importPlaylist = (e, id) => {
          const reqObj = {method: 'GET', headers: this.setAuthHeader()}
          fetch(`${e.target.id}/tracks`, reqObj)
          .then(resp => resp.json())
          .then(tracks => {
            this.importTracks(tracks.items, id)
        })
      }

      importTracks = (tracks, id) => {
          const theseTracks = []
          tracks.forEach(track => {
            const newSong = {id: track.track.id, name: track.track.name, artist: track.track.album.name, album: track.track.artists[0].name, playlist_id: id}
            theseTracks.push(newSong)
          })
          this.setState({tracks: theseTracks, id: id})
      }

      renderVinyl = () => {
          return <img src={Vinyl} className="spinner-img" />
      }

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

    componentDidUpdate(){
        this.executeAddTrack()
    }

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

    renderPlaylists = () => {
        if (this.state.playlists.items) {
        return this.state.playlists.items.map(playlist => {
            return <li onClick={this.createPlaylist} className="list-group-item spotify" id={playlist.href}>{playlist.description}</li>
        })
        }
    }

         
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