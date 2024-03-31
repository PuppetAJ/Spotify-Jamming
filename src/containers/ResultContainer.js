import React from "react";
import SongList from "../components/SongList";
import AddPlaylist from "../components/AddPlaylist";

function ResultContainer({
  trackResponse,
  handleAddToPlaylist,
  userPlaylistData,
  setUserPlaylistName,
  userPlaylistName,
  handleRemoveFromPlaylist,
}) {
  return (
    <div className="result-container container">
      <SongList
        trackResponse={trackResponse}
        handleAddToPlaylist={handleAddToPlaylist}
      />
      <AddPlaylist
        userPlaylistData={userPlaylistData}
        setUserPlaylistName={setUserPlaylistName}
        userPlaylistName={userPlaylistName}
        handleRemoveFromPlaylist={handleRemoveFromPlaylist}
      />
    </div>
  );
}

export default ResultContainer;
