import styled from "styled-components/macro";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;
export const SongPoster = styled.div`
    width: 56px;
    height: 56px;
    margin-right: 16px;
    border-radius: 2px;
    box-shadow: 8px 2px 14px rgba(0, 0, 0, 0.5);
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const SongMeta = styled.div`
    margin-right: 24px;
    a {
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
    .song_info {
        line-height: 18px;
        max-width: 132px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        a {
            color: rgba(255, 255, 255, 0.9);
            font-size: 14px;
            font-weight: 500;
        }
    }
    .artist_info {
        line-height: 15px;
        max-width: 132px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        a {
            color: rgba(179, 179, 179, 0.9);
            font-size: 12px;
        }
    }
`;

export const LikeButton = styled.div`
    button {
        background: transparent;
        outline: none;
        border: none;
        svg {
            width: 18px;
            height: 18px;
            color: white;
            fill: rgba(255, 255, 255, 0.8);
            transition: all 0.1s;
        }
        &:hover {
            svg {
                fill: rgba(255, 255, 255, 1);
            }
        }
    }
`;