import React from 'react'
import {API_ROOT, createHeaders} from '../constants/index'
import {Link} from 'react-router-dom'

class AddSong extends React.Component{

    state = {
        tracks: [],
        page: 1,
        totalTracks: "",
        lastTrack: 99
    }

    handleSubmit = e => {
        e.preventDefault()
        const playlistId = this.props.match.params.id
        const {name, artist, album, year} = e.target
        const newAlbum = {name: name.value, artist: artist.value, album: album.value, release_year: year.value, playlist_id: playlistId}
        this.addSong(newAlbum)
    }

    addSong = body => {
        const reqObj = {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({song: body})
        }

        fetch(`${API_ROOT}/songs`, reqObj)
        .then(resp => resp.json())
        .then(song => alert('Song Successfully Added!'))
    }

    handleSearch = e => {
        const api_url = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?format=json&callback=callback`
        const pages = `&page_size=99&page=1&apikey=c93501d1c75ee64c084b92edf050ae65`
        e.preventDefault()
        let name
        let artist
        let url
        if (e.target.name.value.length > 0) {
            name = `&q_track=${e.target.name.value}`
        }
        if (e.target.artist.value.length > 0) {
            artist = `&q_artist=${e.target.artist.value}`
        }

        if (name && artist) {
            url = `${name}${artist}`
        } else if (name && !artist) {
            url = `${name}`
        } else if (artist && !name) {
            url = `${artist}`
        }
        fetch(`${api_url}${url}${pages}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({totalTracks: data.message.header.available, tracks: data.message.body.track_list})
        })
        .catch(err => {
	        console.error(err);
            })  

            e.target.reset()
        }

        addFromList = (e, track) => {
            console.log(e.target.parentNode.className = 'list-group-item disabled')
            const playlistId = this.props.match.params.id
            const newSong = {name: track.track_name, artist: track.artist_name, album: track.album_name, playlist_id: playlistId}
            this.addSong(newSong)

        }

        renderTracks = () => {
            return this.state.tracks.map(track => {
                return <li className="list-group-item"><Link key={track.track.track_id} onClick={e => this.addFromList(e, track.track)}>{track.track.track_name}, {track.track.artist_name}, {track.track.album_name}</Link></li>
            })
        }


    render(){
        return(
            <div className="playlist-div new-form">
                <h2>Add Song Manually</h2>
            <form onSubmit={this.handleSubmit}>
                <input className="form-control" name="name" placeholder="Song Title"/>
                <input className="form-control" name="album" placeholder="Album"/>
                <input className="form-control" name="artist" placeholder="Artist"/>
                <input className="form-control" name="year" placeholder="Release Year"/>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
                <h2>Search for Song/Artist</h2>
                <form onSubmit={this.handleSearch}>
                    <input className="form-control" name="name" placeholder="Song Title"/>
                    <input className="form-control" name="artist" placeholder="Artist"/>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <ul className="list-group">
                {this.renderTracks()}
                {this.state.lastTrack < this.state.totalTracks ? 
                <Link>See More Results</Link>
                : 
                null}
            </ul>
            </div>
        )
    }
}

export default AddSong