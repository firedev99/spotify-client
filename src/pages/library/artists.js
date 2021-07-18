import React, { useContext, useEffect, useState } from 'react'
// components
import Frame from '../../components/props/frame'
import Header from '../../components/header'
import LibraryNavbar from './components/navbar'
// utils
import { useDimesions } from '../../hooks/useDimesions'
// styled components
import { Wrapper, Container, FrameWrapper } from "./styles/collectionStyles"
import reqWithToken from '../../utils/reqWithToken'
import { LoginContext, TokenContext } from '../../utils/context'

export default function CollectionArtists() {
    const spotifyToken = useContext(TokenContext);
    const auth = useContext(LoginContext);

    const [followingArtists, setFollowingArtists] = useState([]);

    const [artistsWrapper, dimensions] = useDimesions();

    useEffect(() => {
        if (auth) {
            const requestArtistList = reqWithToken(`https://api.spotify.com/v1/me/following?type=artist`, spotifyToken);
            async function getFollowingArtists() {
                try {
                    const response = await requestArtistList();
                    if (response.status === 200) {
                        let { artists } = response.data;
                        setFollowingArtists(artists.items.map(artist => ({
                            name: artist.name,
                            type: artist.type,
                            id: artist.id,
                            cover: artist.images[0].url,
                            uri: artist.uri
                        })));
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            getFollowingArtists();
        }
    }, [auth, spotifyToken])

    return (
        <Wrapper>
            <Header />
            <Container>
                <LibraryNavbar />
                <h3>Artists</h3>
                <FrameWrapper ref={artistsWrapper} style={{ marginTop: "12px", gridTemplateColumns: dimensions.width < 1206 ? `repeat(${Math.ceil(dimensions.width / 220)}, minmax(0, 1fr)` : `repeat(6, minmax(0, 1fr)` }}>
                    {followingArtists.length !== 0 ? followingArtists.map(artist => (
                        <Frame
                            key={`library-artists-${artist.id}`}
                            type={artist.type}
                            id={artist.id}
                            cover={artist.cover}
                            name={artist.name}
                            uri={artist.uri}
                            description='Artist'
                        />
                    )) : (<h3>You're not following any artist yet, start listening to your fav ones soon.</h3>)}
                </FrameWrapper>
            </Container>
        </Wrapper>
    )
}
