import React, { useContext, useEffect, useState } from 'react'
// icons
import { PauseIcon, PlayIcon } from '../../helpers/icons'
// context
import { LoginContext, PlayContext, TokenContext, TrackContext } from '../../utils/context'
// utils
import reqWithToken from '../../utils/reqWithToken'
import updateWithToken from '../../utils/updateWithToken'
import { minutesAndSeconds } from "../../utils/getTime"
// styled-components
import { Container, FrameWrapper } from './styles/resultStyles'
import Frame from './frame'
import { useDimesions } from '../../hooks/useDimesions'

export default function ResultContainer({ title, value, type, limit = 6 }) {
    const auth = useContext(LoginContext);
    const spotifyToken = useContext(TokenContext);
    const { currentTrack } = useContext(TrackContext);
    const updatePlayer = useContext(PlayContext);

    const [resultItems, setResultItems] = useState([]);

    const [searchFrameWrapper, dimensions] = useDimesions();
    useEffect(() => {
        let inputValue = typeof value !== 'undefined' && value.toLowerCase();
        if (auth && title) {
            const requestResult = reqWithToken(`https://api.spotify.com/v1/search?q=${inputValue}&type=${type}&limit=${limit}`, spotifyToken)
            async function getResults() {
                try {
                    const response = await requestResult();
                    if (type === "track") {
                        let { tracks: { items } } = response.data;
                        setResultItems(items.map(item => ({ artists: item.artists.map(item => item.name), uri: item.album.uri, cover: item.album.images[0].url, track_uri: item.uri, duration: item.duration_ms, name: item.name })));
                    } else {
                        const key = Object.keys(response.data)[0]
                        const result = response.data[key].items;
                        setResultItems(result.map(item => ({
                            name: item.name,
                            id: item.id,
                            type: item.type,
                            cover: item.images[0].url,
                            description: item.description ? item.description : '',
                            uri: item.uri,
                            artists: item.artists ? item.artists.map(artist => artist.name) : [],
                        })))
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            if (inputValue.length > 0) {
                getResults();
            }
        }
    }, [auth, spotifyToken, limit, type, value, title]);

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
                console.log('Something happend.');
            }
        };
        requestMusic();
    };

    return (
        <Container>
            <h1>{title}</h1>
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
                            <div className="duration">
                                {minutesAndSeconds(item.duration)}
                            </div>
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
                                cover={item.cover}
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
