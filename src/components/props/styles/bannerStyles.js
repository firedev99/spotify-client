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
`;

export const Poster = styled.div`
    width: 264px;
    height: 232px;
    box-shadow: 2px 8px 25px rgba(0, 0, 0, 0.3);
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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
    }
    .description {
        color: rgba(255, 255, 255, 0.7);
        font-weight: 500;
        font-size: 15px;
    }
    .instance {
        font-size: 15px;
        .owner {
            font-weight: 600;
        }
        .songs_count, .durations_count {
            font-weight: 500;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
        }
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
    .like {
        margin-left: 28px;
        background: none;
        outline: none;
        border: none;
        svg {
            width: 38px;
            height: 38px;
            fill: rgba(255, 255, 255, 0.75);
        }
        &:hover {
            svg {
                fill: rgba(255, 255, 255, 0.9);
            }
        }
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
        }
        &:hover {
            transform: scale(1.05);
        }
    }
`;