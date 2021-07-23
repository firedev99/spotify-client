import styled from "styled-components/macro"

export const Wrapper = styled.div`
    width: 200px;
    height: 100%;
    background: red;
    display: none;
    @media(max-width: 800px) {
        display: block;
    }
`;

