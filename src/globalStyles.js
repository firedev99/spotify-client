import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    ::-webkit-scrollbar {
        width: 13px;
        z-index: 0;
    }
    /* Track */
    ::-webkit-scrollbar-track {
        padding: 1px;
        background: none; 
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #5a5a5a; 
        width: 12px;
    }
    /* On hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #b3b3b3; 
    }

    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        color: #b3b3b3;
    }
`;

export default GlobalStyles;