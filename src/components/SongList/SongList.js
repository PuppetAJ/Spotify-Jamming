import React, { useEffect } from "react";

function SongList({ trackResponse, handleAddToPlaylist, songs, setSongs }) {
  useEffect(() => {
    if (trackResponse === undefined) return;
    setSongs(trackResponse.items);
  }, [songs, setSongs, trackResponse]);

  return (
    <div className="song-list-container">
      <h1 className="song-list-heading">Results</h1>
      {songs && !songs.length && <h3 className="song-list-name">No results</h3>}
      {!songs && <h3 className="song-list-name">No results</h3>}
      {songs && (
        <ul className="song-list">
          {songs.map((song, i) => (
            <li className="song-list-item" key={song.id}>
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
                  className="song-list-icon"
                  value={i}
                  onClick={handleAddToPlaylist}
                >
                  +
                </button>
              </div>
              {i < songs.length - 1 && <hr className="song-list-line" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SongList;
