import React, { useContext, useEffect, useState } from 'react'
// components
import Frame from './frame'
// context
import { LoginContext, TokenContext } from '../../utils/context'
// utils
import reqWithToken from '../../utils/reqWithToken'
// hooks
import { useDimesions } from "../../hooks/useDimesions"
// styled-components
import { Container, SectionWrapper } from './styles/categoryContainerStyles'

export default function CategoryContainer({ title = "FireyBoi", tag, id, country = "US", children }) {
    const auth = useContext(LoginContext);
    const spotifyToken = useContext(TokenContext);
    const [playlists, setPlaylists] = useState([]);
    const { items: tracks } = playlists;

    const [sectionsRef, dimensions] = useDimesions();

    useEffect(() => {
        if (auth) {
            const getPlaylists = async () => {
                const categoryPlaylists = reqWithToken(`https://api.spotify.com/v1/browse/categories/${id}/playlists?country=${country}&limit=8`, spotifyToken);
                try {
                    const { data: { playlists } } = await categoryPlaylists();
                    setPlaylists(playlists);
                } catch (error) {
                    console.log(error)
                }
            }

            getPlaylists();
        }

    }, [auth, spotifyToken, id, country])

    return children ? (
        <Container>
            <SectionWrapper style={{ marginTop: "2px" }}>
                {children}
            </SectionWrapper>
        </Container>
    ) : (
        <Container>
            <h3>{title}</h3>
            {tag && <p>{tag}</p>}
            {auth && (
                <SectionWrapper ref={sectionsRef} style={{ marginTop: "12px", gridTemplateColumns: dimensions.width < 1206 ? `repeat(${Math.ceil(dimensions.width / 220)}, minmax(0, 1fr)` : `repeat(6, minmax(0, 1fr)` }}>
                    {tracks && tracks.filter((playlist, index) => (dimensions.width < 1206 ? (index < Math.ceil(dimensions.width / 220)) : (index < 6))).map((playlist, index) => (
                        <Frame items={playlist} key={`playlist-${playlist.id}`} />
                    ))}
                </SectionWrapper>
            )}
        </Container>
    )
}