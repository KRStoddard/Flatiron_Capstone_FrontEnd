import React from 'react'
import {GET_REQUEST, API_ROOT, createHeaders} from '../constants/index'

class AttendeeShowPage extends React.Component{

    state = {
        playlist: {},
        additions: [],
        price: ""
    }

    requestSong = songId => {
        const newReq = {song_id: songId, playlist_id: this.state.playlist.id, show_id: this.props.match.params.id}
        const reqObj = {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({request: newReq})
        }
        fetch(`${API_ROOT}/requests`, reqObj)
        // .then(resp => resp.json())
        // .then(request => console.log(request))
    }

    renderSongs = () => {
        const adds = this.state.additions.filter(add => add.played !== true)
        return adds.map(add => 
        {return (
            <div>
           <p>{`${add.song.name}, ${add.song.artist}, ${add.song.album}, ${add.song.release_year}`}</p>
           <button onClick={() => this.requestSong(add.song.id)}>Request Song</button>
           </div>
           )})
    }

    componentDidMount(){

        fetch(`${API_ROOT}/shows/${this.props.match.params.id}`, GET_REQUEST())
        .then(resp => resp.json())
        .then(show => this.setState({playlist: show.playlist, additions: show.playlist_additions, price: show.price_per_request}))
    }

    render(){
        return(
            <div>
            <h1>Available Songs</h1>
            <h3>Cost per Request: ${this.state.price}</h3>
            {this.renderSongs()}
            </div>


        )
    }
}

export default AttendeeShowPage