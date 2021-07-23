import React, { useContext } from 'react'
import { Link } from "react-router-dom"
// styled-components
import { Container } from './styles/stretchStyles'
// context
import { PlayContext, TokenContext } from '../../utils/context'
// utils
import updateWithToken from '../../utils/updateWithToken'
// icons 
import { PlayIcon } from "../../helpers/icons"


export default function StretchFrame({ items = {} }) {
    const updatePlayer = useContext(PlayContext);
    const spotifyToken = useContext(TokenContext);

    // play whole playlist
    function playContext() {
        const body = {
            context_uri: items.uri
        }
        const requestFunc = updateWithToken(`https://api.spotify.com/v1/me/player/play`, spotifyToken, body);
        const requestMusic = async _ => {
            const response = await requestFunc();
            if (response.status === 204) {
                setTimeout(() => updatePlayer(), 200);
            } else {
                console.log('Something happend.');
            }
        };
        requestMusic();
    };

    return (
        <Container>
            <Link to={`/playlist/${items.id}`}>
                <div className="poster">
                    {items.images.length !== 0 ? (
                        <img src={items.images[0]?.url} alt={`${items.name}-poster`} loading="eager" />
                    ) : (
                        <h3>N/DP</h3>
                    )}
                </div>
                <div className="meta">
                    <h3>{items && items.name.includes(":") ? items.name.split(":")[1] : items.name}</h3>
                    <button onClick={playContext}>
                        <PlayIcon />
                    </button>
                </div>
            </Link>
        </Container>
    )
}
