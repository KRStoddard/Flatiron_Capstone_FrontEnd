import React from 'react'
import {Link} from 'react-router-dom'
import {API_ROOT, createHeaders} from '../constants/index'
import Navbar from './Navbar'

class Login extends React.Component{

    //local state for component class
    state = {
        errors: []
    }

    //sends login request to the backend and handles errors
    handleLogin = e => {
        e.preventDefault()
        const reqObj = {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({"name": e.target.name.value, "password": e.target.password.value})
        }

        fetch(`${API_ROOT}/bands/login`, reqObj)
        .then(resp => resp.json())
        .then(data => {
            if (!data.error) {
            localStorage.setItem('bandToken', data.token)
            this.props.history.push(`/bandpage/${data.band.id}`)
            } else {
                this.setState({errors: data.error})
            }
        })
    }

    //renders errors
    renderErrors = () => {
        return <p className="error">{this.state.errors}</p>
    }

    //renders page
    render(){
        return(
            <>
            <Navbar props={this.props} />
            <div className="container text-center new-form">
                <h1 className="loginhead">JUKEBOX LIVE</h1>
                {this.renderErrors()}
                    <form onSubmit = {this.handleLogin}className="form-inline justify-content-center loginform">
                        <div className="input-group mb-2 mr-sm-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">@</div>
                            </div>
                            <input name="name" type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Username"/>
                        </div>
                        <input name="password" type="password" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Password"/>
                        <button className="btn btn-primary" type="submit">Login</button>
                    </form>
                    <Link className="home-link loginLink" to='/NewAccount'>Don't Have An Account? Make One.</Link>
            </div>
            </>
        )
    }
}

export default Login