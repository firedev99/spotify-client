import React, { useState, useEffect } from "react"
import { Route } from "react-router-dom"
import axios from "axios"
// pages
import { HomePage, SearchPage } from "./pages"
// library-pages
import { CollectionTracks, CollectionPlaylists, CollectionArtists, CollectionAlbums } from "./pages/library"
// templates
import { AlbumTemplate, ArtistTemplate, GenreTemplate, PlaylistTemplate } from './templates'
// components
import Layout from "./components/layout"
// utils
import getHashParams from "./utils/getHashParams"
import getWithToken from "./utils/getWithToken"
import { LoginContext, TokenContext, UserContext, PlaylistContext } from "./utils/context"

function App() {
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const { accessToken, error } = getHashParams(window && window.location.hash);
    const cancelSource = axios.CancelToken.source();
    if (error) {
      console.log(error);
    } else {
      if (accessToken) {
        setSpotifyToken(accessToken);
        setAuth(true);
        window.location.hash = '';

        async function makeRequest() {
          const reqUserInfo = getWithToken('https://api.spotify.com/v1/me', accessToken, cancelSource);
          const reqUserPlaylists = getWithToken('https://api.spotify.com/v1/me/playlists', accessToken, cancelSource);
          try {
            const [_userInfo, _userPlaylists] = await Promise.all([reqUserInfo(), reqUserPlaylists()]);
            // handle axios token cancellation
            if (typeof _userInfo !== 'undefined' && typeof _userPlaylists !== 'undefined') {
              setUserInfo(_userInfo.data);
              setPlaylists(_userPlaylists.data)
            }
          } catch (error) {
            console.log(error);
          }
        }

        makeRequest();
      } else {
        // If there is no such hash param check for the refresh token in the cookie
        // Make axios send cookies in the below request automatically with credentials parameter
        async function refreshedToken() {
          const { data: { access_token } } = await axios.get(`${process.env.REACT_APP_BACK_URI}/refresh_token`, { withCredentials: true })
          setSpotifyToken(access_token);
          setAuth(true);

          const makeRequest = async () => {
            const reqUserInfo = getWithToken('https://api.spotify.com/v1/me', access_token, cancelSource);
            const reqUserPlaylists = getWithToken('https://api.spotify.com/v1/me/playlists', access_token, cancelSource);

            try {
              const [_userInfo, _userPlaylists] = await Promise.all([reqUserInfo(), reqUserPlaylists()]);
              // handle axios token
              if (typeof _userInfo !== 'undefined' && typeof _userPlaylists !== 'undefined') {
                setUserInfo(_userInfo.data);
                setPlaylists(_userPlaylists.data)
              }
            } catch (error) {
              console.log(error);
            }
          }

          makeRequest();
        }

        refreshedToken();
      }

    }

    return () => cancelSource.cancel();
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
                <Route path="/collection/playlists" component={CollectionPlaylists} />
                <Route path="/collection/tracks" component={CollectionTracks} />
                <Route path="/collection/artists" component={CollectionArtists} />
                <Route path="/collection/albums" component={CollectionAlbums} />
                <Route path="/playlist/:id" component={PlaylistTemplate} />
                <Route path="/album/:id" component={AlbumTemplate} />
                <Route path="/artist/:id" component={ArtistTemplate} />
                <Route path="/genre/:id" component={GenreTemplate} />
              </Layout>
            </PlaylistContext.Provider>
          </UserContext.Provider>
        </TokenContext.Provider>
      </LoginContext.Provider>
    </>
  );
}

export default App;
