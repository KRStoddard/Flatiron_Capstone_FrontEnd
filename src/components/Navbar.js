import React from 'react'
import {Link} from 'react-router-dom'

class Navbar extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">LIVEARCHIVE</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to={`/playlists/`}>Playlists</Link>
                        <a className="nav-link" href="#">Shows</a>
                        <a className="nav-link" href="#">Stats</a>
                        <Link className="nav-link" to="/login" onClick={() => localStorage.removeItem('bandToken')}>Logout</Link>
                    </div>
                 </div>
            </nav>
        )
    }
}

export default Navbar