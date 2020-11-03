import React from 'react'
import {GET_REQUEST, API_ROOT, createHeaders} from '../constants/index'
import {ActionCableConsumer} from '@thrash-industries/react-actioncable-provider'
import {Link} from 'react-router-dom'

class AttendeeShowPage extends React.Component{

    state = {
        playlist: {},
        additions: [],
        price: "",
        closed: false
    }

    // requestSong = songId => {
    //     const newReq = {song_id: songId, playlist_id: this.state.playlist.id, show_id: this.props.match.params.id}
    //     console.log(newReq)
    //     this.props.history.push({
    //         pathname: '/requestsong',
    //         state: newReq
    //       })
    //     const reqObj = {
    //         method: 'POST',
    //         headers: createHeaders(),
    //         body: JSON.stringify({request: newReq})
    //     }
    //     fetch(`${API_ROOT}/requests`, reqObj)
    //     .then(resp => resp.json())
    //     .then(request => console.log(request))
    // }

    renderSongs = () => {
        const adds = this.state.additions.filter(add => add.played !== true)
        return adds.map(add => 
        {return (
            <div>
           <li className="list-group-item action-item">{`${add.song.name}, ${add.song.artist}, ${add.song.album}, ${add.song.release_year}`}<br></br><br></br>
           {/* <Link onClick={() => this.requestSong(add.song.id)}>Request Song</Link> */}
           <Link to={`/requestsong/${this.props.match.params.id}&${add.song.id}`}>Request Song</Link>
           </li>
           </div>
           )})
    }

    handlePlayed = response => {
        const {playlist_addition} = response
        const newAdds = []
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

    endShow = () => {
        console.log('hit')
        this.setState({closed: true})
    }



    componentDidMount(){

        fetch(`${API_ROOT}/shows/${this.props.match.params.id}`, GET_REQUEST())
        .then(resp => resp.json())
        .then(show => this.setState({playlist: show.playlist, additions: show.playlist_additions, price: show.price_per_request, closed: show.complete}))
    }

    render(){
        return(
            <div className="playlist-div">
            <h1>Available Songs</h1>
            <h3>Cost per Request: ${this.state.price}</h3>
            <ul className="list-group">
            <ActionCableConsumer 
                channel={{channel: 'ShowsChannel'}}
                onReceived={this.endShow}
            />
            <ActionCableConsumer 
                    channel={{channel: 'PlaylistAdditionsChannel'}}
                    onReceived={this.handlePlayed}
                />
            {this.state.closed === true ? 
            <div>
                <h2>Requests for this show have ended. Thank you for attending!</h2>
                <button className="btn" onClick={() => this.props.history.push('/')}>Find Another Show</button>
            </div>
            :
                [...this.renderSongs()]
            }
            </ul>
            </div>


        )
    }
}

export default AttendeeShowPage