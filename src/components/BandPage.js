import React from 'react'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'
import {API_ROOT, GET_REQUEST} from '../constants/index'

class BandPage extends React.Component{


    state = {
        band: {
            shows: []
        }
    }

    currentShow = () => {
        const show = this.state.band.shows.filter(show => show.complete !== true)
        if (show.length > 0) {
            return show[0].id
        } else {
            return false
        }
    }

    componentDidMount(){
        fetch(`${API_ROOT}/auto_login`, GET_REQUEST())
        .then(resp => resp.json())
        .then(band => this.setState({band}))
    }

    render(){
        console.log(this.currentShow())
        return(
            <>
            <Navbar props={this.props} />
            {this.currentShow() ? 
                this.props.history.push(`/bandshowpage/${this.currentShow()}`)
            :
            <div className="container justify-content-center text-center new-form">
                <Link className="nShowLink" to="/NewShow">Start a New Show</Link>
            </div>
            }
            </>
        )
    }
}

export default BandPage