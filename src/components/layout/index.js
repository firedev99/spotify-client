import React, { useContext, useRef, useState } from 'react';
import PropTypes from "prop-types"
// components
import Sidebar from '../sidebar'
import Footer from "../footer"
import Player from "../player"
// styled-components
import GlobalStyles from '../../globalStyles'
import { Wrapper, MainView } from "./styles/layoutStyles"
import { LoginContext, PlayContext, TrackContext } from '../../utils/context';
import useFullScreen from '../../hooks/useFullScreen';

export default function Layout({ children }) {
    const auth = useContext(LoginContext);

    const maximizeEl = useRef(null);
    const [isFullScreen, setIsFullScreen] = useFullScreen(maximizeEl);
    const [currentTrack, setCurrentTrack] = useState({});

    const playerRef = useRef(null);

    const updatePlayer = () => {
        playerRef.current.updateState();
    }

    return (
        <>
            <GlobalStyles />
            <PlayContext.Provider value={updatePlayer}>
                <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
                    <Wrapper ref={maximizeEl}>
                        <Sidebar />
                        <MainView>
                            <main>
                                {children}
                            </main>
                        </MainView>
                        {auth ? <Player ref={playerRef} isFullScreen={isFullScreen} handleMaximize={setIsFullScreen} /> : <Footer />}
                    </Wrapper>
                </TrackContext.Provider>
            </PlayContext.Provider>
        </>
    )
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
}
