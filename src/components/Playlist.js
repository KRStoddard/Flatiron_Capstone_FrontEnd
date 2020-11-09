import React from 'react'
import {Link} from 'react-router-dom'

//renders each individual playlist
const Playlist = (props) => {
    return(
        
            <li className="list-group-item text-decoration-none">
                <Link to={`/playlists/${props.playlist.id}`}>
                    {props.playlist.name}
                </Link>
            </li>
    )
}

export default Playlist