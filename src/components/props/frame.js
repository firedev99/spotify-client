import React from 'react'
import { Link } from 'react-router-dom'
// icons
import { PlayIcon } from '../../helpers/icons'
// styled-components
import { Container } from './styles/frameStyles'

export default function Frame({ children, type, id, name, cover, description, ...props }) {
    return children ? (
        <Container {...props}>
            {children}
        </Container>
    ) : (
        <Container>
            <Link to={`/${type}/${id}`}>
                <div className="poster" style={{ borderRadius: type === "artist" && "50%" }}>
                    <img style={{ borderRadius: type === "artist" && "50%" }} src={cover} alt={`${name}-poster`} loading="lazy" />
                    <button><PlayIcon /></button>
                </div>
                <div className="meta">
                    <h3>{name}</h3>
                    {description && <p>{(description)}</p>}
                </div>
            </Link>
        </Container>
    )
}
