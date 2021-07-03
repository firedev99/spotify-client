import React from 'react'
import { Link } from "react-router-dom"
// styled-components
import { Container } from './styles/stretchStyles'
// icons 
import { PlayIcon } from "../../helpers/icons"


export default function StretchFrame({ items = {} }) {
    return (
        <Container>
            <Link to={`/playlist/${items.id}`}>
                <div className="poster">
                    {items.images ? (
                        <img src={items.images[0].url} alt={`${items.name}-poster`} loading="eager" />
                    ) : (
                        <h3>N/DP</h3>
                    )}
                </div>
                <div className="meta">
                    <h3>{items && items.name.includes(":") ? items.name.split(":")[1] : items.name}</h3>
                    <button>
                        <PlayIcon />
                    </button>
                </div>
            </Link>
        </Container>
    )
}
