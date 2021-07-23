import React, { useState } from 'react';
// utils
import { msToTime } from '../../utils/getTime'
// components
import SaveToLibrary from './saveToLibrary';
import EditUi from './editUi';
// icons
import { PlayIcon, PauseIcon, EditIcon } from '../../helpers/icons'
import { Wrapper, Container, Poster, PageMeta, Overlay, Functionality } from "./styles/bannerStyles"

export default function PageBanner({ ref, id, image, title, description, playContext, songs, duration, children, isPlaying, bg, saved, disabled = false, disableHeart = false, type = 'playlist', owner, release }) {
    const { minutes, seconds, hours } = msToTime(duration);
    const [updateToggle, setUpdateToggle] = useState(false);

    return (
        <>
            {updateToggle && <EditUi toggle={true} setToggle={setUpdateToggle} id={id} update={true} pTitle={title} pDescription={description} pCover={image} style={{ left: '35%', top: '42%' }} />}
            <Wrapper ref={ref}>
                <Container style={{ background: `${bg}` }}>
                    {image && (
                        <Poster className={type === 'artist' ? 'artist' : 'banner'}>
                            <img className={type === 'artist' ? 'artist' : 'banner'} src={image} loading="eager" alt={`${title}.jpg`} />
                        </Poster>
                    )}
                    <PageMeta>
                        {type !== 'artist' && <span className="type">{type}</span>}
                        <h2 style={{ fontSize: title && title.length > 18 ? `46px` : `96px`, lineHeight: title && title.length > 18 ? `64px` : `88px` }}>{title}</h2>
                        {description && <span className="description">{description}</span>}
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
                                <SaveToLibrary type={type === 'single' ? 'album' : type} id={id} liked={saved} />
                            )}
                            {type === "playlist" && (
                                <button className="edit" onClick={() => setUpdateToggle(true)}>
                                    <EditIcon />
                                </button>
                            )}
                        </>
                    ) : null}
                </Functionality>
                {children}
            </Wrapper>
        </>
    )
}
