import React from 'react'
import { NavLink } from "react-router-dom"
// icons
import { HeartOutlineIcon } from "../../helpers/icons"
// styled-components
import { Wrapper, SongPoster, SongMeta, LikeButton } from "./styles/statusStyles"

export default function SongStatus() {
    return (
        <Wrapper>
            <SongPoster />
            <SongMeta>
                <div className="song_info">
                    <NavLink to="/">Dhaga</NavLink>
                </div>
                <div className="artist_info">
                    <NavLink to="/">Nitolpal Bora</NavLink>
                </div>
            </SongMeta>
            <LikeButton>
                <button>
                    <HeartOutlineIcon />
                </button>
            </LikeButton>
        </Wrapper>
    )
}
