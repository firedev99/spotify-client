import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
// components
import Frame from '../../components/props/frame'
import Header from '../../components/header'
import LibraryNavbar from './components/navbar'
import SpotifyLoader from '../../components/props/loader'
// utils
import { LoginContext, TokenContext } from '../../utils/context'
import getWithToken from '../../utils/getWithToken'
// hooks
import { useDimesions } from '../../hooks/useDimesions'
// styled components
import { Wrapper, Container, FrameWrapper } from "./styles/collectionStyles"

export default function CollectionArtists() {
    const auth = useContext(LoginContext);
    const spotifyToken = useContext(TokenContext);

    const [savedAlbums, setSavedAlbums] = useState([]);
    const [albumsWrapper, dimensions] = useDimesions();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        // get albums from library
        if (auth) {
            async function getSavedAlbums() {
                const requestSavedAlbums = getWithToken(`https://api.spotify.com/v1/me/albums`, spotifyToken, cancelToken);
                try {
                    const response = await requestSavedAlbums();
                    if (response.status === 200) {
                        let { items } = response.data;
                        setSavedAlbums(items.map(item => ({
                            name: item.album.name,
                            cover: item.album.images[0].url,
                            id: item.album.id,
                            uri: item.album.uri,
                            type: item.album.type,
                            description: item.album.artists.map(artist => artist.name)
                        })))
                        setLoading(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            getSavedAlbums();
        } else {
            setLoading(false);
        }

        return _ => cancelToken.cancel();
    }, [auth, spotifyToken])

    return loading ? <SpotifyLoader /> : (
        <Wrapper>
            <Header />
            <Container>
                <LibraryNavbar />
                <h3>Albums</h3>
                <FrameWrapper ref={albumsWrapper} style={{ marginTop: "12px", gridTemplateColumns: dimensions.width < 1206 ? `repeat(${Math.ceil(dimensions.width / 220)}, minmax(0, 1fr)` : `repeat(6, minmax(0, 1fr)` }}>
                    {savedAlbums.length !== 0 ? savedAlbums.map(album => (
                        <Frame
                            key={`library-albums-${album.id}`}
                            type={album.type}
                            id={album.id}
                            cover={album.cover}
                            name={album.name}
                            description={(album.description).join(", ")}
                            uri={album.uri}
                        />
                    )) : (<h4>You haven't liked any albums yet, start listening to your fav ones soon.</h4>)}
                </FrameWrapper>
            </Container>
        </Wrapper>
    )
}
