import styled from "styled-components/macro"

export const Wrapper = styled.footer`
    grid-area: now-playing-bar;
    background-color: yellow;
    width: 100%;
`;

export const Container = styled.div`
    padding: 0 32px;
    height: 82px;
    background-image: linear-gradient(90deg ,#af2896, #509bf5);
    background-image: -webkit-gradient(linear, left, top, right, top, from(#af2896, #509bf5));
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
        white-space: nowrap;
        color: rgba(46, 119, 208, 0.9);
        font-size: 15px;
        padding: 11px 52px;
        background-color: rgba(255, 255, 255, 0.95);
        border-radius: 50px;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        outline: none;
        border: none;
        font-weight: 700;
        transition: transform 0.2s;
        &:hover {
            cursor: pointer;
            transform: scale(1.04);
        }
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    p, a {
        font-size: 15px;
        color: rgba(255, 255, 255, 0.9);
    }
    a {
        text-decoration: none;
        font-weight: 500;
        &:hover {
            text-decoration: underline;
        }
    }
    .s_u {
        margin-top: 2px;
        font-size: 16px;
    }
    @media (max-width: 1024px) {
        p {
            font-size: 14px;
        }
        .s_u {
            max-width: 480px;
            font-size: 15px;
        }
    }
`;
