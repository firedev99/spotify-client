import React, { useContext, useEffect } from 'react'
import { NavLink } from "react-router-dom"
// context
import { TokenContext, TrackContext } from '../../utils/context'
// utils
import reqWithToken from '../../utils/reqWithToken'
// icons
import { HeartOutlineIcon } from "../../helpers/icons"
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
            <LikeButton>
                <button>
                    <HeartOutlineIcon />
                </button>
            </LikeButton>
        </Wrapper>
    )
}
