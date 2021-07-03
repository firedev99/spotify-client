import React from 'react';
// utils
import { msToTime } from '../../utils/getTime'
// icons
import { PlayIcon, HeartOutlineIcon } from '../../helpers/icons'
import { Wrapper, Container, Poster, PageMeta, Overlay, Functionality } from "./styles/bannerStyles"


export default function PageBanner({ infos, image, title, type, description, owner, songs, duration, children, bg }) {
    const { minutes, seconds, hours } = msToTime(duration);
    return (
        <Wrapper>
            <Container style={{ background: `${bg}` }}>
                <Poster>
                    <img src={image} loading="eager" alt="" />
                </Poster>
                <PageMeta>
                    <span className="type">playlist</span>
                    <h2 style={{ fontSize: title && title.length > 18 ? `46px` : `96px`, lineHeight: title && title.length > 18 ? `64px` : `88px` }}>{title}</h2>
                    <span className="description">{description}</span>
                    <div className="instance">
                        <span className="owner">Spotify &#8226; </span>
                        <span className="songs_count">{`${songs} songs, `}</span>
                        <span className="durations_count">{hours === 0 ? `${minutes} min ${seconds} sec` : `${hours} hr ${minutes} min`}</span>
                    </div>
                </PageMeta>
            </Container>
            <Overlay style={{ backgroundImage: `linear-gradient(${bg} 0%,#121212 100%)` }} />
            <Functionality>
                <button className="round">
                    <PlayIcon />
                </button>
                <button className="like">
                    <HeartOutlineIcon />
                </button>
            </Functionality>
            {children}
        </Wrapper>
    )
}
