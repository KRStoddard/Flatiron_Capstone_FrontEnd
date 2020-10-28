import React from 'react'
import {Fragment} from 'react'
import {HEADERS, API_ROOT} from '../constants/index'

class NewAccount extends React.Component{

    // state = {
    //     accountType: null,
    // }

    // handleSelect = e => {
    //     this.setState({accountType: e.target.value})
    // }

    bandSubmit = e => {
        e.preventDefault()
        const {name, username, email, password} = e.target
        const newBand = {name: name.value, username: username.value, email: email.value, password: password.value}
        const reqObj = {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({band: newBand})
        }

        fetch(`${API_ROOT}/bands`, reqObj)
        .then(resp => resp.json())
        .then(band => this.props.history.push(`/bandpage/${band.band.id}`))
    }

    
    bandForm = () => {
        return(
            <Fragment>
                <form onSubmit={this.bandSubmit}>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <input name="name" type="text" className="form-control" id="validationDefault01" placeholder="Band Name" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input name="username" type="text" className="form-control" id="validationDefault01" placeholder="Username" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input name="email" type="email" className="form-control" id="validationDefault02" placeholder="Email" required/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-3">
                            <input name="password" type="password" className="form-control" placeholder="password" />
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Submit form</button>
                </form>
            </Fragment>
        )
    }

    

    render(){
        return(
            <div>
            {/* <div className="input-group mb-2 mr-sm-2">
                <select onChange={this.handleSelect} className="custom-select" id="validationDefault04" required>
                    <option selected disabled value="">Choose...</option>
                    <option>Band</option>
                    <option>Venue</option>
                </select>
            </div> */}
            {this.bandForm()}
        </div>
        )
    }
}

export default NewAccount 