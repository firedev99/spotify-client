import React from 'react';
// utils
import { msToTime } from '../../utils/getTime'
// icons
import { PlayIcon, HeartOutlineIcon, PauseIcon, HeartIcon } from '../../helpers/icons'
import { Wrapper, Container, Poster, PageMeta, Overlay, Functionality } from "./styles/bannerStyles"


export default function PageBanner({ image, title, description, playContext, songs, duration, children, isPlaying, bg, saved, disabled = false }) {
    const { minutes, seconds, hours } = msToTime(duration);

    // async function savedToLibrary() {
    //     const requestFunc = updateWithToken();

    // }

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
                        <span className="songs_count">{`${songs} songs`}</span>
                        {duration && <span className="durations_count">, {hours === 0 ? `${minutes} min ${seconds} sec` : `${hours} hr ${minutes} min`}</span>}
                    </div>
                </PageMeta>
            </Container>
            <Overlay style={{ backgroundImage: `linear-gradient(${bg} 0%,#121212 100%)` }} />
            <Functionality>
                {!disabled ? (
                    <>
                        <button className="round" onClick={playContext}>
                            {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </button>
                        <button className="like" onClick={() => { }}>
                            {saved ? <HeartIcon /> : <HeartOutlineIcon />}
                        </button>
                    </>
                ) : null}
            </Functionality>
            {children}
        </Wrapper>
    )
}
