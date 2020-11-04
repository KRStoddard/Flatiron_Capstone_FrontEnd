import React from 'react'
import {PayPalButton} from 'react-paypal-button-v2'
import {API_ROOT, GET_REQUEST, createHeaders} from '../constants/index'

class RequestSong extends React.Component{

    state = {
        show: "",
        song: ""
    }

    requestSong = () => {
        const newReq = {song_id: this.state.song, playlist_id: this.state.show.playlist.id, show_id: this.state.show.id}
        const reqObj = {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({request: newReq})
        }
        fetch(`${API_ROOT}/requests`, reqObj)
        // .then(resp => resp.json())
        // .then(() => this.props.history.push(`/`))
    }

    componentDidMount(){
        const info = this.props.match.params.id.split('&')
        fetch(`${API_ROOT}/shows/${info[0]}`, GET_REQUEST())
        .then(resp => resp.json())
        .then(show => this.setState({show: show, song: info[1]}))
    }

    render(){
        
        return(
            <div className="new-form">
            <h2>Payment Confirmation</h2>
            <h3>The cost of this transaction will be ${this.state.show.price_per_request}</h3>
            {this.state.error ?
                <p>We're sorry, there was an error with your request.</p>
            :
            null}
            <PayPalButton 
            amount={this.state.show.price_per_request}
                onSuccess={(details) => {
                    this.requestSong()
                    alert("Thank you, " + details.payer.name.given_name + ". Your song has been successfully requested.")
                    this.props.history.push(`/`)}}
                onError={() => this.setState({error: true})}
                options={{
                    clientId: process.env.REACT_APP_CLIENT_ID
                      }} 
            />
            </div>
        )
    }
}

export default RequestSong

//const {song_id, playlist_id, show_id} = this.props.location.state.detail