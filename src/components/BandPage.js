import React from 'react'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'

class BandPage extends React.Component{
    render(){
        return(
            <>
            <Navbar props={this.props} />
            <div className="container justify-content-center text-center">
                <Link className="nShowLink" to="/NewShow">Start a New Show</Link>
            </div>
            </>
        )
    }
}

export default BandPage