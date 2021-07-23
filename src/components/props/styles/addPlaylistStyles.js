import styled from "styled-components/macro"

export const Wrapper = styled.div`
    padding: 32px;
    position: relative;
    z-index: 20;
    h1 {
        font-size: 22px;
        color: rgba(255, 255, 255, 0.9);
    }
`;

export const Input = styled.div`
    margin: 12px 0;
    position: relative;
    input {
        height: 36px;
        width: 100%;
        max-width: 410px;
        background: rgba(179, 179, 179, 0.1);
        border: none;
        outline: none;
        border-radius: 5px;
        font-family: "Poppins", sans-serif;
        color: rgba(179, 179, 179, 1);
        font-weight: 600;
        text-indent: 36px;
    }
    .search_icon {
        position: absolute;
        top: 0;
        left: 10px;
        top: 8px;
        svg {
            width: 20px;
            height: 20px;
        }
    }
    .clear_icon {
        background: transparent;
        outline: none;
        border: none;
        position: absolute;
        top: 8px;
        left: 382px;
        svg {
            color: rgba(179, 179, 179, 0.9);
            width: 18px;
            height: 18px;
        }
    }
`;

export const TrackList = styled.div``;