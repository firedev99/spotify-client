import React, { useContext, useEffect, useState } from 'react'
// components
import StretchFrame from '../../components/props/stretchFrame'
import CategoryContainer from '../../components/props/categoryContainer'
import Frame from '../../components/props/frame'
// context
import { LoginContext, PlaylistContext, TokenContext, UserContext } from "../../utils/context"
// utils 
import reqWithToken from '../../utils/reqWithToken'
import getLocale from '../../utils/getLocale'
// styled-components
import { Wrapper, Container, Top, TopInner, RecommendedSection } from "./styles/homeStyles"
import { useDimesions } from "../../hooks/useDimesions"

export default function HomePage() {
    const spotifyToken = useContext(TokenContext);
    const user = useContext(UserContext);
    const { items } = useContext(PlaylistContext);
    const auth = useContext(LoginContext);
    const [locale, country] = getLocale();
    const [categories, setCategories] = useState([]);
    const { items: categoryItems } = categories;

    const [topRef, dimensions] = useDimesions();
    console.log(dimensions);
    useEffect(() => {
        if (auth) {
            const getBrowserCategories = async () => {
                const featuredCategories = reqWithToken(`https://api.spotify.com/v1/browse/categories?country=${country}&locale=${locale}&limit=10`, spotifyToken);
                try {
                    const { data: { categories } } = await featuredCategories();
                    setCategories(categories);
                } catch (error) {
                    console.log(error)
                }
            }

            getBrowserCategories();
        }
    }, [auth, spotifyToken, locale, country])

    return (
        <Wrapper>
            <Container>
                <Top>
                    {auth ? (
                        <>
                            <h3>Good evening</h3>
                            <TopInner ref={topRef} style={{ gridTemplateColumns: dimensions.width < 1206 ? `repeat(${Math.ceil(dimensions.width / 300)}, minmax(0, 1fr)` : `repeat(4, minmax(0, 1fr)` }}>
                                {items && items.filter((item, index) => (dimensions.width < 1206 ? (index < Math.ceil(dimensions.width / 300)) : (index < 4))).map((item, index) => (
                                    <StretchFrame key={`my-playlist-${index}`} items={item} />
                                ))}
                                {categoryItems && categoryItems.filter((item, index) => (dimensions.width < 1206 ? (index < Math.ceil(dimensions.width / 300)) : (index < 4))).map((item, index) => (
                                    <StretchFrame key={`featured-categories-${index}`} items={item} />
                                ))}
                            </TopInner>
                        </>
                    ) : (
                        <CategoryContainer>
                            <Frame>
                                Hello
                            </Frame>
                        </CategoryContainer>
                    )}
                </Top>
                <RecommendedSection>
                    {categoryItems && categoryItems.slice(3).map(({ id, name, ...item }, index) => (
                        <CategoryContainer key={`recommended-categories-${id}`} title={index === 0 ? `Made for ${user && user.display_name}` : name} item={item} id={id} country={country} />
                    ))}
                </RecommendedSection>
            </Container>
        </Wrapper>
    )
}
