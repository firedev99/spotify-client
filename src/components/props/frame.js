import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    height: 272px;
    width: auto;
    background: rgba(24, 24, 24, 1);
    border-radius: 4px;
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.3);
    transition: all 0.25s;
    a {
        text-decoration: none;
        width: 100%;
        height: 100%;
        transition: all 0.25s;
        cursor: pointer;
        .poster {
            height: 70%;
            padding: 16px;
            img {
                box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.3);
                border-radius: 2px;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .meta {
            padding: 0 16px 16px 16px;
            h3 {
                font-size: 16px !important;
                color: rgba(255, 255, 255, 0.9);
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            p {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                line-clamp: 2;
                -webkit-line-clamp: 2;
                color: rgba(179, 179, 179, 0.9);
                font-weight: 500;
            }
        }
    }
    &:hover {
        background: rgba(179, 179, 179, 0.18);
    }
`;

export default function Frame({ children, playlist }) {
    // const { images } = playlist;

    return children ? (
        <Container>
            {children}
        </Container>
    ) : (
        <Container>
            <Link>
                <div className="poster">
                    <img src={playlist && playlist.images[0].url} alt={`${playlist.name}-poster`} />
                </div>
                <div className="meta">
                    <h3>{playlist && playlist.name}</h3>
                    <p>{playlist && playlist.description}</p>
                </div>
            </Link>
        </Container>
    )
}
