import React, { useContext, useEffect, useState } from 'react'
// context
import { LoginContext, PlayContext, TokenContext, TrackContext } from '../utils/context'
// utils
import randomColor from "../utils/randomColor"
import reqWithToken from '../utils/reqWithToken'
import updateWithToken from '../utils/updateWithToken'
import getLocale from "../utils/getLocale"
// components
import Header from '../components/header'
import PageBanner from '../components/props/pageBanner'
import TrackList from '../components/props/trackList'
// styled-components
import { Wrapper } from "./styles/artistStyles"

export default function AlbumTemplate({ match }) {
    const { params: { id } } = match;

    const auth = useContext(LoginContext);
    const spotifyToken = useContext(TokenContext);
    const updatePlayer = useContext(PlayContext);
    const { currentTrack } = useContext(TrackContext);

    const [bgColor, setBgColor] = useState('');
    const [uri, setUri] = useState('');
    const [songs, setSongs] = useState([]);
    const [artistInfo, setArtistInfo] = useState({
        type: '',
        name: '',
        cover: '',
        followers: 0,
    });

    const [, country] = getLocale();
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
    }, [])

    useEffect(() => {
        if (auth) {
            // get an artist's info, top songs, albums
            async function getArtistData() {
                const reqInformations = reqWithToken(`https://api.spotify.com/v1/artists/${id}`, spotifyToken);
                const reqTopTracks = reqWithToken(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=${country}`, spotifyToken);
                try {
                    const [_info, _tracks] = await Promise.all([reqInformations(), reqTopTracks()]);
                    if (_info.status === 200 && _tracks.status === 200) {
                        let { followers: { total }, images, name, type, uri } = _info.data;
                        let { tracks } = _tracks.data;

                        setArtistInfo({ followers: total, cover: images[0].url, name, type });
                        setUri(uri);
                        setSongs(tracks.map(item => ({
                            id: item.id,
                            artists: item.artists.map(item => item.name),
                            track_name: item.name,
                            track_image: item.album.images[0].url,
                            duration: item.duration_ms,
                            uri: item.uri
                        })));
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            getArtistData();
        }
    }, [id, spotifyToken, auth, country])

    return (
        <>
            <Wrapper>
                <Header bg={bgColor} />
                <PageBanner
                    bg={bgColor}
                    disableHeart={true}
                    type={artistInfo.type}
                    title={artistInfo.name}
                    image={artistInfo.cover}
                    owner={`${(artistInfo.followers).toLocaleString("en-US")} monthly listeners`}
                    playContext={playContext}
                    isPlaying={isPlaying}
                >
                    <TrackList songs={songs} uri={uri} type="artist" />
                </PageBanner>
            </Wrapper >
        </>
    )
}
