import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'

//renders homepage
const Homepage = () => {
    return(
        <>
        <Navbar />
        <div className="text-center new-form">
                <h1>JUKEBOX LIVE</h1>
                <h3>Are You A...</h3>
                <Link className="home-link" id="bandlink" to="/login">Performer</Link>
                <Link className="home-link" id="attlink" to="/attendeepage">Attendee</Link>
        </div>
        </>
    )
}
export default Homepage