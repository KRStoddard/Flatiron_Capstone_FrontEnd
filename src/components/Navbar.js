import React from 'react'
import {Link} from 'react-router-dom'
import {API_ROOT, GET_REQUEST} from '../constants/index'

class Navbar extends React.Component{

    state = {
        band: {}
    }

    // returnHome = () => {
    //     fetch(`${API_ROOT}/auto_login`, GET_REQUEST())
    //     .then(resp => resp.json())
    //     .then(band => {this.props.props.history.push(`/bandpage/${band.id}`)})
    // }

    componentDidMount(){
        fetch(`${API_ROOT}/auto_login`, GET_REQUEST())
        .then(resp => resp.json())
        .then(band => this.setState({band}))
    }

    render(){
        return(
            <>
            {this.state.band.id ?
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                    <Link className="navbar-brand" to={`/bandpage/${this.state.band.id}`}>JUKEBOX LIVE</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" to={`/playlists/`}>Playlists</Link>
                            <Link className="nav-link" to="/" onClick={() => localStorage.removeItem('bandToken')}>Logout</Link>
                        </div>
                    </div>
                </nav>
            :
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                    <Link className="navbar-brand" to={`/`}>JUKEBOX LIVE</Link>
                </nav>
            }
            </>
        )
    }
}

export default Navbar