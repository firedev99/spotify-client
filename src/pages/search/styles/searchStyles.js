import styled from "styled-components/macro";

export const Wrapper = styled.div`
    width: 100%;
    max-height: calc(100vh - 90px);
    background-image: linear-gradient(rgba(0,0,0,0.6) 0,#121212 100%);
    overflow-y: auto;
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 16px 32px;
`;

export const SearchBar = styled.div`
    max-width: 342px;
    height: 44px;
    position: relative;
    .icon {
        position: absolute;
        z-index: 10;
        top: 10px;
        left: 12px;
        svg {
            color: rgba(0, 0, 0, 0.8);
        }
    }
    input {
        border-radius: 20px;
        text-indent: 42px;
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
    }
`;