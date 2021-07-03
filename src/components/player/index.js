import React, { useContext, useEffect, useRef } from 'react'
import SongStatus from './songStatus'
// context
import { TokenContext } from "../../utils/context";
// icons 
import { PlayIcon, PauseIcon, ShufflePlayIcon, PreviousPlayIcon, NextPlayIcon, RepeatPlayIcon } from '../../helpers/icons'
// styled-components
import { Wrapper, Container, PlayerStatus, AudioPlayer, PlayerControl } from './styles/playerStyles'

export default function Player() {
    const spotifyToken = useContext(TokenContext);

    const player = useRef(null);

    // Installing web playback sdk via script using raw vanilla
    const loadSdkScript = _ => {
        const script = document.createElement("script");
        script.id = "spotify-player"
        script.type = "text/javascript";
        script.async = "async";
        script.defer = "defer";
        script.src = "https://sdk.scdn.co/spotify-player.js";

        document.body.appendChild(script);
    };

    // Initializing spotify web playback sdk
    const initializeSdk = _ => {
        console.log('initializing spotify web playback sdk');
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = window && new window.Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(spotifyToken && spotifyToken); }
            });

            // Error handling
            player.addListener('initialization_error', ({ message }) => { console.error(message); });
            player.addListener('authentication_error', ({ message }) => { console.error(message); });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });

            // Playback status updates
            player.addListener('player_state_changed', state => { console.log(state); });

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            // Connect to the player!
            player.connect();
            return () => player.disconnect();
        }
    }

    useEffect(() => {
        loadSdkScript();
        // initialize spotify web playback sdk
        window.onSpotifyWebPlaybackSDKReady = _ => initializeSdk();

        return _ => player.disconnect();
        // eslint-disable-next-line
    }, [])

    return (
        <Wrapper>
            <Container>
                <PlayerStatus>
                    <SongStatus />
                </PlayerStatus>
                <AudioPlayer>
                    <div className="player_controls">
                        <div className="player_shuffle">
                            <button>
                                <ShufflePlayIcon />
                            </button>
                        </div>
                        <div className="player_previous">
                            <button>
                                <PreviousPlayIcon />
                            </button>
                        </div>
                        <div className="player_play_controls">
                            <button>
                                <PlayIcon />
                            </button>
                        </div>
                        <div className="player_next">
                            <button>
                                <NextPlayIcon />
                            </button>
                        </div>
                        <div className="player_repeat">
                            <button>
                                <RepeatPlayIcon />
                            </button>
                        </div>
                    </div>
                    <div className="player_progress_bar">
                        Hello
                    </div>
                </AudioPlayer>
                <PlayerControl>

                </PlayerControl>
            </Container>
        </Wrapper>
    )
}
