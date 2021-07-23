import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
// utils
import { LoginContext, PlayContext, TokenContext, TrackContext } from '../utils/context'
import randomColor from "../utils/randomColor"
import getWithToken from '../utils/getWithToken'
import updateWithToken from '../utils/updateWithToken'
// components
import Header from '../components/header'
import PageBanner from '../components/props/pageBanner'
import TrackList from '../components/props/trackList'
import SpotifyLoader from '../components/props/loader'
// styled-components
import { Wrapper } from "./styles/albumStyles"

export default function AlbumTemplate({ match }) {
    const { params: { id } } = match;

    const auth = useContext(LoginContext);
    const spotifyToken = useContext(TokenContext);
    const updatePlayer = useContext(PlayContext);
    const { currentTrack } = useContext(TrackContext);

    const [bgColor, setBgColor] = useState('');
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [songs, setSongs] = useState([]);
    const [uri, setUri] = useState('');
    const total_duration = songs && songs.reduce((sum, { duration }) => sum + duration, 0);
    const isPlaying = currentTrack && currentTrack.play === true && songs.some(item => item.uri === currentTrack.uri);
    const [albumInfo, setAlbumInfo] = useState({
        type: '',
        name: '',
        cover: '',
        artists: '',
        date: '',
    });

    // play whole playlist or album 
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
    }, [])

    useEffect(() => {
        const cancelSource = axios.CancelToken.source();
        // get a specific album's items and check if it contains in the library
        if (auth) {
            async function getAlbumItems() {
                try {
                    const reqSingleAlbum = getWithToken(`https://api.spotify.com/v1/albums/${id}`, spotifyToken, cancelSource);
                    const checkAlbum = getWithToken(`https://api.spotify.com/v1/me/albums/contains?ids=${id}`, spotifyToken, cancelSource);
                    const [_album, _checkAlbum] = await Promise.all([reqSingleAlbum(), checkAlbum()]);

                    if (_album.status === 200 && _checkAlbum.status === 200) {
                        let { album_type, artists, images, name, tracks, uri, release_date } = _album.data;
                        setUri(uri);
                        setSongs(tracks.items.map(item => ({
                            id: item.id,
                            artists: item.artists.map(item => item.name),
                            track_name: item.name,
                            duration: item.duration_ms,
                            uri: item.uri,
                        })));
                        setAlbumInfo({
                            type: album_type,
                            name: name,
                            artists: artists.map(artist => artist.name),
                            cover: images[0].url, date: release_date
                        });
                        if (_checkAlbum.data.some(item => item === true)) {
                            setSaved(true);
                        }
                        setLoading(false);
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            getAlbumItems();
        }

        return _ => cancelSource.cancel();
    }, [id, spotifyToken, auth])

    return loading ? <SpotifyLoader /> : (
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
                id={id}
                saved={saved}
            >
                <TrackList songs={songs} uri={uri} type="single" />
            </PageBanner>
        </Wrapper >
    )
}
