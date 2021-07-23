import styled from "styled-components/macro";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    .save_track {
        @media(max-width: 800px) {
            display: none;
        }
    }
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
        max-width: 124px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        .nav {
            span {
                margin: 0 4px 0 0;
            }
        }
        a {
            color: rgba(179, 179, 179, 0.9);
            font-size: 12px;
        }
    }
`;
