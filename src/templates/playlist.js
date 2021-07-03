import React, { useContext, useEffect, useState } from 'react'
// components
import PageBanner from '../components/props/pageBanner'
import Header from '../components/header'
import TrackList from '../components/props/trackList'
// utils
import reqWithToken from '../utils/reqWithToken'
import randomColor from '../utils/randomColor'
// context
import { LoginContext, TokenContext } from '../utils/context'
// styled-components
import { Wrapper } from "./styles/playlistStyles"
// hooks

export default function PlaylistTemplate({ match }) {
    const { params: { id } } = match;
    const auth = useContext(LoginContext);
    const spotifyToken = useContext(TokenContext);

    const [playlistInfo, setPlaylistInfo] = useState([]);
    const [songs, setSongs] = useState([]);
    const [color, setColor] = useState('');
    console.log(songs.length);
    const total_duration = songs.reduce((sum, { duration_ms }) => sum + duration_ms, 0);

    // console.log(playlistInfo);
    useEffect(() => {
        setColor(randomColor());
    }, [])


    useEffect(() => {
        if (auth) {
            const getPlaylistItems = async () => {
                const reqPlaylistItems = reqWithToken(`https://api.spotify.com/v1/playlists/${id}`, spotifyToken);

                try {
                    const { data } = await reqPlaylistItems();
                    if (data) {
                        const { tracks, ...infos } = data;
                        setSongs(tracks.items.map(tracks => tracks.track));
                        setPlaylistInfo(infos);
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            getPlaylistItems();
        }
    }, [id, spotifyToken, auth])
    return (
        <Wrapper>
            <Header bg={color} />
            <PageBanner
                bg={color}
                songs={songs.length}
                duration={total_duration}
                title={playlistInfo && playlistInfo.name}
                image={playlistInfo.images && playlistInfo.images[0].url}
                description={playlistInfo.description && playlistInfo.description}
            >
                <TrackList songs={songs} />
            </PageBanner>
        </Wrapper>
    )
}
