import React, { useContext } from 'react';
import PropTypes from "prop-types"
// components
import Sidebar from '../sidebar'
import Footer from "../footer"
import Player from "../player"
// styled-components
import GlobalStyles from '../../globalStyles'
import { Wrapper, MainView } from "./styles/layoutStyles"
import { LoginContext } from '../../utils/context';

export default function Layout({ children }) {
    const auth = useContext(LoginContext);

    return (
        <>
            <GlobalStyles />
            <Wrapper>
                <Sidebar />
                <MainView>
                    <main>
                        {children}
                    </main>
                </MainView>
                {auth ? <Player /> : <Footer />}
            </Wrapper>
        </>
    )
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
}
