import { render, screen, cleanup } from "@testing-library/react";
import AddPlaylist from "../components/AddPlaylist/AddPlaylist";

afterEach(() => {
  cleanup();
});

let mockUserPlaylistData, mockUserPlaylistName, mockHandleRemoveFromPlaylist;

describe("AddPlaylist by default", () => {
  beforeEach(() => {
    mockUserPlaylistData = [];
    mockUserPlaylistName = "";
    mockHandleRemoveFromPlaylist = jest.fn();
  });

  it("renders a playlist name input and save to spotify button", () => {
    render(
      <AddPlaylist
        userPlaylistData={mockUserPlaylistData}
        userPlaylistName={mockUserPlaylistName}
        handleRemoveFromPlaylist={mockHandleRemoveFromPlaylist}
      />
    );
    const playlistName = screen.getByTestId("playlist-name");
    const button = screen.getByText("Save to Spotify");
    expect(playlistName).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});

describe("AddPlaylist with userPlaylistData", () => {
  beforeEach(() => {
    mockUserPlaylistData = [
      { name: "song1", artists: [{ name: "artist1" }] },
      { name: "song2", artists: [{ name: "artist2" }] },
    ];
    mockUserPlaylistName = "";
    mockHandleRemoveFromPlaylist = jest.fn();
  });

  it("renders a list of songs", () => {
    render(
      <AddPlaylist
        userPlaylistData={mockUserPlaylistData}
        userPlaylistName={mockUserPlaylistName}
        handleRemoveFromPlaylist={mockHandleRemoveFromPlaylist}
      />
    );

    const song1 = screen.getByText("song1");
    const artist1 = screen.getByText("artist1");
    const song2 = screen.getByText("song2");
    const artist2 = screen.getByText("artist2");

    expect(song1).toBeInTheDocument();
    expect(artist1).toBeInTheDocument();
    expect(song2).toBeInTheDocument();
    expect(artist2).toBeInTheDocument();
  });

  it("lets the user remove a song from their playlist", () => {
    render(
      <AddPlaylist
        userPlaylistData={mockUserPlaylistData}
        userPlaylistName={mockUserPlaylistName}
        handleRemoveFromPlaylist={mockHandleRemoveFromPlaylist}
      />
    );

    const removeFromPlaylistButton = screen.getAllByText("-");
    removeFromPlaylistButton[0].click();
    expect(mockHandleRemoveFromPlaylist).toHaveBeenCalled();
  });
});
