import React from 'react'
// styled-components
import { Wrapper, Container, Content } from "./styles/footerStyles"

export default function Footer() {
    return (
        <Wrapper>
            <Container>
                <Content>
                    <p>Preview of Spotify</p>
                    <p className="s_u">This is a clone web app - not for any kind of commercial use - @firedev99. Check the real app <a draggable="false" target="_blank" rel="noreferrer noopener" href="https://open.spotify.com/">open.spotify.com</a></p>
                </Content>
                <button type="button">Sign up free</button>
            </Container>
        </Wrapper>
    )
}
