import React from "react";
import Header from "../../components/Header/Header";
import Login from "../../components/Login/Login";
import SearchForm from "../../components/SearchForm/SearchForm";
import ResultContainer from "../ResultContainer/ResultContainer";

function ContentContainer({
  loggedIn,
  logoutClick,
  formSubmit,
  formInput,
  setFormInput,
  trackResponse,
  handleAddToPlaylist,
  userPlaylistData,
  setUserPlaylistName,
  userPlaylistName,
  handleRemoveFromPlaylist,
  loginWithSpotifyClick,
  refreshTokenClick,
  currentToken,
  userData,
  expired,
  songs,
  setSongs,
}) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        logoutClick={logoutClick}
        userData={userData}
      />
      {userData && !userData.error && !expired && (
        <main className="search-main">
          <SearchForm
            formSubmit={formSubmit}
            formInput={formInput}
            setFormInput={setFormInput}
          />
          <ResultContainer
            trackResponse={trackResponse}
            handleAddToPlaylist={handleAddToPlaylist}
            userPlaylistData={userPlaylistData}
            setUserPlaylistName={setUserPlaylistName}
            userPlaylistName={userPlaylistName}
            handleRemoveFromPlaylist={handleRemoveFromPlaylist}
            songs={songs}
            setSongs={setSongs}
          />
        </main>
      )}
      {userData && userData.error && (
        <div className="user-error">
          <h1>{userData.error.message}</h1>
        </div>
      )}
      {!currentToken && <Login handleLogin={loginWithSpotifyClick} />}
      {expired && (
        <div className="expired-container">
          <h1>Your session has expired</h1>
          <button className="refresh-button" onClick={refreshTokenClick}>
            Refresh token
          </button>
        </div>
      )}
    </>
  );
}

export default ContentContainer;
