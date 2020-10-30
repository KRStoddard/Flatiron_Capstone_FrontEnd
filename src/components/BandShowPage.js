import React from 'react'
import {API_ROOT, createHeaders, GET_REQUEST} from '../constants/index'
import Navbar from './Navbar'

class BandShowPage extends React.Component{

    
    state = {
        playlist: {},
        additions: [],
        requests: []
    }

    removeSong = songId => {
        const newAddition = {song_id: songId, playlist_id: this.state.playlist.id}
        const reqObj = {
            method: 'PATCH',
            headers: createHeaders(),
            body: JSON.stringify(newAddition)
        }
        fetch(`${API_ROOT}/playlist_additions/${songId}`, reqObj)
        .then(resp => resp.json())
        .then(addition => {
            console.log(addition)
        })
    }

    renderSongs = () => {
        const adds = this.state.additions.filter(add => add.played !== true)
        return adds.map(add => 
        {return (
            <div>
           <p>{`${add.song.name}, ${add.song.artist}, ${add.song.album}, ${add.song.release_year}`}</p>
           <button onClick={() => this.removeSong(add.song.id)}>Mark as Played</button>
           </div>
           )})
    }

    renderRequests = () => {
        return this.state.requests.map(request => {
            return <p>{request.song.name}, {request.song.artist}</p>
        })
    }

    componentDidMount(){


        fetch(`${API_ROOT}/shows/${this.props.match.params.id}`, GET_REQUEST())
        .then(resp => resp.json())
        .then(show => this.setState({playlist: show.playlist, additions: show.playlist_additions, requests: show.requests}))
    }

    // endShow = () => {
    //     const reqObj = {
    //         method: 'PATCH',
    //         headers: createHeaders(),
    //         body: JSON.stringify({show_id: this.props.match.params.id})
    //     }
    //     fetch(`${API_ROOT}/shows/${this.props.match.params.id}`, reqObj)
    //     .then(resp => resp.json())
    //     .then(show => console.log(show))
    // }

    render(){
        return(
            <div className="show-playlist">
                <Navbar props={this.props}/>
                <div>
                    <h1>Requests</h1>
                    {this.renderRequests()}
                </div>
                <div>
                    <h1>Playlist</h1>
                    <h2>{this.state.playlist.name}</h2>
                        {this.renderSongs()}
                </div>
                <button onClick={this.endShow}>End Requests</button>
            </div>
        )
    }
}

export default BandShowPage