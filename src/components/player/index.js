import React, { useContext, useEffect, useState } from 'react'
// components
import SongStatus from './songStatus'
import PlayerFunctionality from './playerFunc'
import Progressbar from '../props/progressBar'
// context
import { TokenContext } from "../../utils/context"
// utils
import reqWithToken from "../../utils/reqWithToken"
import updateWithToken from '../../utils/updateWithToken'
import postWithToken from "../../utils/postWithToken"
// icons 
import { PlayIcon, PauseIcon, ShufflePlayIcon, PreviousPlayIcon, NextPlayIcon, RepeatPlayIcon } from '../../helpers/icons'
// styled-components
import { Wrapper, Container, PlayerStatus, AudioPlayer, PlayerControl } from './styles/playerStyles'

export default function Player() {
    const spotifyToken = useContext(TokenContext);

    const [volume, setVolume] = useState(0.5);
    const [toggleDevice, setToggleDevice] = useState(false);
    const [currentTrack, setCurrentTrack] = useState({});
    const [playbackState, setPlaybackState] = useState({
        loading: false,
        play: false,
        shuffle: false,
        repeat: false,
        progress: 0,
        duration: 0,
    });

    // create a new cross browser audio player with spotify webplayback sdk
    const loadScript = () => {
        const script = document.createElement("script");
        script.id = "spotify-player";
        script.type = "text/javascript";
        script.async = "async";
        script.defer = "defer";
        script.src = "https://sdk.scdn.co/spotify-player.js";
        document.body.appendChild(script);
    };

    const InitializePlayer = () => {
        console.log("initializing firey spotify 👾");
        let { Player } = window.Spotify;
        const fireyPlayer = new Player({
            name: "Firey Spotify🔥",
            getOAuthToken: (cb) => {
                cb(spotifyToken);
            },
        });
        // Error handling
        fireyPlayer.addListener("initialization_error", ({ message }) => {
            console.log(message);
        });
        fireyPlayer.addListener("authentication_error", ({ message }) => {
            console.log(message);
        });
        fireyPlayer.addListener("account_error", ({ message }) => {
            console.log(message);
        });
        fireyPlayer.addListener("playback_error", ({ message }) => {
            console.log(message);
        });
        // Playback status updates
        fireyPlayer.addListener("player_state_changed", (state) => {
            try {
                if (state) {
                    const { duration, loading, paused, position, repeat_mode, shuffle, track_window } = state;
                    const { current_track } = track_window;
                    setCurrentTrack(current_track);
                    setPlaybackState(state => ({
                        ...state,
                        loading: loading,
                        play: !paused,
                        shuffle: shuffle,
                        repeat: repeat_mode !== 0,
                        progress: position,
                        duration: duration
                    }))
                }
            } catch (error) {
                console.log(error);
            }
        });
        // Ready
        fireyPlayer.addListener("ready", ({ device_id }) => {
            console.log("Ready with Device ID", device_id);
        });
        // Not Ready
        fireyPlayer.addListener("not_ready", ({ device_id }) => {
            console.log("Device ID has gone offline", device_id);
        });
        // Connect the player!
        fireyPlayer.connect();
    };

    // get user's current player device infomations 
    const getPlayerInfo = async _ => {
        console.log('player status');
        if (typeof spotifyToken !== 'undefined') {
            const reqInformations = reqWithToken('https://api.spotify.com/v1/me/player', spotifyToken)
            try {
                const response = await reqInformations();
                if (response.status === 200) {
                    const { data } = response;
                    const { device, is_playing, item, progress_ms, repeat_state, shuffle_state } = data;
                    setVolume(device.volume_percent / 100);
                    setCurrentTrack(item);
                    setPlaybackState(state => ({
                        ...state,
                        play: is_playing,
                        shuffle: shuffle_state,
                        repeat: repeat_state !== "off",
                        duration: item.duration_ms,
                        progress: progress_ms,
                    }))
                } else if (response.status === 204) {
                    console.log('device not selected, NO CONTENT');
                    console.log('Please select a device to start listening on FIREY SPOTIFY 🔥');
                } else {
                    console.log('Error from spotify server 😑');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    // play / resume, pause track
    const toggleMusic = _ => {
        const request = updateWithToken(`${playbackState.play ? `https://api.spotify.com/v1/me/player/pause` : `https://api.spotify.com/v1/me/player/play`}`, spotifyToken);
        const requestFunc = async _ => {
            try {
                const response = await request();
                if (response.status === 204) {
                    setPlaybackState(state => ({ ...state, play: !state.play }))
                } else {
                    console.log('Oops, something went wrong 😔');
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }

        requestFunc();
    };

    // enable shuffle mode 
    const toggleShuffle = _ => {
        const request = updateWithToken(`https://api.spotify.com/v1/me/player/shuffle?state=${!playbackState.shuffle}`, spotifyToken);
        const requestFunc = async _ => {
            try {
                const response = await request();
                if (response.status === 204) {
                    setPlaybackState(state => ({ ...state, shuffle: !state.shuffle }));
                    console.log(`Shuffle ${playbackState.shuffle ? "disabled" : "enabled"}`);
                } else {
                    console.log('Oops, something went wrong 😔');
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }

        requestFunc();
    };

    // get previous track
    const skipPrevious = _ => {
        const request = postWithToken('https://api.spotify.com/v1/me/player/previous', spotifyToken);
        const requestFunc = async _ => {
            try {
                const response = await request();
                if (response.status !== 204) {
                    console.log('Oops, something went wrong 😔');
                    return;
                };
            } catch (error) {
                console.log(error);
            }
        }

        requestFunc();
    };

    // get next track
    const skipNext = _ => {
        const request = postWithToken('https://api.spotify.com/v1/me/player/next', spotifyToken);
        const requestFunc = async _ => {
            try {
                const response = await request();
                if (response.status !== 204) {
                    console.log('Oops, something went wrong 😔');
                    return;
                };
            } catch (error) {
                console.log(error);
            }
        }

        requestFunc();
    };

    // enable repeat mode 
    const toggleRepeat = _ => {
        const request = updateWithToken(`https://api.spotify.com/v1/me/player/repeat?state=${playbackState.repeat ? `off` : `track`}`, spotifyToken);
        const requestFunc = async _ => {
            try {
                const response = await request();
                if (response.status === 204) {
                    setPlaybackState(state => ({ ...state, repeat: !state.repeat }));
                    console.log(`Repeat mode ${playbackState.repeat ? "disabled" : "enabled"}`);
                } else {
                    console.log('Oops, something went wrong 😔');
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }

        requestFunc();
    };

    useEffect(() => {
        // initialize script
        loadScript();
        window.onSpotifyWebPlaybackSDKReady = () => InitializePlayer();
        // get current state of the player
        getPlayerInfo();

        // eslint-disable-next-line
    }, []);

    return (
        <Wrapper>
            <Container>
                <PlayerStatus>
                    <SongStatus />
                </PlayerStatus>
                <AudioPlayer>
                    <div className="player_controls">
                        <div className="player_shuffle">
                            <button onClick={toggleShuffle}>
                                <ShufflePlayIcon fill={playbackState.shuffle ? `rgba(29, 185, 84, 1)` : `rgba(179, 179, 179, 1)`} />
                            </button>
                        </div>
                        <div className="player_previous">
                            <button onClick={skipPrevious}>
                                <PreviousPlayIcon />
                            </button>
                        </div>
                        <div onClick={toggleMusic} className="player_play_controls">
                            <button>
                                {playbackState.play ? <PauseIcon /> : <PlayIcon />}
                            </button>
                        </div>
                        <div className="player_next">
                            <button onClick={skipNext}>
                                <NextPlayIcon />
                            </button>
                        </div>
                        <div className="player_repeat">
                            <button onClick={toggleRepeat}>
                                <RepeatPlayIcon fill={playbackState.repeat ? `rgba(29, 185, 84, 1)` : `rgba(179, 179, 179, 1)`} />
                            </button>
                        </div>
                    </div>
                    <div className="player_progress_bar">
                        {/* <div className="remaining_duration">
                            
                        </div> */}
                        <Progressbar />
                        {/* <div className="total_duration">

                        </div> */}
                    </div>
                </AudioPlayer>
                <PlayerControl>
                    <PlayerFunctionality
                        toggleDevice={toggleDevice}
                        setToggleDevice={setToggleDevice}
                    />
                </PlayerControl>
            </Container>
        </Wrapper>
    )
}
