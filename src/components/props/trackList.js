import React from 'react'
// util
import { minutesAndSeconds } from "../../utils/getTime"
import { Wrapper } from './styles/trackListStyles'
// icons
import { ClockIcon, PlayIcon } from '../../helpers/icons'
// hooks

export default function TrackList({ songs }) {

    return (
        <Wrapper>
            <ol>
                <li>
                    <span>#</span>
                    <span>Title</span>
                    <span>Album</span>
                    <span className="duration">
                        <ClockIcon />
                    </span>
                </li>
                {songs && songs.map((items, index) => (
                    <li key={`${items.name}-${index}-track`}>
                        <div className="index">
                            <span className="index_id">{index + 1}</span>
                            <span className={`icon ${index < 9 ? `icon_single` : `icon_double`}`}><PlayIcon /></span>
                        </div>
                        <div className="image">
                            <img src={items.album && items.album.images[0].url} alt={`${items.album.name}track-${index}`} loading="lazy" />
                            <span className="name">{items.name}</span>
                        </div>
                        <span className="album_name">{items.album.name}</span>
                        <span className="duration">{minutesAndSeconds(items.duration_ms)}</span>
                    </li>
                ))}
            </ol>
        </Wrapper>
    )
}
