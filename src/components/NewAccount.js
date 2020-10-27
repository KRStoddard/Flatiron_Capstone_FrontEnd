import React from 'react'
import {Fragment} from 'react'
import {HEADERS, API_ROOT} from '../constants/index'

class NewAccount extends React.Component{

    state = {
        accountType: null,
    }

    handleSelect = e => {
        this.setState({accountType: e.target.value})
    }

    bandSubmit = e => {
        e.preventDefault()
        const {name, email, password} = e.target
        const newBand = {name: name.value, email: email.value, password: password.value}
        const reqObj = {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({band: newBand})
        }

        fetch(`${API_ROOT}/bands`, reqObj)
        .then(resp => resp.json())
        .then(band => this.props.history.push(`/bandpage/${band.id}`))
    }

    venueSubmit = e => {
        e.preventDefault()
        const {name, email, street, city, state, zip, password} = e.target
        const address = `${street.value}, ${city.value}, ${state.value} ${zip.value}`
        const newVenue = {name: name.value, email: email.value, address: address, password: password.value}
        const reqObj = {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({venue: newVenue})
        }

        fetch(`${API_ROOT}/venues`, reqObj)
        .then(resp => resp.json())
        .then(venue => this.props.history.push(`/venuepage/${venue.id}`))
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

    venueForm = () => {
        return(
            <Fragment>
                <form onSubmit={this.venueSubmit}>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <input name="name" type="text" className="form-control" id="validationDefault01" placeholder="Venue Name" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input name="email" type="email" className="form-control" id="validationDefault02" placeholder="Email" required/>
                        </div>
                    </div>
                    <div class="form-row">
                    <div class="col-md-6 mb-3">
                            <input name="street" type="text" className="form-control" id="validationServer03" aria-describedby="validationServer03Feedback" placeholder="Street Address" required />
                        </div> 
                        <div class="col-md-6 mb-3">
                            <input name="city" type="text" className="form-control" id="validationServer03" aria-describedby="validationServer03Feedback" placeholder="City" required />
                        </div> 
                        <div class="col-md-3 mb-3">
                            <input name="state" type="text" className="form-control" id="validationServer03" aria-describedby="validationServer03Feedback" placeholder="State (ex. IL)" required />
                        </div> 
                    </div>
                    <div class="col-md-3 mb-3">
                        <input name="zip" type="text" className="form-control" id="validationServer05" aria-describedby="validationServer05Feedback" placeholder="zip" required />
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
            <div className="input-group mb-2 mr-sm-2">
                <select onChange={this.handleSelect} className="custom-select" id="validationDefault04" required>
                    <option selected disabled value="">Choose...</option>
                    <option>Band</option>
                    <option>Venue</option>
                </select>
            </div>
            {this.state.accountType === "Band" ?
            this.bandForm()
            : 
            null}
            {this.state.accountType === "Venue" ?
            this.venueForm()
            :
            null}
        </div>
        )
    }
}

export default NewAccount 