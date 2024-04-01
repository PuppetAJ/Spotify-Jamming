import React from "react";

function AddPlaylist({
  userPlaylistData,
  setUserPlaylistName,
  userPlaylistName,
  handleRemoveFromPlaylist,
}) {
  return (
    <div className="add-playlist-container">
      <form className="add-playlist-form">
        <input
          data-testid="playlist-name"
          type="text"
          className="add-playlist-input"
          placeholder="Playlist Name"
          value={userPlaylistName}
          onChange={(e) => setUserPlaylistName(e.target.value)}
        />
        <ul className="song-list">
          {userPlaylistData.map((song, i) => (
            <li className="song-list-item" key={i}>
              <div className="song-list-item-wrapper">
                <div className="song-list-details">
                  <p className="song-list-name">{song.name}</p>
                  <div className="song-list-artist-container">
                    {song.artists.map((artist) => (
                      <p className="song-list-artist" key={artist.id}>
                        {artist.name}
                      </p>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleRemoveFromPlaylist}
                  className="song-list-icon"
                  value={i}
                >
                  -
                </button>
              </div>
              <hr className="song-list-line" />
            </li>
          ))}
        </ul>
        <button className="add-playlist-button">Save to Spotify</button>
      </form>
    </div>
  );
}

export default AddPlaylist;
