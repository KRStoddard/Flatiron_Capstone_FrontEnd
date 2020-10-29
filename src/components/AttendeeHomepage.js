import React from 'react'
import {API_ROOT, GET_REQUEST} from '../constants/index'

class AttendeeHomepage extends React.Component{

    state = {
        shows: []
    }

    componentDidMount(){
        fetch(`${API_ROOT}/shows`, GET_REQUEST())
        .then(resp => resp.json())
        .then(shows => this.setState({shows}))
    }

    renderShows = () => {
        return this.state.shows.map(show => {
            return <p>{show.band.name} playing at {show.venue_name} on {show.date}</p>
        })
    }

    render(){

        return(
            <div>
                <h1>Find A Show!</h1>
                {this.renderShows()}
            </div>
        )
    }
}

export default AttendeeHomepage