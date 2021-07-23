import styled from "styled-components/macro";

export const Wrapper = styled.nav`
    grid-area: nav-bar;
    width: calc(156px + 5.44vw);
    height: 100%;
    background-color: rgba(0, 0, 0, 1);
    display: flex;
    flex-direction: column;
    @media (max-width: 1024px) {
        width: 212px;
    }
    @media (max-width: 1024px) {
        display: none;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 12px 6px 0px 6px;
    margin-top: 20px;
`;

export const Banner = styled.div`
    margin-left: 4px;
    margin-bottom: 18px;
    a {
        padding: 0 8px;
        color: rgba(255, 255, 255, 1);
        svg {
            height: 40px;
            max-width: 131px;
            width: 100%;
        }
    }
`;

export const NavItems = styled.ul`
    list-style: none;
    margin-bottom: 22px;
    li {
        margin-bottom: 4px;
        .active {
            color: rgba(255, 255, 255, 0.9);
            .nav_items {
                background-color: #282828;
            }
        }
        a {
            transition: all 0.3s;
            font-weight: 500;
            color: rgba(179, 179, 179, 0.85);
            text-decoration: none;
            span {
                white-space: nowrap;
            }
            .nav_items {
                height: 40px;
                display: flex;
                align-items: center;
                padding: 0 16px;
                border-radius: 4px;
                    svg {
                    width: 24px;
                    height: 24px;
                    margin-right: 14px;
                }
            }
            &:hover {
                color: rgba(255, 255, 255, 0.9);
            }
        }
    }
`;

export const NavRoot = styled.div`
    height: 100%;
    .playlist {
        margin-right: -5px;
        padding: 0 0 0 16px;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 434px);
    }
`;

const buttons = `
    button {
        transition: all 0.25s;
        color: rgba(179, 179, 179, 0.8);
        width: 100%;
        height: 38px;
        display: flex;
        align-items: center;
        background: transparent;
        border: none;
        outline: none;
        span {
            font-weight: 500;
            font-size: 16px;
            font-family: "Poppins", sans-serif;
            white-space: nowrap;
        }
        &:hover {
            color: rgba(255, 255, 255, 0.9);
            cursor: pointer;
            .rect {
                background: rgba(255, 255, 255, 0.9);
            }
        }
    }
`;

export const CreatePlaylist = styled.div`
    ${buttons};
    padding: 0 16px;
    .rect {
            transition: all 0.3s;
            background: rgba(179, 179, 179, 0.85);
            width: 23px;
            height: 23px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 2px;
            margin-right: 14px;
        }
`;
export const LikedSongs = styled.div`
    a {
        display: flex;
        text-decoration: none;
        color: rgba(179, 179, 179, 0.8);
    }
    ${buttons};
    margin-bottom: 14px;
    padding: 0 16px;
    position: relative;
    .active {
        color: rgba(255, 255, 255, 0.9);
    }
    &:after {
            content: '';
            position: absolute;
            height: 1px;
            bottom: -9px;
            width: 88%;
            background: rgba(179, 179, 179, 0.4);
    }
    .rect {
            transition: all 0.3s;
            background: linear-gradient(135deg, rgba(69, 10, 245, 0.75), rgba(196, 239, 217, 0.75));
            width: 23px;
            height: 23px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 2px;
            margin-right: 14px;
        }
    &:hover {
        .rect {
                background: linear-gradient(135deg, rgba(69, 10, 245, 0.92), rgba(196, 239, 217, 0.92)) !important;
                svg {
                    .heart {
                        fill: rgba(255, 255, 255, 0.9) !important;
                    }
                }
            }
    }
`;

export const ClientInfo = styled.div`
    padding: 0 18px;
    display: flex;
    flex-direction: column;
    margin: 32px 0;
    a {
        font-size: 14px;
        color: rgba(179, 179, 179, 0.85);
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;

export const UserPlaylists = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-y: auto;
    padding-left: 2px;
    padding-right: 12px;
    .spread {
        padding: 6px 0;
        .active {
            span {
                color: rgba(255, 255, 255, 0.9)
            }
        }
        a {
            text-decoration: none;
            span {
                display: block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 14.5px;
                padding-right: 2px;
                color: rgba(179, 179, 179, 0.85);
                transition: all 0.25s;
                font-weight: 500;
            }
        }
        &:hover {
            span {
                color: rgba(255, 255, 255, 0.95);
            }
        }
    }
`;

export const SpotifyApp = styled.div`
    height: 38px;
    display: flex;
    align-items: center;
    margin-bottom: -4px;
    svg {
        width: 22px;
        height: 22px;
        margin-right: 4px;
        fill: rgba(179, 179, 179, 0.85);
    }
    a {
        display: flex;
        align-items: center;
        color: rgba(179, 179, 179, 0.85);
        text-decoration: none;
        font-size: 13px;
        font-weight: 500;
    }
    &:hover {
        a {
            color: rgba(255, 255, 255, 0.9);
        }
        svg {
            fill: rgba(255, 255, 255, 0.9);
        }
    }
`;