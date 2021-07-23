import React, { useContext, useEffect, useState } from 'react';
import styled, { css, keyframes } from "styled-components/macro"
// icons 
import { HeartIcon, HeartOutlineIcon } from "../../helpers/icons"
import { StatusContext, TokenContext } from '../../utils/context';
import delWithToken from '../../utils/delWithToken';
import updateWithToken from '../../utils/updateWithToken';

const scale = keyframes`
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
`;

const shake = keyframes`
    0% { transform: translateX(0px)};
    25% { transform: translateX(8px) rotate(8deg)};
    40% { transform: translateX(0px) rotate(0deg)};
    55% { transform: translateX(-8px) rotate(-8deg)};
    100% { transform: translateX(0px) rotate(0deg)};
`;

const Container = styled.div`
    button {
        background: none;
        outline: none;
        border: none;
        animation: ${scale} all 0.2s;
        svg {
            animation: ${props => props.saved ? css`${scale} 0.6s cubic-bezier(.32, 2, .55, .27)` : css`${shake} 0.5s cubic-bezier(.22,.68,0,1.71)`};
            fill: rgba(255, 255, 255, 0.75);
        }
        &:hover {
            svg {
                fill: rgba(255, 255, 255, 0.9);
            }
        }
    }
`;

export default function SaveToLibrary({ size = 36, id, type = 'playlist', liked = false }) {
    const spotifyToken = useContext(TokenContext);
    const setFlash = useContext(StatusContext);
    const [saved, setSaved] = useState(liked);

    const url = type === 'playlist' ? `https://api.spotify.com/v1/playlists/${id}/followers` : type === "album" ? `https://api.spotify.com/v1/me/albums?ids=${id}` : `https://api.spotify.com/v1/me/tracks?ids=${id}`;

    function handleSaved() {
        // save specified item to library
        async function saveToLibrary() {
            const requestFunc = updateWithToken(url, spotifyToken, {});
            try {
                const response = await requestFunc();
                if (response.status === 200) {
                    setSaved(true);
                    setFlash('Added to your Liked Songs');
                } else {
                    setFlash('Opps, something went wrong!');
                }
            } catch (error) {
                console.log(error);
            }
        }

        saveToLibrary();
    }

    // remove specified item from library
    function handleRemove() {
        async function removeFromLib() {
            const requestFunc = delWithToken(url, spotifyToken, {});
            try {
                const response = await requestFunc();
                if (response.status === 200) {
                    setSaved(false);
                    setFlash('Removed from your Liked Songs');
                } else {
                    setFlash('Opps, something went wrong!');
                }
            } catch (error) {
                console.log(error);
            }
        }

        removeFromLib();
    }

    useEffect(() => {
        if (liked) {
            setSaved(true);
        } else {
            setSaved(false)
        }
    }, [liked]);

    return (
        <Container saved={saved}>
            <button className="like" onClick={saved ? handleRemove : handleSaved}>
                {saved ? <HeartIcon size={size} /> : <HeartOutlineIcon size={size} />}
            </button>
        </Container>
    )
}
