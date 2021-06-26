import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
    height: 80px;
    width: auto;
    background: rgba(179, 179, 179, 0.15);
    border-radius: 4px;
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.3);
`;

export default function StretchFrame() {
    return (
        <Container>
            Hello
        </Container>
    )
}
