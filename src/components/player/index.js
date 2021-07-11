import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
// components
import SongStatus from './songStatus'
import PlayerFunctionality from './playerFunc'
// context
import { TokenContext, TrackContext } from "../../utils/context"
// utils
import reqWithToken from "../../utils/reqWithToken"
import updateWithToken from '../../utils/updateWithToken'
import postWithToken from "../../utils/postWithToken"
// icons 
import { PlayIcon, PauseIcon, ShufflePlayIcon, PreviousPlayIcon, NextPlayIcon, RepeatPlayIcon } from '../../helpers/icons'
// styled-components
import { Wrapper, Container, PlayerStatus, AudioPlayer, PlayerControl } from './styles/playerStyles'

function Player({ handleMaximize, isFullScreen }, ref) {
    const spotifyToken = useContext(TokenContext);
    const { currentTrack, setCurrentTrack } = useContext(TrackContext);

    let fireyPlayer = useRef(null);

    const [toggleDevice, setToggleDevice] = useState(false);
    const [playbackState, setPlaybackState] = useState({
        loading: false,
        play: false,
        shuffle: false,
        repeat: false,
        progress: 0,
        duration: 0,
    });

    useImperativeHandle(ref, () => ({
        updateState: () => {
            setPlaybackState(state => ({ ...state, play: true }));
            updateState();
        }
    }))

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
        fireyPlayer = new Player({
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
                    setCurrentTrack({ ...current_track, play: !paused });
                    setPlaybackState(state => ({
                        ...state,
                        loading: loading,
                        play: !paused,
                        shuffle: shuffle,
                        repeat: repeat_mode !== 0,
                        progress: position,
                        duration: duration
                    }));
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
        fireyPlayer.connect()
    };

    const updateState = () => {
        if (!fireyPlayer.current) {
            getPlayerInfo();
        }
    };

    // get user's current player device infomations 
    const getPlayerInfo = _ => {
        console.log('player status');
        const reqInformations = reqWithToken('https://api.spotify.com/v1/me/player', spotifyToken)
        const getFunc = async () => {
            try {
                const response = await reqInformations();
                if (response.status === 200) {
                    const { data } = response;
                    const { is_playing, item, progress_ms, repeat_state, shuffle_state } = data;
                    setCurrentTrack({ ...item, play: is_playing });
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
        getFunc();
    };

    // playback func
    // const playbackFunc = (ratio) => {
    //     const playback_duration = ratio * playbackState.duration;
    //     setPlaybackScrub(playback_duration);
    // };

    // seek position playback
    // const seekPlaybackPosition = (ratio) => {
    //     const position_ms = Math.round(ratio * playbackState.duration);
    //     const requestFunc = updateWithToken(`https://api.spotify.com/v1/me/player/seek?position_ms=${position_ms}`, spotifyToken);
    //     const seekPosition = async _ => {
    //         try {
    //             const response = await requestFunc();
    //             if (response.status === 204) {
    //                 setPostionPb(ratio);
    //                 setPostionPb(state => ({ ...state, progress: position_ms }));
    //                 updateState();
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     };

    //     seekPosition();
    //     setPlaybackScrub(null);
    // };

    // play / resume, pause track
    const toggleMusic = _ => {
        const request = updateWithToken(`${playbackState.play ? `https://api.spotify.com/v1/me/player/pause` : `https://api.spotify.com/v1/me/player/play`}`, spotifyToken);
        const requestFunc = async _ => {
            try {
                const response = await request();
                if (response.status === 204) {
                    setPlaybackState(state => ({ ...state, play: !state.play }))
                    updateState();
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
        getPlayerInfo();
        window.onSpotifyWebPlaybackSDKReady = () => InitializePlayer();
        // get current state of the player
        return () => {
            fireyPlayer.disconnect();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Wrapper>
            <Container>
                <PlayerStatus>
                    <SongStatus currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} />
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
                                {playbackState.play && playbackState.loading === false ? <PauseIcon /> : <PlayIcon />}
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
                    {/* <div className="player_progress_bar">
                        <div className="duration">
                            {playbackScrub ? minutesAndSeconds(playbackScrub) : minutesAndSeconds(playbackState.progress)}
                        </div>
                        <Progressbar
                            value={positionPb}
                            setValue={(ratio) => seekPlaybackPosition(ratio)}
                            func={playbackFunc}
                        />
                        <div className="duration">
                            {minutesAndSeconds(playbackState.duration)}
                        </div>
                    </div> */}
                </AudioPlayer>
                <PlayerControl>
                    <PlayerFunctionality
                        toggleDevice={toggleDevice}
                        setToggleDevice={setToggleDevice}
                        handleMaximize={handleMaximize}
                        isFullScreen={isFullScreen}
                    />
                </PlayerControl>
            </Container>
        </Wrapper>
    )
}

export default forwardRef(Player);