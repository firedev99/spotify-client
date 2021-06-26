import React from 'react';
import PropTypes from "prop-types";
// components
import Sidebar from '../sidebar';
import Footer from "../footer";
import Header from "../header";
// styled-components
import GlobalStyles from '../../globalStyles';
import { Wrapper, MainView } from "./styles/layoutStyles";

export default function Layout({ children }) {
    return (
        <>
            <GlobalStyles />
            <Wrapper>
                <Sidebar />
                <MainView>
                    <Header />
                    <main>
                        {children}
                    </main>
                </MainView>
                <Footer />
            </Wrapper>
        </>
    )
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
}
