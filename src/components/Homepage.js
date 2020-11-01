import React from 'react'
import {Link} from 'react-router-dom'

const Homepage = () => {
    return(
        <div className="container text-center new-form">
                <h1>JUKEBOX LIVE</h1>
                <h2>Are You A...</h2>
                <Link className="home-link" id="bandlink" to="/login">Band</Link>
                <Link className="home-link" id="attlink" to="/attendeepage">Show Attendee</Link>
        </div>
    )
}
export default Homepage