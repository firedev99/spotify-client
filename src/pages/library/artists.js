import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
// components
import Frame from '../../components/props/frame'
import Header from '../../components/header'
import LibraryNavbar from './components/navbar'
import SpotifyLoader from '../../components/props/loader'
// utils
import getWithToken from '../../utils/getWithToken'
import { LoginContext, TokenContext } from '../../utils/context'
// hooks
import { useDimesions } from '../../hooks/useDimesions'
// styled components
import { Wrapper, Container, FrameWrapper } from "./styles/collectionStyles"

export default function CollectionArtists() {
    const spotifyToken = useContext(TokenContext);
    const auth = useContext(LoginContext);

    const [followingArtists, setFollowingArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    const [artistsWrapper, dimensions] = useDimesions();

    useEffect(() => {
        const cancelSource = axios.CancelToken.source();
        // get artist playlists from library
        if (auth) {
            async function getFollowingArtists() {
                const requestArtistList = getWithToken(`https://api.spotify.com/v1/me/following?type=artist`, spotifyToken, cancelSource);
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
                        setLoading(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            getFollowingArtists();
        } else {
            setLoading(false);
        }

        return _ => cancelSource.cancel();
    }, [auth, spotifyToken])

    return loading ? <SpotifyLoader /> : (
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
                    )) : (<h4>You're not following any artist yet, start listening to your fav ones soon.</h4>)}
                </FrameWrapper>
            </Container>
        </Wrapper>
    )
}
