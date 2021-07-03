import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
// icons
import { ExportIcon } from '../../helpers/icons';

const Container = styled.div`
    position: absolute;
    right: 0;
    top: 44px;
    width: 186px;
    padding: 8px;
    height: auto;
    background-color: #282828;
    border-radius: 4px;
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.3);
    ul {
        list-style: none;
        li {
            padding: 6px 6px;
            transition: all 0.2s;
            border-radius: 4px;
            svg {
                fill: rgba(255, 255, 255, 0.9);
                width: 16px;
                height: 16px;
            }
            a, span {
                text-decoration: none;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: rgba(179, 179, 179, 1);
            }
            span {
                margin-left: 0;
                text-decoration: none;
                color: rgba(179, 179, 179, 1);
            }
            &:hover {
                background-color: rgba(179, 179, 179, 0.15);
                svg {
                    fill: rgba(255, 255, 255, 1);
                }
                a, span {
                    color: rgba(255, 255, 255, 0.9);
                }
            }
        }
    }
`;

export default function UserMenu({ country = "BD", userID = "firedev99" }) {
    const logout = () => {
        axios.get(`${process.env.REACT_APP_BACK_URI}/logout`, { withCredentials: true })
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    }
    return (
        <Container>
            <ul>
                <li>
                    <a draggable="false" target="_blank" rel="noreferrer noopener" href={`https://www.spotify.com/${country.toLowerCase()}-en`}>
                        <span>Account</span>
                        <ExportIcon />
                    </a>
                </li>
                <li>
                    <Link draggable="false" to={`profile/${userID}`}>Profile</Link>
                </li>
                <li onClick={logout}>
                    <span>Log out</span>
                </li>
            </ul>
        </Container>
    )
}
