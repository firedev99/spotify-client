import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
// pages
import { HomePage, SearchPage } from "./pages";
// components
import Layout from "./components/layout";
// utils
import getHashParams from "./utils/getHashParams";
import reqWithToken from "./utils/reqWithToken";
// context
import { LoginContext, TokenContext, UserContext, PlaylistContext } from "./utils/context";

function App() {
  const [loading, setLoading] = useState(true)
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const { accessToken, error } = getHashParams(window && window.location.hash);
    const cancelSource = axios.CancelToken.source();

    if (error) {
      setLoading(false);
      console.log(error);
    } else {
      if (accessToken) {
        setSpotifyToken(accessToken);
        setAuth(true);
        window.location.hash = '';

        const makeRequest = async () => {
          const reqUserInfo = reqWithToken('https://api.spotify.com/v1/me', accessToken, cancelSource);
          const reqUserPlaylists = reqWithToken('https://api.spotify.com/v1/me/playlists', accessToken, cancelSource)
          try {
            const [_userInfo, _userPlaylists] = await Promise.all([reqUserInfo(), reqUserPlaylists()]);
            setUserInfo(_userInfo.data);
            setPlaylists(_userPlaylists.data)
          } catch (error) {
            console.log(error);
          }
        }

        makeRequest();
      } else {
        // If there is no such hash param check for the refresh token in the cookie
        // Make axios send cookies in the below request automatically with credentials parameter
        const refreshedToken = async () => {
          const { data: { access_token } } = await axios.get(`${process.env.REACT_APP_BACK_URI}/refresh_token`, { withCredentials: true })
          setSpotifyToken(access_token);
          setAuth(true);

          const makeRequest = async () => {
            const reqUserInfo = reqWithToken('https://api.spotify.com/v1/me', access_token, cancelSource);
            const reqUserPlaylists = reqWithToken('https://api.spotify.com/v1/me/playlists', access_token, cancelSource)

            try {
              const [_userInfo, _userPlaylists] = await Promise.all([reqUserInfo(), reqUserPlaylists()]);

              setUserInfo(_userInfo.data);
              setPlaylists(_userPlaylists.data)
            } catch (error) {
              console.log(error);
            }
          }

          makeRequest();
        }

        refreshedToken();
      }

    }
  }, [auth])
  return (
    <>
      <LoginContext.Provider value={auth}>
        <TokenContext.Provider value={spotifyToken}>
          <UserContext.Provider value={userInfo}>
            <PlaylistContext.Provider value={playlists}>
              <Layout>
                <Route path='/' exact component={HomePage} />
                <Route path='/search' component={SearchPage} />
              </Layout>
            </PlaylistContext.Provider>
          </UserContext.Provider>
        </TokenContext.Provider>
      </LoginContext.Provider>
    </>
  );
}

export default App;
