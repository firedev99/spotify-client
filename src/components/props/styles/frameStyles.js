import styled from "styled-components/macro"

export const Container = styled.div`
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
        cursor: pointer;
        /* .artists_poster {
            border-radius: 50%;
            img {
                border-radius: 50%;
            }
        } */
        .poster {
            height: 70%;
            padding: 16px;
            position: relative;
            button {
                position: absolute;
                height: 42px;
                width: 42px;
                border-radius: 50%;
                border: none;
                bottom: 24px;
                right: 24px;
                opacity: 0;
                background: rgba(29, 185, 84, 1);
                transform: translateY(8px);
                transition: all 0.25s;
                animation-direction: alternate;
                display: flex;
                align-items: center;
                justify-content: center;
                svg {
                    color: white;
                    width: 18px;
                    height: 18px;
                }
                &:hover {
                    transform: scale(1.05);
                }
            }
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
        .poster {
            button {
                opacity: 1;
                transform: translateY(0px);
                box-shadow: 0 8px 8px rgb(0, 0, 0, 0.3);
            }
        }
    }
`;