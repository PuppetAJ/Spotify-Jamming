import React from "react";
import SongList from "../../components/SongList/SongList";
import AddPlaylist from "../../components/AddPlaylist/AddPlaylist";

function ResultContainer({
  trackResponse,
  handleAddToPlaylist,
  userPlaylistData,
  setUserPlaylistName,
  userPlaylistName,
  handleRemoveFromPlaylist,
  songs,
  setSongs,
  handleSavePlaylist,
  handleSongListNav,
}) {
  return (
    <div className="result-container container">
      <SongList
        trackResponse={trackResponse}
        handleAddToPlaylist={handleAddToPlaylist}
        songs={songs}
        setSongs={setSongs}
        handleSongListNav={handleSongListNav}
      />
      <AddPlaylist
        userPlaylistData={userPlaylistData}
        setUserPlaylistName={setUserPlaylistName}
        userPlaylistName={userPlaylistName}
        handleRemoveFromPlaylist={handleRemoveFromPlaylist}
        handleSavePlaylist={handleSavePlaylist}
      />
    </div>
  );
}

export default ResultContainer;
