import React, { useContext } from 'react'
// util
import { minutesAndSeconds } from "../../utils/getTime"
import { Wrapper } from './styles/trackListStyles'
// icons
import { ClockIcon, PauseIcon, PlayIcon } from '../../helpers/icons'
import { PlayContext, TokenContext, TrackContext } from '../../utils/context'
import updateWithToken from '../../utils/updateWithToken'
// hooks

export default function TrackList({ songs, uri }) {
    const spotifyToken = useContext(TokenContext);
    const updatePlayer = useContext(PlayContext);
    const { currentTrack } = useContext(TrackContext);

    const isPlaying = currentTrack && currentTrack.play === true;

    const playTrack = (track_uri) => {
        // if no uri is given e.g liked page 
        const notExits = songs.filter(item => item.uri === track_uri);
        const body = {
            context_uri: uri ? uri : notExits[0].album.uri,
            offset: { uri: track_uri }
        }
        const requestFunc = updateWithToken(`https://api.spotify.com/v1/me/player/play`, spotifyToken, body);
        const requestMusic = async _ => {
            const response = await requestFunc();
            if (response.status === 204) {
                setTimeout(() => updatePlayer(), 200);
            } else {
                console.log('Something happend.');
            }
        };
        requestMusic();
    };

    return (
        <Wrapper>
            <ol>
                <li>
                    <span>#</span>
                    <span>Title</span>
                    <span>Album</span>
                    <span className="duration">
                        <ClockIcon />
                    </span>
                </li>
                {songs && songs.map((items, index) => (
                    <li key={`${items.name}-${index}-track`}>
                        <div className="index">
                            <span className="index_id">{index + 1}</span>
                            <button onClick={() => { playTrack(items.uri) }} className={`icon ${index < 9 ? `icon_single` : `icon_double`}`}>{isPlaying && items.uri === currentTrack.uri ? <PauseIcon /> : <PlayIcon />}</button>
                        </div>
                        <div className="image">
                            <img src={items.album && items.album.images[0].url} alt={`${items.album.name}track-${index}`} loading="lazy" />
                            <span className="name">{items.name}</span>
                        </div>
                        <span className="album_name">{items.album.name}</span>
                        <span className="duration">{minutesAndSeconds(items.duration_ms)}</span>
                    </li>
                ))}
            </ol>
        </Wrapper>
    )
}
