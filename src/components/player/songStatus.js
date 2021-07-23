import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import axios from 'axios'
// components
import SaveToLibrary from '../props/saveToLibrary'
// utils
import { TokenContext, TrackContext } from '../../utils/context'
import getWithToken from '../../utils/getWithToken'
// styled-components
import { Wrapper, SongPoster, SongMeta } from "./styles/statusStyles"

export default function SongStatus() {
    const spotifyToken = useContext(TokenContext);
    const { currentTrack, setCurrentTrack } = useContext(TrackContext);

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const cancelSource = axios.CancelToken.source();
        // get recently played track if nothing is beign played yet
        if (!currentTrack || Object.keys(currentTrack).length === 0) {
            async function recentlyPlayedTrack() {
                try {
                    const getTrack = getWithToken('https://api.spotify.com/v1/me/player/recently-played?limit=1', spotifyToken, cancelSource);
                    const response = await getTrack();
                    if (response.status === 200) {
                        let { items } = response.data;
                        let track = items[0].track;
                        setCurrentTrack(({ ...track, play: false }));
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            recentlyPlayedTrack();
        }

        if (currentTrack && typeof currentTrack.id !== 'undefined') {
            // check if the track is saved in user's library
            async function checkSavedStatus() {
                try {
                    const checkSaved = getWithToken(`https://api.spotify.com/v1/me/tracks/contains?ids=${currentTrack.id}`, spotifyToken, cancelSource);
                    const response = await checkSaved();
                    if (typeof response !== 'undefined') {
                        if (response.status === 200 && response.data.some(item => item === true)) {
                            setSaved(true);
                        } else {
                            setSaved(false);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            checkSavedStatus();
        }

        return _ => cancelSource.cancel();
    }, [spotifyToken, currentTrack, setCurrentTrack])

    return (
        <Wrapper>
            <SongPoster>
                <img src={currentTrack.album && currentTrack.album.images[0].url} alt={`preview-${currentTrack.id}`} draggable="false" />
            </SongPoster>
            <SongMeta>
                <div className="song_info">
                    <NavLink to={`/album/${currentTrack.album && currentTrack.album.uri.split(':')[2]}`}>{currentTrack && currentTrack.name}</NavLink>
                </div>
                <div className="artist_info">
                    {currentTrack.artists && currentTrack.artists.map((item, index) => {
                        return (
                            <div className="nav" key={`artist-${item.name}`}>
                                <NavLink to={`/artist/${item.uri && item.uri.split(':')[2]}`}>{item.name}</NavLink>
                                <span>{currentTrack.artists.length > 1 && index !== currentTrack.artists.length - 1 && ","}</span>
                            </div>
                        )
                    })}
                </div>
            </SongMeta>
            <div className="save_track">
                <SaveToLibrary type="track" size={20} liked={saved} id={typeof currentTrack.id !== 'undefined' && currentTrack.id} />
            </div>
        </Wrapper>
    )
}
