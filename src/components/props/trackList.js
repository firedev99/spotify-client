import React, { useContext } from 'react'
// icons
import { ClockIcon, PauseIcon, PlayIcon } from '../../helpers/icons'
// utils
import { minutesAndSeconds } from "../../utils/getTime"
import { PlayContext, TokenContext, TrackContext } from '../../utils/context'
import updateWithToken from '../../utils/updateWithToken'
// styled-components
import { Wrapper } from './styles/trackListStyles'

export default function TrackList({ songs, uri, type = "playlist" }) {
    const spotifyToken = useContext(TokenContext);
    const updatePlayer = useContext(PlayContext);
    const { currentTrack } = useContext(TrackContext);

    const isPlaying = currentTrack && currentTrack.play === true;

    const playTrack = (track_uri) => {
        // if no uri is given e.g liked page 
        const notExits = songs.filter(item => item.uri === track_uri);
        const body = {
            context_uri: uri ? uri : notExits[0].album_uri,
            offset: { uri: track_uri }
        }
        const artistTypeBody = {
            uris: [track_uri]
        }

        const url = `https://api.spotify.com/v1/me/player/${currentTrack.play && currentTrack.uri === track_uri ? `pause` : `play`}`
        const requestFunc = updateWithToken(url, spotifyToken, type === "artist" ? artistTypeBody : body);
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
            {type === 'artist' && <h3 className="popular">Popular</h3>}
            <ol>
                <li className={type === 'single' ? `single` : ``}>
                    <span>#</span>
                    <span>Title</span>
                    {type !== 'single' && <span>Album</span>}
                    <span className="duration">
                        <ClockIcon />
                    </span>
                </li>
                {songs && songs.map((items, index) => (
                    <li key={`${items.track_name}-${index}-track`} className={type === 'single' ? `single_item` : ``}>
                        <div className="index">
                            <span className="index_id">{index + 1}</span>
                            <button onClick={() => { playTrack(items.uri) }} className={`icon ${index < 9 ? `icon_single` : `icon_double`}`}>{isPlaying && items.uri === currentTrack.uri ? <PauseIcon /> : <PlayIcon />}</button>
                        </div>
                        <div className={type === 'single' ? 'image_single' : 'image'}>
                            {items.track_image && (<img src={items.track_image} alt={`${items.track_image}.jpg`} loading="lazy" />)}
                            <span className="name">{items.track_name}</span>
                            {type === 'single' && <span className="album_artists">{items.artists && items.artists.map(item => item).join(", ")}</span>}
                        </div>
                        {type !== 'single' && <span className="album_artists">{items.artists && items.artists.map(item => item).join(", ")}</span>}
                        <span className="duration">{minutesAndSeconds(items.duration)}</span>
                    </li>
                ))}
            </ol>
        </Wrapper>
    )
}
