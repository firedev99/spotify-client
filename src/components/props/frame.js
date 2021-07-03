import React from 'react'
import { Link } from 'react-router-dom'
// icons
import { PlayIcon } from '../../helpers/icons'
// styled-components
import { Container } from './styles/frameStyles'

export default function Frame({ children, items, ...props }) {
    return children ? (
        <Container {...props}>
            {children}
        </Container>
    ) : (
        <Container>
            <Link to={`/playlist/${items.id}`}>
                <div className="poster">
                    <img src={items && items.images[0].url} alt={`${items.name}-poster`} loading="lazy" />
                    <button><PlayIcon /></button>
                </div>
                <div className="meta">
                    <h3>{items && items.name}</h3>
                    <p>{items && items.description}</p>
                </div>
            </Link>
        </Container>
    )
}
