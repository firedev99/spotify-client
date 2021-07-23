import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
// components
import Frame from '../../components/props/frame'
import Header from '../../components/header'
// utils
import { PlaylistContext } from '../../utils/context'
// hooks
import { useDimesions } from '../../hooks/useDimesions'
// styled components
import { Wrapper, Container, FrameWrapper, LibraryNav } from "./styles/collectionStyles"
import SpotifyLoader from '../../components/props/loader'

export default function CollectionPlaylists() {
    const { items } = useContext(PlaylistContext);
    const [playlistsRef, dimensions] = useDimesions();

    return typeof items === "undefined" ? <SpotifyLoader /> : (
        <Wrapper>
            <Header />
            <Container>
                <LibraryNav>
                    <NavLink to="/collection/playlists" activeClassName="active">
                        Playlists
                    </NavLink>
                    <NavLink to="/collection/artists" activeClassName="active">
                        Artists
                    </NavLink>
                    <NavLink to="/collection/albums" activeClassName="active">
                        Albums
                    </NavLink>
                </LibraryNav>
                <h3>Playlists</h3>
                <FrameWrapper ref={playlistsRef} style={{ marginTop: "12px", gridTemplateColumns: dimensions.width < 1206 ? `repeat(${Math.ceil(dimensions.width / 220)}, minmax(0, 1fr)` : `repeat(6, minmax(0, 1fr)` }}>
                    {items && items !== undefined && items.map((playlist, index) => (
                        <Frame
                            key={`library-playlist-${playlist.id}`}
                            type="playlist"
                            id={playlist.id}
                            cover={playlist.images[0]?.url}
                            name={playlist.name}
                            description={playlist.description ? playlist.description : `by ${playlist.owner.display_name}`}
                            uri={playlist.uri}
                        />
                    ))}
                </FrameWrapper>
            </Container>
        </Wrapper>
    )
}
