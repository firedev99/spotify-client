import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
// components
import Header from "../../components/header"
import StretchFrame from '../../components/props/stretchFrame'
import CategoryContainer from '../../components/props/categoryContainer'
import Frame from '../../components/props/frame'
import SpotifyLoader from "../../components/props/loader"
// hooks
import { useDimesions } from "../../hooks/useDimesions"
// utils 
import { LoginContext, PlaylistContext, TokenContext, UserContext } from "../../utils/context"
import getWithToken from '../../utils/getWithToken'
import getLocale from '../../utils/getLocale'
// styled-components
import { Wrapper, Container, Top, TopInner, RecommendedSection } from "./styles/homeStyles"

export default function HomePage() {
    const spotifyToken = useContext(TokenContext);
    const user = useContext(UserContext);
    const { items } = useContext(PlaylistContext);
    const auth = useContext(LoginContext);
    const [locale, country] = getLocale();

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

    const { items: categoryItems } = categories;
    const { items: playlistItems } = featuredPlaylists;

    const [topRef, dimensions] = useDimesions();

    useEffect(() => {
        const cancelSource = axios.CancelToken.source();
        if (auth) {
            async function getBrowserCategories() {
                const featuredCategories = getWithToken(`https://api.spotify.com/v1/browse/categories?country=${country}&locale=${locale}&limit=15`, spotifyToken, cancelSource);
                const featuringPlaylists = getWithToken(`https://api.spotify.com/v1/browse/featured-playlists?country=${country}&locale=${locale}&limit=4`, spotifyToken, cancelSource);
                try {
                    const [_featuredCategories, _featuringPlaylists] = await Promise.all([featuredCategories(), featuringPlaylists()]);
                    setCategories(_featuredCategories.data.categories);
                    setFeaturedPlaylists(_featuringPlaylists.data.playlists);
                    setLoading(false);
                } catch (error) {
                    console.error(error);
                }
            }
            getBrowserCategories();
        } else {
            setLoading(false);
        }

        return _ => cancelSource.cancel();
    }, [auth, spotifyToken, locale, country]);
    return loading ? <SpotifyLoader /> : (
        <Wrapper>
            <Header position="absolute" />
            <Container>
                <Top ref={topRef}>
                    {auth ? (
                        <>
                            <h3>Good evening</h3>
                            <TopInner style={{ gridTemplateColumns: dimensions.width < 1112 ? `repeat(${Math.ceil(dimensions.width / 392)}, minmax(0, 1fr)` : `repeat(4, minmax(0, 1fr)` }}>
                                {items && typeof items !== 'undefined' && items.filter((item, index) => (dimensions.width < 1112 ? (index < Math.ceil(dimensions.width / 392)) : (index < 4))).map((item, index) => (
                                    <StretchFrame key={`my-playlist-${index}`} items={item} />
                                ))}
                                {playlistItems && typeof playlistItems !== 'undefined' && playlistItems.filter((item, index) => (dimensions.width < 1112 ? (index < Math.ceil(dimensions.width / 392)) : (index < 4))).map((item, index) => (
                                    <StretchFrame key={`featured-categories-${index}`} items={item} />
                                ))}
                            </TopInner>
                        </>
                    ) : (
                        <CategoryContainer>
                            <Frame style={{ height: '242px', width: '200px' }}>
                                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png' alt='browser_liked' />
                            </Frame>
                        </CategoryContainer>
                    )}
                </Top>
                <RecommendedSection>
                    {categoryItems && typeof categoryItems !== 'undefined' && categoryItems.map(({ id, name }, index) => (
                        <CategoryContainer
                            key={`recommended-categories-${id}`}
                            title={index === 0 ? `Made for ${user && user.display_name}` : name}
                            id={id}
                        />
                    ))}
                </RecommendedSection>
            </Container>
        </Wrapper>
    )
}
