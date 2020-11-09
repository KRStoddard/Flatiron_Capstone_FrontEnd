import React from 'react'
import {GET_REQUEST, API_ROOT} from '../constants/index'
import {ActionCableConsumer} from '@thrash-industries/react-actioncable-provider'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'

class AttendeeShowPage extends React.Component{

    //state for componenet class
    state = {
        playlist: {},
        additions: [],
        price: "",
        closed: false
    }

    //renders songs available for request sorted by artist
    renderSongs = () => {
        let adds = this.state.additions.filter(add => add.played !== true)
        if (adds.length > 0){
            adds = adds.sort(function(a,b){
                if (a.song.artist < b.song.artist) {return -1}
                if (a.song.artist > b.song.artist) {return 1}
                return 0
            })
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
    }

    //handles response from Actioncable Websocket
    //ensures that attendees cannot request songs that
    //have already been played
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

    //changes the status of all requests for the show to closed
    //ensures band can limit requests based on play time available
    endShow = () => {
        this.setState({closed: true})
    }

    //immediately fetches information about the show they are viewing
    componentDidMount(){
        fetch(`${API_ROOT}/shows/${this.props.match.params.id}`, GET_REQUEST())
        .then(resp => resp.json())
        .then(show => this.setState({playlist: show.playlist, additions: show.playlist_additions, price: show.price_per_request, closed: show.complete}))
    }

    //renders the page
    render(){
        return(
            <>
                <Navbar props={this.props}/>
                <div className="playlist-div">
                    <h1>Available Songs</h1>
                    <h3>Cost per Request: ${this.state.price}</h3>
                    <ul className="list-group">
                        <ActionCableConsumer 
                            channel={{channel: 'ShowsChannel'}}
                            onReceived={this.endShow}
                        />
                        <ActionCableConsumer 
                                channel={{channel: 'PlaylistAdditionsChannel', show: this.props.match.params.id}}
                                onReceived={this.handlePlayed}
                            />
                        {this.state.closed === true ? 
                        <div>
                            <h2>Requests for this show have ended. Thank you for attending!</h2>
                            <button className="btn" onClick={() => this.props.history.push('/')}>Find Another Show</button>
                        </div>
                        :
                            this.renderSongs()
                        }
                    </ul>
                </div>
            </>


        )
    }
}

export default AttendeeShowPage