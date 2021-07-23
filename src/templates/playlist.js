import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
// components
import PageBanner from '../components/props/pageBanner'
import Header from '../components/header'
import TrackList from '../components/props/trackList'
import SpotifyLoader from '../components/props/loader'
// utils
import getWithToken from '../utils/getWithToken'
import updateWithToken from '../utils/updateWithToken'
import randomColor from '../utils/randomColor'
import { LoginContext, PlayContext, PlaylistContext, StatusContext, TokenContext, TrackContext } from '../utils/context'
// styled-components
import { Wrapper } from "./styles/playlistStyles"
import AddToPlaylist from '../components/props/addToPlaylist';

export default function PlaylistTemplate({ match }) {
    const { params: { id } } = match;

    const auth = useContext(LoginContext);
    const spotifyToken = useContext(TokenContext);
    const playlistTracks = useContext(PlaylistContext);
    const updatePlayer = useContext(PlayContext);
    const { currentTrack } = useContext(TrackContext);
    const setFlash = useContext(StatusContext);

    const [bgColor, setBgColor] = useState('');
    const [songs, setSongs] = useState([]);
    const [uri, setUri] = useState('');
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [playlistInfo, setPlaylistInfo] = useState({
        name: '',
        cover: '',
        description: '',
    });

    const total_duration = songs && songs.reduce((sum, { duration }) => sum + duration, 0);
    const isPlaying = currentTrack && currentTrack.play === true && songs.some(item => item.uri === currentTrack.uri);
    // play playlist or album 
    const playContext = _ => {
        const body = {
            context_uri: uri
        }
        const requestFunc = updateWithToken(`https://api.spotify.com/v1/me/player/${currentTrack.play && songs.some(item => item.id === currentTrack.id) ? `pause` : `play`}`, spotifyToken, body);
        const requestMusic = async _ => {
            const response = await requestFunc();
            if (response.status === 204) {
                setTimeout(() => updatePlayer(), 200);
            } else {
                setFlash('Opps, something went wrong!');
            }
        };
        requestMusic();
    };

    useEffect(() => {
        // set a random linear background color
        setBgColor(randomColor());
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
        const cancelSource = axios.CancelToken.source();
        // get items of a specific playlist
        if (auth) {
            const getPlaylistItems = async () => {
                const reqPlaylistItems = getWithToken(`https://api.spotify.com/v1/playlists/${id}`, spotifyToken, cancelSource);
                try {
                    const response = await reqPlaylistItems();
                    if (typeof response !== 'undefined' && response.status === 200) {
                        const { description, images, name, tracks, uri } = response.data;
                        setUri(uri);
                        setSongs(tracks.items.map(item => ({
                            artists: item.track.artists.map(item => item.name),
                            id: item.track.id,
                            track_name: item.track.name,
                            track_image: item.track.album.images[0].url,
                            duration: item.track.duration_ms,
                            uri: item.track.uri,
                        })));
                        setPlaylistInfo({ name: name, description: description, cover: images[0] && images[0].url })
                        setLoading(false);
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            getPlaylistItems();
        }

        return _ => cancelSource.cancel();
    }, [id, spotifyToken, auth]);

    return loading ? <SpotifyLoader /> : (
        <Wrapper>
            <Header bg={bgColor} />
            <PageBanner
                bg={bgColor}
                image={playlistInfo.cover}
                title={playlistInfo.name}
                songs={songs.length !== 0 && songs.length}
                owner="spotify"
                duration={total_duration !== 0 && total_duration}
                description={playlistInfo.description}
                isPlaying={isPlaying}
                playContext={playContext}
                saved={saved}
                id={id}
            >
                {songs.length !== 0 ? (<TrackList songs={songs} uri={uri} />) : (<AddToPlaylist id={id} />)}
            </PageBanner>
        </Wrapper>
    )
}
