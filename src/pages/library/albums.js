import React, { useContext, useState, useEffect } from 'react'
// components
import Frame from '../../components/props/frame'
import Header from '../../components/header'
import LibraryNavbar from './components/navbar'
// utils
import reqWithToken from '../../utils/reqWithToken'
// hooks
import { useDimesions } from '../../hooks/useDimesions'
// styled components
import { Wrapper, Container, FrameWrapper } from "./styles/collectionStyles"
import { LoginContext, TokenContext } from '../../utils/context'

export default function CollectionArtists() {
    const auth = useContext(LoginContext);
    const spotifyToken = useContext(TokenContext);

    const [savedAlbums, setSavedAlbums] = useState([]);
    const [albumsWrapper, dimensions] = useDimesions();
    // console.log(savedAlbums);

    useEffect(() => {
        if (auth) {
            const requestSavedAlbums = reqWithToken(`https://api.spotify.com/v1/me/albums`, spotifyToken);
            async function getSavedAlbums() {
                try {
                    const response = await requestSavedAlbums();
                    if (response.status === 200) {
                        let { items } = response.data;
                        console.log(items)
                        setSavedAlbums(items.map(item => ({
                            name: item.album.name,
                            cover: item.album.images[0].url,
                            id: item.album.id,
                            uri: item.album.uri,
                            type: item.album.type,
                            description: item.album.artists.map(artist => artist.name)
                        })))
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            getSavedAlbums();
        }
    }, [auth, spotifyToken])

    return (
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
                        />
                    )) : (<h3>You're haven't liked any albums yet, start listening to your fav ones soon.</h3>)}
                </FrameWrapper>
            </Container>
        </Wrapper>
    )
}
