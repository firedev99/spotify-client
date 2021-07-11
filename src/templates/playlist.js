import React, { useContext, useEffect, useState } from 'react'
// components
import PageBanner from '../components/props/pageBanner'
import Header from '../components/header'
import TrackList from '../components/props/trackList'
// utils
import reqWithToken from '../utils/reqWithToken'
import randomColor from '../utils/randomColor'
// context
import { LoginContext, PlayContext, PlaylistContext, TokenContext, TrackContext } from '../utils/context'
// styled-components
import { Wrapper } from "./styles/playlistStyles"
import updateWithToken from '../utils/updateWithToken'
// hooks

export default function PlaylistTemplate({ match }) {
    const { params: { id } } = match;

    const auth = useContext(LoginContext);
    const spotifyToken = useContext(TokenContext);
    const playlistTracks = useContext(PlaylistContext);
    const updatePlayer = useContext(PlayContext);
    const { currentTrack } = useContext(TrackContext);
    // console.log(playlistTracks.items.map(item => item.id === s));

    const [color, setColor] = useState('');
    const [saved, setSaved] = useState(false);
    const [playlistInfo, setPlaylistInfo] = useState([]);
    const [songs, setSongs] = useState([]);
    const [uri, setUri] = useState('');
    const total_duration = songs && songs.reduce((sum, { duration_ms }) => sum + duration_ms, 0);
    const isPlaying = currentTrack && currentTrack.play === true && songs.some(item => item.uri === currentTrack.uri);

    // play playlist or album 
    const playContext = _ => {
        const body = {
            context_uri: uri
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

    useEffect(() => {
        // set a random linear background color
        setColor(randomColor());
        // check if the playlist is saved in library or not
        if (id && playlistTracks.length !== 0) {
            const playlist_ids = playlistTracks.items.map(tracks => {
                return tracks.id;
            })
            if (playlist_ids.includes(id)) {
                setSaved(true);
            }
        }
    }, [id, playlistTracks])

    useEffect(() => {
        if (auth) {
            // get playlist tracks
            const getPlaylistItems = async () => {
                const reqPlaylistItems = reqWithToken(`https://api.spotify.com/v1/playlists/${id}`, spotifyToken);
                try {
                    const { data } = await reqPlaylistItems();
                    if (data) {
                        const { tracks, uri, ...infos } = data;
                        setUri(uri);
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
                playContext={playContext}
                isPlaying={isPlaying}
                saved={saved}
            >
                <TrackList songs={songs} uri={uri} />
            </PageBanner>
        </Wrapper>
    )
}
