import React from 'react'
import {GET_REQUEST, API_ROOT, createHeaders} from '../constants/index'
import Navbar from './Navbar'

class NewShow extends React.Component{

    state = {
        playlists:["You have No Playlists"],
        playlist_id: ""
    }

    renderPlaylists = () => {
        return this.state.playlists.map(playlist => {
            return <option id={playlist.id}>{playlist.name}</option>
        })
    }

    componentDidMount(){

        fetch(`${API_ROOT}/playlists`, GET_REQUEST())
        .then(resp => resp.json())
        .then(data => {
            if (data.message) {
                this.props.history.push('/login')
            }
            else {
                const playlists = data.playlists.filter(playlist => playlist.band_id === data.band.id)
                this.setState({playlists})
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const {venue, price} = e.target
        const newShow = {venue_name: venue.value, playlist_id: this.state.playlist_id, price_per_request: price.value}
        const reqObj = {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({show: newShow})
        }

        fetch(`${API_ROOT}/shows`, reqObj)
        .then(resp => resp.json())
        .then(show => this.props.history.push(`/bandshowpage/${show.id}`))
    }

    handleChange = e => {
        this.setState({playlist_id: e.target.options[e.target.selectedIndex].id})
    }
    

    render(){
        return(
            <div>
                <Navbar props={this.props} />
                <h2>Start a New Show!</h2>
            <form onSubmit={this.handleSubmit}>
                <input className="form-control" name="venue" placeholder="Venue Name"/>
                <select onChange={this.handleChange} name="playlist" class="form-control" id="exampleFormControlSelect1">
                    <option selected disabled value="">Choose...</option>
                    {this.renderPlaylists()}
                </select>
                <div className="input-group mb-2 mr-sm-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">$</div>
                    </div>
                    <input name="price" type="number" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Price per Request"/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            </div>
        )
    }
}

export default NewShow