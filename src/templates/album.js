import React, { useContext, useEffect, useState } from 'react'
// context
import { LoginContext, PlayContext, PlaylistContext, TokenContext, TrackContext } from '../utils/context';
// utils
import randomColor from "../utils/randomColor";
import reqWithToken from '../utils/reqWithToken'
import updateWithToken from '../utils/updateWithToken';
// components
import Header from '../components/header'
import PageBanner from '../components/props/pageBanner'
import TrackList from '../components/props/trackList'
// styled-components
import { Wrapper } from "./styles/albumStyles"

export default function AlbumTemplate({ match }) {
    const { params: { id } } = match;

    const auth = useContext(LoginContext);
    const spotifyToken = useContext(TokenContext);
    const playlistTracks = useContext(PlaylistContext);
    const updatePlayer = useContext(PlayContext);
    const { currentTrack } = useContext(TrackContext);

    const [bgColor, setBgColor] = useState('');
    const [saved, setSaved] = useState(false);
    const [albumInfo, setAlbumInfo] = useState({
        type: '',
        name: '',
        cover: '',
        artists: '',
        date: '',
    });
    const [songs, setSongs] = useState([]);
    const [uri, setUri] = useState('');

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
                console.log('Something happend.');
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
        if (auth) {
            // get playlist tracks
            const getAlbumItems = async () => {
                const reqSingleAlbum = reqWithToken(`https://api.spotify.com/v1/albums/${id}`, spotifyToken);
                try {
                    const response = await reqSingleAlbum();
                    if (response.status === 200) {
                        const { album_type, artists, images, name, tracks, uri, release_date } = response.data;
                        setUri(uri);
                        setSongs(tracks.items.map(item => ({
                            id: item.id,
                            artists: item.artists.map(item => item.name),
                            track_name: item.name,
                            duration: item.duration_ms,
                            uri: item.uri,
                        })));
                        setAlbumInfo({ type: album_type, name: name, artists: artists.map(artist => artist.name), cover: images[0].url, date: release_date });
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            getAlbumItems();
        }
    }, [id, spotifyToken, auth])

    return (
        <Wrapper>
            <Header bg={bgColor} />
            <PageBanner
                bg={bgColor}
                type={albumInfo.type}
                title={albumInfo.name}
                image={albumInfo.cover}
                release={albumInfo.date}
                songs={songs.length}
                duration={total_duration}
                owner={albumInfo.artists && albumInfo.artists.join(` ${String.fromCodePoint(parseInt(8226))} `)}
                isPlaying={isPlaying}
                playContext={playContext}
                saved={saved}
            >
                <TrackList songs={songs} uri={uri} type="single" />
            </PageBanner>
        </Wrapper >
    )
}
