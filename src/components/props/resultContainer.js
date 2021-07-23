import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
// components
import Frame from './frame'
// hooks
import { useDimesions } from '../../hooks/useDimesions'
// utils
import { LoginContext, PlayContext, StatusContext, TokenContext, TrackContext } from '../../utils/context'
import getWithToken from '../../utils/getWithToken'
import updateWithToken from '../../utils/updateWithToken'
import postWithToken from '../../utils/postWithToken'
import { minutesAndSeconds } from "../../utils/getTime"
// icons
import { PauseIcon, PlayIcon } from '../../helpers/icons'
// styled-components
import { Container, FrameWrapper } from './styles/resultStyles'

export default function ResultContainer({ title, value, type, limit = 6, add = false }) {
    const auth = useContext(LoginContext);
    const spotifyToken = useContext(TokenContext);
    const { currentTrack } = useContext(TrackContext);
    const updatePlayer = useContext(PlayContext);
    const setFlash = useContext(StatusContext);

    const [resultItems, setResultItems] = useState([]);
    const [searchFrameWrapper, dimensions] = useDimesions();

    // play specific track
    const playTrack = (uri, track_uri) => {
        const body = {
            context_uri: uri,
            offset: { uri: track_uri }
        }
        const url = `https://api.spotify.com/v1/me/player/${currentTrack.play && currentTrack.uri === track_uri ? `pause` : `play`}`
        const requestFunc = updateWithToken(url, spotifyToken, body);

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

    // save track to this specific playlist
    function handleAddition(track_uri) {
        let _track = track_uri.replaceAll(":", "%3A");
        async function addTrack() {
            try {
                const request = postWithToken(`https://api.spotify.com/v1/playlists/${typeof window !== 'undefined' && window.location.pathname.split('/')[2]}/tracks?uris=${_track}`, spotifyToken);
                const response = await request();
                if (response.status === 201) {
                    setTimeout(() => {
                        typeof window !== 'undefined' && window.location.reload();
                    }, 1000)
                }
            } catch (error) {
                console.log(error);
            }
        }

        addTrack();
    };

    useEffect(() => {
        let inputValue = typeof value !== 'undefined' && value.toLowerCase();
        const cancelSource = axios.CancelToken.source();
        // get result with the input value typed
        if (auth) {
            async function getResults() {
                const requestResult = getWithToken(`https://api.spotify.com/v1/search?q=${inputValue}&type=${type}&limit=${limit}`, spotifyToken, cancelSource);
                try {
                    const response = await requestResult();
                    if (typeof response !== 'undefined' && response.status === 200) {
                        if (type === "track") {
                            let { tracks: { items } } = response.data;
                            setResultItems(items.map(item => ({ artists: item.artists.map(item => item.name), uri: item.album.uri, cover: item.album.images[0].url, track_uri: item.uri, duration: item.duration_ms, name: item.name })));
                        } else {
                            // result contains different keys like artist, playlist etc
                            const key = Object.keys(response.data)[0]
                            const result = response.data[key].items;

                            setResultItems(result.map(item => ({
                                name: item.name,
                                id: item.id,
                                type: item.type,
                                cover: item.images[0] && item.images[0].url,
                                description: item.description ? item.description : '',
                                uri: item.uri,
                                artists: item.artists ? item.artists.map(artist => artist.name) : [],
                            })))
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            if (inputValue.length > 0) {
                getResults();
            }
        }

        return _ => cancelSource.cancel();
    }, [auth, spotifyToken, limit, type, value]);

    return (
        <Container>
            {resultItems.length !== 0 && <h1>{title}</h1>}
            {type === "track" ? (
                <div className="type_grid">
                    {resultItems.map((item, index) => (
                        <div className="grid" key={`${item.track_uri}-${index}`}>
                            <div className="meta">
                                <div className="cover">
                                    <img src={item.cover} alt={`${item.name}-jpg`} />
                                    <div className="start_listening">
                                        <button onClick={() => playTrack(item.uri, item.track_uri)}>{currentTrack.play === true && currentTrack.uri === item.track_uri ? <PauseIcon /> : <PlayIcon />}</button>
                                    </div>
                                </div>
                                <div className="dets">
                                    <h3>{item.name}</h3>
                                    <span>{item.artists.map(item => item).join(', ')}</span>
                                </div>
                            </div>
                            {add ? (
                                <div className="add_to_playlist">
                                    <button onClick={() => handleAddition(item.track_uri)}>
                                        ADD
                                    </button>
                                </div>
                            ) : (
                                <div className="duration">
                                    {minutesAndSeconds(item.duration)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="type_row">
                    <FrameWrapper ref={searchFrameWrapper} style={{ marginTop: "12px", gridTemplateColumns: dimensions.width < 1206 ? `repeat(${Math.ceil(dimensions.width / 220)}, minmax(0, 1fr)` : `repeat(6, minmax(0, 1fr)` }}>
                        {resultItems.map(item => (
                            <Frame
                                key={`library-artists-${item.id}`}
                                type={item.type}
                                id={item.id}
                                cover={typeof item.cover !== 'undefined' ? item.cover : resultItems[0].cover}
                                name={item.name}
                                uri={item.uri}
                                description={type === 'artist' ? 'Artist' : type === 'playlist' ? item.description : item.artists.map(item => item).join(', ')}
                            />
                        ))}
                    </FrameWrapper>
                </div>
            )}
        </Container>
    )
}
