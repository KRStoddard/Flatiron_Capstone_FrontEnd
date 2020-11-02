import React from 'react'
import {API_ROOT, GET_REQUEST} from '../constants/index'
import {Link} from 'react-router-dom'

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
            return <li className="list-group-item"><Link key={show.id} to={`/attendee/show/${show.id}`}>{show.band.name} playing at {show.venue_name} on {show.date}</Link></li>
        })
    }

    render(){

        return(
            <div>
                <div className="playlist-div">
                <h1>Find A Show!</h1>
                {this.state.shows.length > 0 ?
                    <ul className="list-group">
                    {this.renderShows()}
                    </ul>
                :
                    <div>
                    <h2>Sorry, There Are No Shows Using Jukebox Live at This Time</h2>
                    <button className="btn" onClick={() => this.props.history.push('/')}>Go Back</button>
                    </div>
                }   
                
                </div>
            </div>
        )
    }
}

export default AttendeeHomepage