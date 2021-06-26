import React from 'react';
// components
import StretchFrame from '../../components/props/stretchFrame';
// styled-components
import { Wrapper, Container, Top, TopInner } from "./styles/homeStyles";

export default function HomePage() {
    return (
        <Wrapper>
            <Container>
                <Top>
                    <h3>Good evening</h3>
                    <TopInner>
                        <StretchFrame />
                        <StretchFrame />
                        <StretchFrame />
                        <StretchFrame />
                        <StretchFrame />
                    </TopInner>
                </Top>
            </Container>
        </Wrapper>
    )
}
