import React from 'react';
// utils
import { msToTime } from '../../utils/getTime'
// icons
import { PlayIcon, HeartOutlineIcon, PauseIcon, HeartIcon } from '../../helpers/icons'
import { Wrapper, Container, Poster, PageMeta, Overlay, Functionality } from "./styles/bannerStyles"


export default function PageBanner({ ref, image, title, description, playContext, songs, duration, children, isPlaying, bg, saved, disabled = false, disableHeart = false, type = 'playlist', owner, release }) {
    const { minutes, seconds, hours } = msToTime(duration);

    return (
        <Wrapper ref={ref}>
            <Container style={{ background: `${bg}` }}>
                <Poster className={type === 'artist' ? 'artist' : 'banner'}>
                    <img className={type === 'artist' ? 'artist' : 'banner'} src={image} loading="eager" alt={`${title}.jpg`} />
                </Poster>
                <PageMeta>
                    {type !== 'artist' && <span className="type">{type}</span>}
                    <h2 style={{ fontSize: title && title.length > 18 ? `46px` : `96px`, lineHeight: title && title.length > 18 ? `64px` : `88px` }}>{title}</h2>
                    {duration && <span className="description">{description}</span>}
                    <div className="instance">
                        <span className="owner">{owner === 'spotify' ? `Spotify ${String.fromCodePoint(parseInt(8226))} ` : type === 'artist' ? `${owner}` : `${owner} ${String.fromCodePoint(parseInt(8226))} `}</span>
                        {release && <span className="release">{release.split('-')[0]} &#8226; </span>}
                        {songs && <span className="songs_count">{`${songs} songs`}</span>}
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
                        {!disableHeart && (
                            <button className="like" onClick={() => { }}>
                                {saved ? <HeartIcon /> : <HeartOutlineIcon />}
                            </button>
                        )}
                    </>
                ) : null}
            </Functionality>
            {children}
        </Wrapper>
    )
}
