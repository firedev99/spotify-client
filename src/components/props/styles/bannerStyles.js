import styled from "styled-components/macro"
export const Wrapper = styled.section`
    height: 100%;
    width: 100%;
    position: relative;
`;
export const Container = styled.div`
    height: 100%;
    width: 100%;
    height: 296px;
    display: flex;
    align-items: center;
    padding: 0 32px;
    .artist {
        border-radius: 50%;
    }

    @media(max-width: 890px) {
        padding: 0 16px;
    }
`;

export const Poster = styled.div`
    width: 264px;
    height: 232px;
    box-shadow: 2px 8px 32px rgba(0, 0, 0, 0.4);
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media(max-width: 786px) {
        height: 196px;
    }
`;

export const PageMeta = styled.div`
    padding: 30px 24px;
    color: rgba(255, 255, 255, 0.9);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    overflow: hidden;
    h2 {
        margin-bottom: 16px;
        letter-spacing: -2px;
    }
    .type {
        text-transform: uppercase;
        font-weight: 600;
        font-size: 14px;
        margin-left: 6px;
    }
    .description {
        color: rgba(255, 255, 255, 0.7);
        font-weight: 500;
        font-size: 15px;
        margin-left: 6px;
    }
    .instance {
        font-size: 15px;
        margin-left: 6px;
        .owner {
            font-weight: 600;
        }
        .songs_count, .durations_count, .release {
            font-weight: 500;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
        }
    }

    @media(max-width: 1111px) {
        h2 {
            font-size: 56px !important;
            line-height: 64px !important;
        }
    }

    @media(max-width: 786px) {
        padding: 46px 16px;
    }
    
`;

export const Overlay = styled.div`
    background: linear-gradient(rgba(0,0,0,.6) 0,#121212 100%);
    width: 100%;
    height: 162px;
    position: absolute;
    z-index: 5;
`;

export const Functionality = styled.div`
    width: 100%;
    height: auto;
    padding: 32px;
    background: transparent;
    position: relative;
    z-index: 40;
    display: flex;
    align-items: center;
    .edit, .delete {
        background: transparent;
        outline: none;
        border: none;
        margin-left: 24px;
        svg {
            width: 30px;
            height: 30px;
            color: rgba(179, 179, 179, 0.9);
        }
    }
    .delete {
        svg {
            width: 30px;
            height: 30px;
        }
    }
    .like {
        margin-left: 24px;
        margin-top: 4px;
    }
    .round {
        outline: none;
        border: none;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: rgba(29, 185, 84, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.25s;
        svg {
            width: 28px;
            height: 28px;
            color: white;
            fill: rgba(255, 255, 255, 0.9);
        }
        &:hover {
            transform: scale(1.05);
        }
    }
`;