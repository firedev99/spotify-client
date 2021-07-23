import React from 'react'
// styled-components
import styled, { css, keyframes } from 'styled-components/macro'

const faded = keyframes`
    0% { opacity: 0 };
    100% { opacity: 1 };
`;

const Container = styled.div`
    padding: 11px 42px;
    background: rgba(63,88,203, 1);
    position: fixed;
    z-index: 100;
    bottom: 82px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.89);
    border-radius: 10px;
    animation: ${props => props.popup && css`${faded} ease-in 1s`};
`;

export default function FlashUi({ popup, message }) {
    return (
        <Container popup={popup}>
            {message}
        </Container>
    )
}
