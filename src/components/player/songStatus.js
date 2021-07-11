import React, { useContext, useEffect } from 'react'
import { NavLink } from "react-router-dom"
// icons
import { HeartOutlineIcon } from "../../helpers/icons"
import { TokenContext, TrackContext } from '../../utils/context'
import reqWithToken from '../../utils/reqWithToken'
// styled-components
import { Wrapper, SongPoster, SongMeta, LikeButton } from "./styles/statusStyles"

export default function SongStatus() {
    const spotifyToken = useContext(TokenContext);
    const { currentTrack, setCurrentTrack } = useContext(TrackContext);

    useEffect(() => {
        if (!currentTrack || Object.keys(currentTrack).length === 0) {
            const recentlyPlayedTrack = async _ => {
                try {
                    const getTrack = reqWithToken('https://api.spotify.com/v1/me/player/recently-played?limit=1', spotifyToken);
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

    }, [spotifyToken, currentTrack, setCurrentTrack])

    return (
        <Wrapper>
            <SongPoster>
                <img src={currentTrack.album && currentTrack.album.images[0].url} alt={`preview-${currentTrack.id}`} draggable="false" />
            </SongPoster>
            <SongMeta>
                <div className="song_info">
                    <NavLink to={`/albums/${currentTrack.id}`}>{currentTrack && currentTrack.name}</NavLink>
                </div>
                <div className="artist_info">
                    <NavLink to="/">{currentTrack.artists && currentTrack.artists.map(artist => artist.name).join(', ')}</NavLink>
                </div>
            </SongMeta>
            <LikeButton>
                <button>
                    <HeartOutlineIcon />
                </button>
            </LikeButton>
        </Wrapper>
    )
}
