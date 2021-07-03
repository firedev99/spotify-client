import React, { useContext, useEffect, useState } from 'react'
// components
import Header from "../../components/header"
import StretchFrame from '../../components/props/stretchFrame'
import CategoryContainer from '../../components/props/categoryContainer'
import Frame from '../../components/props/frame'
// hooks
import { useDimesions } from "../../hooks/useDimesions"
// context
import { LoginContext, PlaylistContext, TokenContext, UserContext } from "../../utils/context"
// utils 
import reqWithToken from '../../utils/reqWithToken'
import getLocale from '../../utils/getLocale'
// styled-components
import { Wrapper, Container, Top, TopInner, RecommendedSection } from "./styles/homeStyles"

export default function HomePage() {
    const spotifyToken = useContext(TokenContext);
    const user = useContext(UserContext);
    const { items } = useContext(PlaylistContext);
    const auth = useContext(LoginContext);
    const [locale, country] = getLocale();

    const [categories, setCategories] = useState([]);
    const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

    const { items: categoryItems } = categories;
    const { items: playlistItems } = featuredPlaylists;

    const [topRef, dimensions] = useDimesions();

    useEffect(() => {
        if (auth) {
            const getBrowserCategories = async () => {
                const featuredCategories = reqWithToken(`https://api.spotify.com/v1/browse/categories?country=${country}&locale=${locale}&limit=15`, spotifyToken);
                const featuringPlaylists = reqWithToken(`https://api.spotify.com/v1/browse/featured-playlists?country=${country}&locale=${locale}&limit=4`, spotifyToken);

                try {
                    const [_featuredCategories, _featuringPlaylists] = await Promise.all([featuredCategories(), featuringPlaylists()]);

                    setCategories(_featuredCategories.data.categories);
                    setFeaturedPlaylists(_featuringPlaylists.data.playlists)
                } catch (error) {
                    console.log(error)
                }
            }

            getBrowserCategories();
        }
    }, [auth, spotifyToken, locale, country])
    return (
        <Wrapper>
            <Header position="absolute" />
            <Container>
                <Top ref={topRef}>
                    {auth ? (
                        <>
                            <h3>Good evening</h3>
                            <TopInner style={{ gridTemplateColumns: dimensions.width < 1112 ? `repeat(${Math.ceil(dimensions.width / 392)}, minmax(0, 1fr)` : `repeat(4, minmax(0, 1fr)` }}>
                                {items && items.filter((item, index) => (dimensions.width < 1112 ? (index < Math.ceil(dimensions.width / 392)) : (index < 4))).map((item, index) => (
                                    <StretchFrame key={`my-playlist-${index}`} items={item} />
                                ))}
                                {playlistItems && playlistItems.filter((item, index) => (dimensions.width < 1112 ? (index < Math.ceil(dimensions.width / 392)) : (index < 4))).map((item, index) => (
                                    <StretchFrame key={`featured-categories-${index}`} items={item} />
                                ))}
                            </TopInner>
                        </>
                    ) : (
                        <CategoryContainer>
                            <Frame style={{ height: '242px' }}>
                                Hello
                            </Frame>
                        </CategoryContainer>
                    )}
                </Top>
                <RecommendedSection>
                    {categoryItems && categoryItems.map(({ id, name, ...item }, index) => (
                        <CategoryContainer key={`recommended-categories-${id}`} title={index === 0 ? `Made for ${user && user.display_name}` : name} item={item} id={id} country={country} />
                    ))}
                </RecommendedSection>
            </Container>
        </Wrapper>
    )
}
