import React from 'react'
import {API_ROOT, createHeaders} from '../constants/index'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'
import Vinyl from '../images/vinyl.jpg'

class AddSong extends React.Component{

    //local state for component class
    state = {
        tracks: [],
        page: 0,
        totalTracks: 0,
        lastTrack: 0,
        url: "",
        errors: [],
        load: true
    }

    //handles submission of manual song addition
    handleSubmit = e => {
        e.preventDefault()
        const playlistId = this.props.match.params.id
        const {name, artist, album} = e.target
        const newSong = {name: name.value, artist: artist.value, album: album.value, playlist_id: playlistId}
        this.addSong(newSong)

    }

    //actually sends the new song request to the database
    //and handles errors
    addSong = body => {
        const reqObj = {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({song: body})
        }

        fetch(`${API_ROOT}/songs`, reqObj)
        .then(resp => resp.json())
        .then(song => {
            if (!song.errors) {
                alert('Song Successfully Added!')
            } else {
                this.setState({errors: song.errors})
            }
        })
    }
    //renders existing errors on the screen
    renderErrors = () => {
        return this.state.errors.map(error => {
            return <p className="error">{error}</p>
        })
    }

    //creates first searche conditions MusixMatch API based on either
    //track title, artist, or both
    handleSearch = e => {  
        e.preventDefault()
        const name = e.target.name.value.length > 0 ? `&q_track=${e.target.name.value}` : ''
        const artist = e.target.artist.value.length > 0 ? `&q_artist=${e.target.artist.value}` : ''
        const url = `${name}${artist}`
        this.executeSearch(url, 0, true)
        e.target.reset()
    }
     
    //executes search in the API
    executeSearch = (url, pagenum, first) => {
        const vinyl = document.querySelector('.spinner-img')
        vinyl.className = 'spinner-img'
        const back = pagenum === this.state.page - 2
        const page = pagenum += 1
        const api_url = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?format=json&callback=callback`
        const pages = `&page_size=30&page=${page}&apikey=${process.env.REACT_APP_API_KEY}`
        let lastTrack
        if (first === true) {
            lastTrack = 30
        } else if (back) {
            lastTrack = this.state.lastTrack - 30
        } else if (this.state.totalTracks > (this.state.lastTrack + 30)) {
            lastTrack = this.state.lastTrack + 30
        } 
        fetch(`${api_url}${url}${pages}`)
        .then(resp => resp.json())
        .then(data => {
            lastTrack = lastTrack > 0 ? lastTrack : data.message.header.available
            vinyl.className='spinner-img hidden'
            if (document.querySelector('.list-group-item')){
                document.querySelectorAll('.list-group-item').forEach(li => {
                    li.className="list-group-item"
                })
            }
        this.setState({totalTracks: data.message.header.available, tracks: data.message.body.track_list, url: url, lastTrack, page})
    })
        .catch(err => {
        console.error(err);
        })  
    }
    
    //creates info to send through addSong if selected
    //from what the list the API returns
    addFromList = (e, track) => {
        const playlistId = this.props.match.params.id
        const newSong = {name: track.track_name, artist: track.artist_name, album: track.album_name, playlist_id: playlistId}
        e.target.parentNode.className="list-group-item disabled"
        this.addSong(newSong)

    }

    //renders the list of tracks returned from API alphabetically by name
    renderTracks = () => {
        if (this.state.tracks.length > 0){
        const tracks = this.state.tracks.sort(function(a,b){
            if (a.track.track_name < b.track.track_name) {return -1}
            if (a.track.track_name > b.track.track_name) {return 1}
            return 0
        })
        return tracks.map(track => {
            return <li className="list-group-item">
                <Link key={track.track.track_id} 
                    onClick={e => this.addFromList(e, track.track)}>{track.track.track_name}, {track.track.artist_name}, {track.track.album_name}
                </Link></li>
        })}
    }

    //hides or shows manually entry form
    showForm = () => {
        let form = document.querySelector(`.manual`)
        let button = document.querySelector('.manual-btn')
        if (form.className === 'manual') {
            form.className = 'manual hidden'
            button.className = 'btn manual-btn'
        } else {
            form.className = 'manual'
            button.innerText = 'Hide Manual Entry'
        }
    }

    //renders the page
    render(){
        return(
            <>
            <Navbar props={this.props} />
            <div className="playlist-div new-form">
                <Link to={`/playlists/${this.props.match.params.id}`}><button className="btn">Return to Playlist</button></Link><br></br>
            <button className="btn manual-btn" onClick={this.showForm}>Add a Song Manually</button>
                <div className="manual hidden">
                    <h2>Add Song Manually</h2>
                    {this.renderErrors()}
                    <form onSubmit={this.handleSubmit}>
                        <input className="form-control" name="name" placeholder="Song Title"/>
                        <input className="form-control" name="artist" placeholder="Artist"/>
                        <input className="form-control" name="album" placeholder="Album"/>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <h2>Search for Song/Artist</h2>
                {this.renderErrors()}
                <form onSubmit={this.handleSearch}>
                    <input className="form-control" name="name" placeholder="Song Title"/>
                    <input className="form-control" name="artist" placeholder="Artist"/>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <ul className="list-group">
                <img src={Vinyl} className="spinner-img hidden"/>
                {this.renderTracks()}
                {this.state.page > 1 ? 
                <Link className='more-results' onClick={() => this.executeSearch(this.state.url, this.state.page - 2, false)}>See Last</Link>
                :
                null}
                {this.state.lastTrack < this.state.totalTracks ? 
                <Link className='more-results' onClick={() => this.executeSearch(this.state.url, this.state.page, false)}>See More Results</Link>
                : 
                null}
            </ul>
            </div>
            </>
        )
    }
}

export default AddSong