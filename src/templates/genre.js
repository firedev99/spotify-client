import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
// components
import Header from "../components/header"
import Frame from '../components/props/frame'
import PageBanner from '../components/props/pageBanner'
import SpotifyLoader from '../components/props/loader'
// hooks
import { useDimesions } from '../hooks/useDimesions'
// utils
import { LoginContext, TokenContext } from '../utils/context'
import randomColor from "../utils/randomColor"
import getWithToken from '../utils/getWithToken'
// styled-components
import { Wrapper, GenreTempWrapper } from "./styles/artistStyles"
import { GenreWrapper } from '../pages/search/styles/searchStyles'

export default function GenreTemplate({ match }) {
    const { params: { id } } = match;

    const auth = useContext(LoginContext);
    const spotifyToken = useContext(TokenContext);

    const [bgColor, setBgColor] = useState('');
    const [loading, setLoading] = useState(true);
    const [browsingPlaylist, setBrowsingPlaylist] = useState([]);

    const [genreWrapperRef, dimension] = useDimesions();

    useEffect(() => {
        setBgColor(randomColor());
    }, [])

    useEffect(() => {
        const cancelSource = axios.CancelToken.source();
        // get items of a specific genre
        if (auth) {
            async function getGenre() {
                const request = getWithToken(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, spotifyToken, cancelSource);
                try {
                    const response = await request();
                    if (response.status === 200) {
                        let { playlists: { items } } = response.data;
                        setBrowsingPlaylist(items.map(item => ({
                            type: item.type,
                            id: item.id,
                            name: item.name,
                            uri: item.uri,
                            description: item.description,
                            cover: item.images[0].url
                        })));
                        setLoading(false);
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            getGenre();
        }

        return () => cancelSource.cancel();
    }, [auth, spotifyToken, id])

    return loading ? <SpotifyLoader /> : (
        <Wrapper>
            <Header bg={bgColor} />
            <PageBanner
                bg={bgColor}
                disabled={true}
                owner="Spotify"
                type="genre"
                title={`${id.charAt(0).toUpperCase()}${id.substring(1)}`}
            >
                <GenreTempWrapper>
                    <GenreWrapper ref={genreWrapperRef} style={{ marginTop: '-112px', gridTemplateColumns: dimension.width < 1206 ? `repeat(${Math.ceil(dimension.width / 220)}, minmax(0, 1fr)` : `repeat(6, minmax(0, 1fr)` }}>
                        {browsingPlaylist && browsingPlaylist.map((item, index) => (
                            <Frame
                                key={`browsing-playlist-${item.id}`}
                                name={item.name}
                                description={item.description}
                                type={item.type}
                                cover={item.cover}
                                id={item.id}
                                uri={item.uri}
                            />
                        ))}
                    </GenreWrapper>
                </GenreTempWrapper>
            </PageBanner>
        </Wrapper >
    )
}
