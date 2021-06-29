import React from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components/macro'

const Container = styled.div`
    height: 80px;
    width: auto;
    a {
        transition: all 0.2s;
        background: rgba(179, 179, 179, 0.15);
        border-radius: 4px;
        box-shadow: 0 16px 24px rgba(0, 0, 0, 0.3);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        text-decoration: none;
        .poster {
            max-width: 78px;
            width: 100%;
            height: 100%;
            box-shadow: 10px 0 24px rgba(0, 0, 0, 0.3);
                img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                }
            }
        .meta {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            button {
                height: 42px;
                width: 42px;
                border-radius: 50%;
                border: none;
                opacity: 0;
            }
            h3 {
                font-size: 15px !important;
                white-space: nowrap;
                width: 106px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        &:hover {
            background: rgba(179, 179, 179, 0.35);
        }
    }
    
`;

export default function StretchFrame({ items = {} }) {
    const { icons, images, name } = items;

    return (
        <Container>
            <Link to={'/'}>
                <div className="poster">
                    {/* <img src={icons ? icons[0].url : images[0].url} alt={`${name}-poster`} /> */}
                </div>
                <div className="meta">
                    <h3>{name}</h3>
                    <button></button>
                </div>
            </Link>
        </Container>
    )
}
