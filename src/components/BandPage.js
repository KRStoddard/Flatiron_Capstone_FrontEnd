import React from 'react'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'

class BandPage extends React.Component{
    render(){
        return(
            <div className="bandpage">
                <Navbar/>
                <Link to="/NewShow">New Show</Link>
            </div>
        )
    }
}

export default BandPage