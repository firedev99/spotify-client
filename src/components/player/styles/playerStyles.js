import styled from "styled-components/macro"

export const Wrapper = styled.footer`
    grid-area: now-playing-bar;
    height: auto;
    width: 100%;
`;

export const Container = styled.div`
    height: 90px;
    width: 100%;
    min-width: 620px;
    padding: 12px 16px;
    background: #181818;
    border-top: 1px solid #282828;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const PlayerStatus = styled.div`
    width: 25%;
    min-width: 200px;
    height: 100%;
    display: flex;
`;
export const AudioPlayer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .player_progress_bar {
        width: 100%;
        max-width: 524px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        user-select: none;
    }
    .player_controls {
        display: flex;
        align-items: center;
            button {
                margin: 8px 12px 0 12px;
                background: transparent;
                outline: none;
                border: none;
                svg {
                    transition: all 0.15s;
                    fill: rgba(179, 179, 179, 1);
                }
                &:hover {
                    svg {
                        fill: rgba(255, 255, 255, 1);
                    }
                }
        }
        .player_play_controls {
            width: 33px;
            height: 33px;
            border-radius: 50%;
            margin: 0 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 1);
            box-shadow: 2px 1px 8px rgba(0, 0, 0, 0.5);
            button {
                margin: 4px 0 0 0;
                svg {
                    width: 17px;
                    height: 17px;
                    fill: black;
                }
            }
        }
    }
`;
export const PlayerControl = styled.div`
    width: 25%;
    min-width: 200px;
    height: 100%;
`;
