import styled from "styled-components/macro";

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    min-height: 100%;
    display: grid;
    grid-template-areas:
        "nav-bar main-view buddy-feed"
        "now-playing-bar now-playing-bar now-playing-bar";
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr auto;
`;

export const MainView = styled.div`
    position: relative;
    background-image: linear-gradient(rgba(0,0,0,.75) 0,#121212 100%);
    height: 100%;
    width: 100%;
    grid-area: main-view;
    display: flex;
    flex-direction: column;
    main {
        display: flex;
        flex: 1;
    }
`;