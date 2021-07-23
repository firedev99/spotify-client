import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from "prop-types"
// components
import Sidebar from '../sidebar'
import Footer from "../footer"
import Player from "../player"
import FlashUi from '../props/flashUi'
// hooks
import useFullScreen from '../../hooks/useFullScreen'
// styled-components
import GlobalStyles from '../../globalStyles'
import { Wrapper, MainView } from "./styles/layoutStyles"
import { LoginContext, PlayContext, StatusContext, TrackContext } from '../../utils/context';

export default function Layout({ children }) {
    const auth = useContext(LoginContext);

    const maximizeEl = useRef(null);
    const [isFullScreen, setIsFullScreen] = useFullScreen(maximizeEl);
    const [currentTrack, setCurrentTrack] = useState({});
    const [popup, setPopup] = useState(false);
    const [message, setMessage] = useState('');
    const playerRef = useRef(null);

    // update player ref
    const updatePlayer = () => {
        playerRef.current.updateState();
    };


    // provoke flash messages 
    const flashMessage = (message) => {
        setPopup(true);
        setMessage(message);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (popup) {
                setPopup(false);
            }
        }, 2500)
        return _ => clearTimeout(timer);
    }, [popup])

    return (
        <>
            <GlobalStyles />
            <PlayContext.Provider value={updatePlayer}>
                <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
                    <StatusContext.Provider value={flashMessage}>
                        <Wrapper ref={maximizeEl}>
                            <Sidebar />
                            <MainView>
                                <main>
                                    {children}
                                </main>
                            </MainView>
                            {auth ? <Player ref={playerRef} isFullScreen={isFullScreen} handleMaximize={setIsFullScreen} /> : <Footer />}
                            {popup && <FlashUi popup={popup} message={message} />}
                        </Wrapper>
                    </StatusContext.Provider>
                </TrackContext.Provider>
            </PlayContext.Provider>
        </>
    )
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
}
