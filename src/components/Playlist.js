import React from 'react'
import {Link} from 'react-router-dom'

const Playlist = (props) => {
    return(
        <div className="playlist-el">
            <Link to={`/playlists/${props.playlist.id}`}>{props.playlist.name}</Link>
        </div>
    )
}

export default Playlist