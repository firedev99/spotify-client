import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
// context
import { PlayContext, TokenContext } from '../../utils/context'
// utils
import updateWithToken from '../../utils/updateWithToken'
// icons
import { PlayIcon } from '../../helpers/icons'
// styled-components
import { Container } from './styles/frameStyles'

export default function Frame({ children, type, id, name, uri, cover, description, ...props }) {
    const spotifyToken = useContext(TokenContext);
    const updatePlayer = useContext(PlayContext);

    function playContext() {
        const body = {
            context_uri: uri
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

    return children ? (
        <Container {...props}>
            {children}
        </Container>
    ) : (
        <Container>
            <Link to={`/${type}/${id}`}>
                <div className="poster" style={{ borderRadius: type === "artist" && "50%" }}>
                    <img style={{ borderRadius: type === "artist" && "50%" }} src={cover} alt={`${name}-poster`} loading="lazy" />
                    <button onClick={playContext}><PlayIcon /></button>
                </div>
                <div className="meta">
                    <h3>{name}</h3>
                    {description && <p>{(description)}</p>}
                </div>
            </Link>
        </Container>
    )
}
