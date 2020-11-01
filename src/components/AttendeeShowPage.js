import React from 'react'
import {GET_REQUEST, API_ROOT, createHeaders} from '../constants/index'
import {ActionCableConsumer} from '@thrash-industries/react-actioncable-provider'

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
           <li className="list-group-item action-item">{`${add.song.name}, ${add.song.artist}, ${add.song.album}, ${add.song.release_year}`}<br></br><br></br>
           <a onClick={() => this.requestSong(add.song.id)}>Request Song</a>
           </li>
           </div>
           )})
    }

    handlePlayed = response => {
        console.log('hit')
        const {playlist_addition} = response
        const newAdds = []
        console.log('hit')
        this.state.additions.forEach(add => {
            if (add.id === playlist_addition.id) {
                add.played = true 
                newAdds.push(add)
            } else {
                newAdds.push(add)
            }
        })
        this.setState({additions: newAdds})
    }

    componentDidMount(){

        fetch(`${API_ROOT}/shows/${this.props.match.params.id}`, GET_REQUEST())
        .then(resp => resp.json())
        .then(show => this.setState({playlist: show.playlist, additions: show.playlist_additions, price: show.price_per_request}))
    }

    render(){
        return(
            <div className="playlist-div">
            <h1>Available Songs</h1>
            <h3>Cost per Request: ${this.state.price}</h3>
            <ul className="list-group">
            <ActionCableConsumer 
                channel={{channel: 'PlaylistAdditionsChannel'}}
                onReceived={this.handlePlayed}
            />
            {this.renderSongs()}
            </ul>
            </div>


        )
    }
}

export default AttendeeShowPage