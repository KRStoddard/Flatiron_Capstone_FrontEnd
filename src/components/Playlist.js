import React from 'react'
import {Link} from 'react-router-dom'

const Playlist = (props) => {
    return(
        <li className="list-group-item">
            <Link to={`/playlists/${props.playlist.id}`}>{props.playlist.name}</Link>
        </li>
    )
}

export default Playlist