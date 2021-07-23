import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
// components
import Header from '../../components/header'
import PageBanner from '../../components/props/pageBanner'
import TrackList from '../../components/props/trackList'
import SpotifyLoader from '../../components/props/loader'
// utils
import randomColor from "../../utils/randomColor"
import getWithToken from '../../utils/getWithToken'
import { TokenContext, LoginContext, UserContext, StatusContext } from '../../utils/context'
// styled-components
import { Wrapper } from "./styles/trackStyles"

export default function CollectionTracks() {
    const auth = useContext(LoginContext);
    const spotifyToken = useContext(TokenContext);
    const user = useContext(UserContext);
    const setFlash = useContext(StatusContext);

    const [bgColor, setBgColor] = useState('');
    const [songs, setSongs] = useState([]);
    const [totalSongs, setTotalSongs] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cancelSource = axios.CancelToken.source();
        // get tracks from library or get saved tracks
        if (auth) {
            async function getSavedTracks() {
                const getTracks = getWithToken('https://api.spotify.com/v1/me/tracks?limit=50', spotifyToken, cancelSource);
                try {
                    const response = await getTracks();

                    if (typeof response !== 'undefined') {
                        if (response.status === 200) {
                            let { items, total } = response.data;
                            setTotalSongs(total);
                            setSongs(items.map(item => ({
                                track_name: item.track.name,
                                track_image: item.track.album.images[0].url,
                                duration: item.track.duration_ms,
                                uri: item.track.uri,
                                album_uri: item.track.album.uri,
                                artists: item.track.artists.map(item => item.name)
                            })))
                            setLoading(false);
                        } else {
                            setFlash('Opps, something went wrong!');
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            getSavedTracks();
        }

        return _ => cancelSource.cancel();
    }, [spotifyToken, auth, setFlash]);

    useEffect(() => {
        // set a random linear background color
        setBgColor(randomColor());
    }, [])

    return loading ? <SpotifyLoader /> : (
        <Wrapper>
            <Header bg={bgColor} />
            <PageBanner
                bg={bgColor}
                songs={totalSongs}
                title="Liked Songs"
                owner={typeof user !== 'undefined' && user.display_name}
                image={'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'}
                disabled={true}
            >
                <TrackList songs={songs} />
            </PageBanner>
        </Wrapper>
    )
}
