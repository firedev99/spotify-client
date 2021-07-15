import React from 'react'
import { NavLink } from 'react-router-dom'
// styled-components
import { LibraryNav } from "../styles/collectionStyles"

export default function LibraryNavbar() {
    return (
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
    )
}
