import React from 'react'
import {Link} from 'react-router-dom'

//renders each individual playlist
const Playlist = (props) => {
    return(
        <Link to={`/playlists/${props.playlist.id}`}>
            <li className="list-group-item">
                {props.playlist.name}
            </li>
        </Link>
    )
}

export default Playlist