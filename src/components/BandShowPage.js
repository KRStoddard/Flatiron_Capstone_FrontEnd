import React from 'react'
import {API_ROOT, createHeaders, GET_REQUEST} from '../constants/index'
import Navbar from './Navbar'
import {ActionCableConsumer} from '@thrash-industries/react-actioncable-provider'
import {Link} from 'react-router-dom'

class BandShowPage extends React.Component{

    
    state = {
        playlist: {},
        additions: [],
        requests: [],
        closed: false,
        id: ""
    }

    removeSong = songId => {
        const newAddition = {song_id: songId, playlist_id: this.state.playlist.id}
        const reqObj = {
            method: 'PATCH',
            headers: createHeaders(),
            body: JSON.stringify(newAddition)
        }
        fetch(`${API_ROOT}/playlist_additions/${songId}`, reqObj)

        const requests = this.state.requests.filter(req => req.song.id !== songId)
        const additions = this.state.additions.filter(add => add.song.id !== songId)

        this.setState({requests, additions})
    }

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
            // <div className="listsongs">
           <li className="list-group-item">{`${add.song.name}, ${add.song.artist}, ${add.song.album}, ${add.song.release_year}`}<br></br><br></br>
           <Link onClick={() => this.removeSong(add.song.id)}>Mark as Played</Link>
        </li>
        //    </div>
           )})
        }
    }

    renderRequests = () => {
         return this.state.requests.map(request => {
            return <div className="listsongs">
              <li className="list-group-item">{request.song.name}, {request.song.artist}<br></br><br></br>
              <Link onClick={() => this.removeSong(request.song.id)}>Mark as Played</Link>
              </li>
             </div>
         })
    }

    renderButton = () => {
        if (this.state.closed !== true) {
            return <button className="btn" onClick={this.endReq}>End Requests</button>
        } else {
            return <button className="btn" onClick={this.endShow}>End Show</button>
        }
    }

    endShow = () => {

        const id = this.props.match.params.id

        const reqObj = {
            method: 'DELETE',
            headers: createHeaders(),
            body: JSON.stringify({id})
        }
        fetch(`${API_ROOT}/shows/${id}`, reqObj)
        this.props.history.push(`/bandpage/${id}`)
    }

    handleRequests = response => {
        const {request} = response
        const show = parseInt(request.show_id, 10)
        const thisShow = parseInt(this.props.match.params.id, 10)
        if (show === thisShow) {
            const num = parseInt((this.state.requests.filter(req => req.song.id === request.song.id).length), 10)
            if (num === 0) {
                this.setState({requests: [...this.state.requests, request]})
            }
        }
        
    }

    //  array_move = (arr, old_index, new_index) => {
    //     if (new_index >= arr.length) {
    //         var k = new_index - arr.length + 1
    //         while (k--) {
    //             arr.push(undefined)
    //         }
    //     }
    //     arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
    //     return arr
    // }

    componentDidMount(){


        fetch(`${API_ROOT}/shows/${this.props.match.params.id}`, GET_REQUEST())
        .then(resp => resp.json())
        .then(show => this.setState({playlist: show.playlist, additions: show.playlist_additions, requests: show.requests, closed: show.complete}))

        fetch(`${API_ROOT}/auto_login`, GET_REQUEST())
        .then(resp => resp.json())
        .then(band => this.setState({id: band.id}))
    }

    endReq = () => {
        const reqObj = {
            method: 'PATCH',
            headers: createHeaders(),
            body: JSON.stringify({show_id: this.props.match.params.id})
        }
        fetch(`${API_ROOT}/shows/${this.props.match.params.id}`, reqObj)
        this.setState({closed: true})
    }

    render(){
        return(
            <>
                <Navbar props={this.props}/>
                <div className="show-playlist">
                <div className="band-reqs">
                    <h2>Requests</h2>
                    {this.renderButton()}
                    <ul className="list-group">
                    {this.renderRequests()}
                    </ul>
                    <ActionCableConsumer 
                        channel={{channel: 'RequestsChannel'}}
                        onReceived={this.handleRequests}
                    />
                </div>
                <div className="band-list">
                    <h2>Playlist</h2>
                    <h3>{this.state.playlist.name}</h3>
                    <ul className="list-group">
                        {this.renderSongs()}
                        </ul>
                </div>
                
            </div>
            </>
        )
    }
}

export default BandShowPage