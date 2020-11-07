import React from 'react'
import {Fragment} from 'react'
import {createHeaders, API_ROOT} from '../constants/index'

class NewAccount extends React.Component{

    state = {
        errors: []
    }

    // handleSelect = e => {
    //     this.setState({accountType: e.target.value})
    // }

    bandSubmit = e => {
        e.preventDefault()
        const {name, username, email, password} = e.target
        const newBand = {name: name.value, username: username.value, email: email.value, password: password.value}
        const reqObj = {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({band: newBand})
        }

        fetch(`${API_ROOT}/bands`, reqObj)
        .then(resp => resp.json())
        .then(band => {
            if (!band.errors) {
             this.props.history.push(`/bandpage/${band.band.id}`)
            } else {
                this.setState({errors: band.errors})
            }})
    }

    renderErrors = () => {
        return this.state.errors.map(error => {
            return <p className="error">{error}</p>
        })
    }

    
    bandForm = () => {
        return(
            <Fragment>
                <form className="new-form" onSubmit={this.bandSubmit}>
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
                        <div className="col-md-6 mb-3">
                        <input name="password" type="password" className="form-control" placeholder="password" />
                        </div>
                    </div>
                    {/* <div className="form-row">
                        <div className="col-md-3 mb-3">
                            
                        </div>
                    </div> */}
                    <button className="btn btn-primary" type="submit">Submit form</button>
                </form>
            </Fragment>
        )
    }

    

    render(){
        return(
            <div className="playlist-div">
                <h1>Create An Account</h1>
                {this.renderErrors()}
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