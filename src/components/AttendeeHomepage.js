import React from 'react'
import {API_ROOT, GET_REQUEST} from '../constants/index'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'

class AttendeeHomepage extends React.Component{

    //state for component class
    state = {
        shows: [],
        search: ""
    }

    //immediately fetches list of all available shows
    componentDidMount(){
        fetch(`${API_ROOT}/shows`, GET_REQUEST())
        .then(resp => resp.json())
        .then(shows => this.setState({shows}))
    }

    //renders list of shows based on search
    //for either venue or band
    renderShows = () => {
        let shows = this.state.shows
            if (this.state.search.length > 0){
                let search = this.state.search.toLowerCase().split(' ')
                search.forEach(search => {
                    search = search.toLowerCase()
                    shows = shows.filter(show => show.band.name.split(' ').join('').toLowerCase().includes(search) || show.venue_name.split(' ').join('').toLowerCase().includes(search))
                })
            }
        return shows.map(show => {
            return <li className="list-group-item"><Link key={show.id} to={`/attendee/show/${show.id}`}>{show.band.name} playing at {show.venue_name} on {show.date}</Link></li>
        })
    }

    //renders the page
    render(){
        return(
            <div>
                <Navbar props={this.props} />
                <div className="playlist-div new-form">
                <h2>Find A Show!</h2>
                <form onSubmit={e => e.preventDefault()} className="searchform">
                    <input onChange={e => this.setState({search: e.target.value})} className="searchbar" type="text" name="search" placeholder="Search by Band or Venue"/>
                 </form>
                {this.state.shows.length > 0 ?
                    <ul className="list-group">
                    {this.renderShows()}
                    </ul>
                :
                <>
                    <h2>Sorry, There Are No Shows Using Jukebox Live at This Time</h2>
                    <button className="btn" onClick={() => this.props.history.push('/')}>Go Back</button>
                    </>
                }   
                
                </div>
            </div>
        )
    }
}

export default AttendeeHomepage