import React from 'react'
import {Link} from 'react-router-dom'
import {API_ROOT, HEADERS} from '../constants/index'

class Login extends React.Component{

    state = {
        option: null
    }

    handleLogin = e => {
        e.preventDefault()
        const reqObj = {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({"name": e.target.name.value, "password": e.target.password.value})
        }

        console.log(reqObj)
        fetch(`${API_ROOT}/${this.state.option.toLowerCase()}s/login`, reqObj)
        .then(resp => resp.json())
        .then(data => {
            localStorage.setItem('bandToken', data.token)
            this.props.history.push(`/bandpage/${data.band.id}`)
        })
    }

    render(){
        return(
            <div className="background">
                <div className="login-div">
                    <form onSubmit = {this.handleLogin}className="form-inline">
                        <label className="sr-only" for="inlineFormInputGroupUsername2">Username</label>
                        <div className="input-group mb-2 mr-sm-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">@</div>
                            </div>
                            <input name="name" type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Name"/>
                        </div>
                        <label class="sr-only" for="inlineFormINputName2">Password</label>
                        <input name="password" type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="password"/>
                        <div className="input-group mb-2 mr-sm-2">
                            <select onChange={e => {this.setState({option: e.target.value})}} className="custom-select" id="validationDefault04" required>
                                <option selected disabled value="">Choose...</option>
                                <option>Band</option>
                                <option>Venue</option>
                            </select>
                        </div>
                        <button className="btn btn-primary" type="submit">Login</button>
                    </form>
                    <Link className="loginLink" to='/NewAccount'>Don't Have An Account? Make One.</Link>
                </div>
            </div>
        )
    }
}

export default Login