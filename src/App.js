import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import ContentContainer from "./containers/ContentContainer/ContentContainer";

function App() {
  const [currentToken, setCurrentToken] = useState();

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [expiration, setExpiration] = useState("");
  const [expired, setExpired] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [formInput, setFormInput] = useState("");
  const [trackResponse, setTrackResponse] = useState([]);
  const [userPlaylistData, setUserPlaylistData] = useState([]);
  const [userPlaylistName, setUserPlaylistName] = useState("");
  const [songs, setSongs] = useState([]);

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUrl = process.env.REACT_APP_REDIRECT_URL;

  const authorizationEndpoint = "https://accounts.spotify.com/authorize";
  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const scope =
    "user-read-private user-read-email playlist-modify-public playlist-read-private playlist-modify-private";

  // Declare callbacks for useEffects
  const getUserDataCB = useCallback(getUserData, [currentToken]);
  const getTokenCB = useCallback(getToken, [clientId, redirectUrl]);
  const testLoggedInCB = useCallback(testLoggedIn, [
    currentToken,
    error,
    getUserDataCB,
  ]);
  const testExpirationCB = useCallback(testExpiration, [expiration]);

  useEffect(() => {
    const testLocalToken = localStorage.getItem("access_token");
    if (testLocalToken && !expired) {
      const data = {
        refresh_token: localStorage.getItem("refresh_token"),
        access_token: localStorage.getItem("access_token"),
        expires_in: localStorage.getItem("expires_in"),
        expires: localStorage.getItem("expires"),
        scope: scope,
        token_type: "Bearer",
      };

      setCurrentToken(data);
    }
  }, [expired]);

  useEffect(() => {
    async function testSpotifyConnection() {
      // On page load try to fetch auth code from current browser URL
      const args = new URLSearchParams(window.location.search);
      const code = args.get("code");
      const testLocalToken = localStorage.getItem("access_token");

      // If code is found, we're in a callback, do a token exchange (once)
      if (code && !expired && !testLocalToken) {
        // const token = await getToken(code);
        const token = await getTokenCB(code);
        setCurrentToken(token);
        console.log(token);

        localStorage.setItem("access_token", token.access_token);
        localStorage.setItem("refresh_token", token.refresh_token);
        localStorage.setItem("expires_in", token.expires_in);

        const now = new Date();
        const expiry = new Date(now.getTime() + token.expires_in * 1000);
        localStorage.setItem("expires", expiry);
        setExpiration(expiry);

        // Remove code from URL so we can refresh correctly
        const url = new URL(window.location.href);
        url.searchParams.delete("code");

        const updatedUrl = url.search ? url.href : url.href.replace("?", "");
        window.history.replaceState({}, document.title, updatedUrl);
      }
    }

    testSpotifyConnection();
  }, [expired, getTokenCB]);

  useEffect(() => {
    testLoggedInCB();
    testExpirationCB();
  }, [currentToken, testLoggedInCB, testExpirationCB]);

  async function redirectToSpotifyAuthorize() {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const randomString = randomValues.reduce(
      (acc, x) => acc + possible[x % possible.length],
      ""
    );

    const code_verifier = randomString;
    const data = new TextEncoder().encode(code_verifier);
    const hashed = await crypto.subtle.digest("SHA-256", data);

    const code_challenge_base64 = btoa(
      String.fromCharCode(...new Uint8Array(hashed))
    )
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    window.localStorage.setItem("code_verifier", code_verifier);

    const authUrl = new URL(authorizationEndpoint);
    const params = {
      response_type: "code",
      client_id: clientId,
      scope: scope,
      code_challenge_method: "S256",
      code_challenge: code_challenge_base64,
      redirect_uri: redirectUrl,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
  }

  async function getToken(code) {
    const code_verifier = localStorage.getItem("code_verifier");

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUrl,
        code_verifier: code_verifier,
      }),
    });

    return await response.json();
  }

  async function refreshToken() {
    console.log(currentToken);
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "refresh_token",
        refresh_token: currentToken.refresh_token,
      }),
    });
    // add local storage methods here

    return await response.json();
  }

  async function getUserData() {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    });

    return await response.json();
  }

  // Click handlers
  async function loginWithSpotifyClick() {
    await redirectToSpotifyAuthorize();
  }

  async function logoutClick() {
    localStorage.clear();
    window.location.href = redirectUrl;
  }

  async function refreshTokenClick() {
    const token = await refreshToken();
    if (!token.error) {
      setCurrentToken(token);
      localStorage.setItem("access_token", token.access_token);
      localStorage.setItem("refresh_token", token.refresh_token);
      localStorage.setItem("expires_in", token.expires_in);

      const now = new Date();
      const expiry = new Date(now.getTime() + token.expires_in * 1000);
      localStorage.setItem("expires", expiry);
      setExpiration(expiry);
    } else {
      localStorage.clear();
      window.location.href = redirectUrl;
      console.log("Error refreshing token: ", token.error);
    }

    setExpired(false);
  }

  // If we have a token, we're logged in, so fetch user data and render logged in template
  // Logic for testing what to display
  async function testLoggedIn() {
    if (currentToken) {
      try {
        const usersData = await getUserDataCB();
        setUserData(usersData);
        if (usersData.error) return;
        setLoggedIn(true);
        // setLoading(false);
      } catch (e) {
        setError(error);
        // setLoading(false);
      }
    }
  }

  async function testExpiration() {
    const testDate = (expires) => {
      const now = new Date().getTime();

      const expiredTest = now >= expires;
      if (expiredTest) {
        setExpired(true);
        // setLoading(false);
        return true;
      }
      return false;
    };

    if (expiration) {
      const expires = Date.parse(expiration);
      return testDate(expires);
    } else if (localStorage.getItem("expires")) {
      const expires = Date.parse(localStorage.getItem("expires"));
      return testDate(expires);
    }
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    setFormInput("");
    if (formInput === "") return;
    const endpoint = `https://api.spotify.com/v1/search?q=${formInput}&type=track&limit=10`;
    await fetch(endpoint, {
      headers: { Authorization: "Bearer " + currentToken.access_token },
    })
      .then(async (response) => {
        const res = await response.json();
        setTrackResponse(res.tracks);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddToPlaylist = (e) => {
    setUserPlaylistData((prev) => [
      ...prev,
      trackResponse.items[e.target.value],
    ]);
  };

  const handleRemoveFromPlaylist = (e) => {
    e.preventDefault();
    const index = parseInt(e.target.value);
    const newPlaylist = userPlaylistData.filter((_, i) => {
      return i !== index;
    });
    setUserPlaylistData(newPlaylist);
  };

  const handleSavePlaylist = async (e) => {
    e.preventDefault();

    if (userPlaylistData.length > 0 && userPlaylistName !== "") {
      const userPlaylistURIs = userPlaylistData.map((song) => song.uri);
      const endpoint = `https://api.spotify.com/v1/users/${userData.id}/playlists`;

      const data = {
        name: userPlaylistName,
        description: "Playlist generated by Jammming!",
        public: false,
      };

      await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + currentToken.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          const res = await response.json();
          const playlistId = res.id;

          const addPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
          await fetch(addPlaylistEndpoint, {
            method: "POST",
            headers: {
              Authorization: "Bearer " + currentToken.access_token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uris: userPlaylistURIs }),
          }).catch((error) => {
            console.log("Error:", error);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setUserPlaylistData([]);
      setUserPlaylistName("");
      alert("Playlist saved!");
    }
  };

  const handleSongListNavFetch = async (url) => {
    await fetch(url, {
      headers: { Authorization: "Bearer " + currentToken.access_token },
    })
      .then(async (response) => {
        const res = await response.json();
        setTrackResponse(res.tracks);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSongListNav = (e) => {
    e.preventDefault();
    if (e.target.value === "next") {
      handleSongListNavFetch(trackResponse.next);
    } else if (e.target.value === "previous") {
      handleSongListNavFetch(trackResponse.previous);
    }
  };

  return (
    <ContentContainer
      currentToken={currentToken}
      loggedIn={loggedIn}
      logoutClick={logoutClick}
      userData={userData}
      expired={expired}
      formSubmit={formSubmit}
      formInput={formInput}
      setFormInput={setFormInput}
      trackResponse={trackResponse}
      handleAddToPlaylist={handleAddToPlaylist}
      userPlaylistData={userPlaylistData}
      setUserPlaylistName={setUserPlaylistName}
      userPlaylistName={userPlaylistName}
      handleRemoveFromPlaylist={handleRemoveFromPlaylist}
      loginWithSpotifyClick={loginWithSpotifyClick}
      refreshTokenClick={refreshTokenClick}
      songs={songs}
      setSongs={setSongs}
      handleSavePlaylist={handleSavePlaylist}
      handleSongListNav={handleSongListNav}
    />
  );
}

export default App;
