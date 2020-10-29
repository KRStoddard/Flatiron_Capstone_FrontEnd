import React from 'react'
import {Link} from 'react-router-dom'

const Homepage = () => {
    return(
        <div className="background">
                <div className="login-div">
                   <h2>Are You A...</h2>
                   <Link to="/login">Band</Link>
                   <Link to="/attendeepage">Show Attendee</Link>
                </div>
            </div>
    )
}
export default Homepage