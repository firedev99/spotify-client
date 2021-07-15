import styled from "styled-components"

export const Wrapper = styled.div`
    width: 100%;
    max-height: calc(100vh - 90px);
    background-image: linear-gradient(rgba(0,0,0,0.6) 0,#121212 100%);
    overflow-y: auto;
`;

export const FrameWrapper = styled.div`
    display: grid;
    column-gap: 24px;
    row-gap: 16px;
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 32px;
    h3 {
        margin-left: 2px;
        font-size: 22px;
        color: rgba(255, 255, 255, 0.9);
    }
`;

export const LibraryNav = styled.div`
    width: 100%;
    display: flex;
    margin-top: -24px;
    margin-bottom: 18px;
    margin-left: -2px;
        .active {
            background: rgba(255, 255, 255, 0.12);
            border-radius: 6px;
        }
        a {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            padding:8px 24px;
        }
`;