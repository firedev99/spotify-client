import React from 'react';
// styled-components
import { Wrapper, Container, Content } from "./styles/footerStyles";

export default function Footer() {
    return (
        <Wrapper>
            <Container>
                <Content>
                    <p>Preview of Spotify</p>
                    <p className="s_u">Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
                </Content>
                <button type="button">Sign up free</button>
            </Container>
        </Wrapper>
    )
}
