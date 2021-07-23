import React, { useContext, useState } from 'react'
import { Link, NavLink } from "react-router-dom"
// components
import EditUi from '../props/editUi'
// utils
import { LoginContext, PlaylistContext } from '../../utils/context'
// icons
import { Logo, HomeIcon, SearchIcon, CollectionIcon, PlusIcon, HeartIcon } from '../../helpers/icons'
// styled-components
import { Wrapper, Container, Banner, NavItems, NavRoot, ClientInfo, CreatePlaylist, LikedSongs, SpotifyApp, UserPlaylists } from "./styles/sidebarStyles"

export default function Sidebar() {
    const auth = useContext(LoginContext);
    const { items } = useContext(PlaylistContext);

    const [toggle, setToggle] = useState(false);

    return (
        <Wrapper>
            {toggle && <EditUi toggle={toggle} setToggle={setToggle} />}
            <Container>
                <Banner>
                    <Link draggable="false" to="/">
                        <Logo />
                    </Link>
                </Banner>
                <NavItems>
                    <li>
                        <NavLink draggable="false" to="/" exact={true} activeClassName="active">
                            <div className="nav_items">
                                <HomeIcon />
                                <span>Home</span>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink draggable="false" to="/search" activeClassName="active">
                            <div className="nav_items">
                                <SearchIcon />
                                <span>Search</span>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink draggable="false" to="/collection/playlists" activeClassName="active">
                            <div className="nav_items">
                                <CollectionIcon />
                                <span>Your Library</span>
                            </div>
                        </NavLink>
                    </li>
                </NavItems>
                <NavRoot>
                    <CreatePlaylist>
                        <button onClick={auth ? () => setToggle(true) : null}>
                            <div className="rect">
                                <PlusIcon />
                            </div>
                            <span>Create Playlist</span>
                        </button>
                    </CreatePlaylist>
                    <LikedSongs>
                        <button>
                            <NavLink activeClassName="active" to='/collection/tracks'>
                                <div className="rect">
                                    <HeartIcon />
                                </div>
                                <span>Liked Songs</span>
                            </NavLink>
                        </button>
                    </LikedSongs>
                    {auth && (
                        <div className="playlist">
                            <UserPlaylists>
                                {items && items.map(({ name, id }, index) => (
                                    <div key={`playlist-${index}`} className="spread">
                                        <NavLink draggable="false" to={`/playlist/${id}`} activeClassName="active"><span>{name}</span></NavLink>
                                    </div>
                                ))}
                            </UserPlaylists>
                            <SpotifyApp>
                                <a draggable="false" target="_blank" rel="noreferrer noopener" href="https://open.spotify.com/download"><svg role="img" height="24" width="24" viewBox="0 0 24 24"><path d="M11.5 0C5.149 0 0 5.148 0 11.5 0 17.851 5.149 23 11.5 23S23 17.851 23 11.5C23 5.148 17.851 0 11.5 0zm0 22C5.71 22 1 17.29 1 11.5S5.71 1 11.5 1 22 5.71 22 11.5 17.29 22 11.5 22zm.499-6.842V5h-1v10.149l-3.418-3.975-.758.652 4.678 5.44 4.694-5.439-.757-.653-3.439 3.984z"></path></svg><span>Install App</span></a>
                            </SpotifyApp>
                        </div>
                    )}
                </NavRoot>
                {!auth && (
                    <ClientInfo>
                        <a draggable="false" href="https://www.spotify.com/legal/cookies-policy/" target="_blank" rel="noreferrer noopener">Cookies</a>
                        <a draggable="false" href="https://www.spotify.com/legal/privacy-policy/" target="_blank" rel="noreferrer noopener">Privacy</a>
                    </ClientInfo>
                )}
            </Container>
        </Wrapper>
    )
}
