import React from 'react'
import {PayPalButton} from 'react-paypal-button-v2'
import {API_ROOT, GET_REQUEST, createHeaders} from '../constants/index'
import Navbar from './Navbar'

class RequestSong extends React.Component{

    //state for component class
    state = {
        show: "",
        song: ""
    }

    //creates song request and sends it to backend
    requestSong = () => {
        const newReq = {song_id: this.state.song, playlist_id: this.state.show.playlist.id, show_id: this.state.show.id}
        const reqObj = {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({request: newReq})
        }
        fetch(`${API_ROOT}/requests`, reqObj)
    }

    //immediately fetches info about the show and song
    componentDidMount(){
        const info = this.props.match.params.id.split('&')
        fetch(`${API_ROOT}/shows/${info[0]}`, GET_REQUEST())
        .then(resp => resp.json())
        .then(show => this.setState({show: show, song: info[1]}))
    }

    //renders if the show.price_per_request is above zero
    renderPayment = () => {
        return (
            <>
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
            </>
        )
    }

    //renders if song requests are free
    renderFree = () => {
        return (
        <>
            <h2>Confirm Song Request</h2>
            <button 
                onClick={() => {
                    this.requestSong()
                    alert("Thank you, your song has been requested.")
                    this.props.history.push(`/`)
                }}
                className="btn">Confirm
            </button>
        </>
        )
    }

    //renders page
    render(){
        return(
            <>
            <Navbar props={this.props} />
            <div className="new-form">
            {this.state.show.price_per_request > 0 ?
                this.renderPayment()
            :
                this.renderFree()}
            </div>
            </>
        )
    }
}

export default RequestSong

//const {song_id, playlist_id, show_id} = this.props.location.state.detail