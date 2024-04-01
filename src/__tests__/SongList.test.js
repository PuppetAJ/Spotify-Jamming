import { render, screen, cleanup } from "@testing-library/react";
import SongList from "../components/SongList/SongList";

afterEach(() => {
  cleanup();
});

let mockTrackResponse, mockSongs;

describe("SongList by default", () => {
  it("renders no results", () => {
    render(<SongList />);
    const noResults = screen.getByText("No results");
    expect(noResults).toBeInTheDocument();
  });
});

describe("SongList after a user has entered a valid search", () => {
  it("renders a list of songs", () => {
    mockTrackResponse = {
      items: [
        { name: "song1", artists: [{ name: "artist1" }] },
        { name: "song2", artists: [{ name: "artist2" }] },
      ],
    };

    mockSongs = mockTrackResponse.items;

    render(<SongList songs={mockSongs} />);

    const song1 = screen.getByText("song1");
    const artist1 = screen.getByText("artist1");
    const song2 = screen.getByText("song2");
    const artist2 = screen.getByText("artist2");

    expect(song1).toBeInTheDocument();
    expect(artist1).toBeInTheDocument();
    expect(song2).toBeInTheDocument();
    expect(artist2).toBeInTheDocument();
  });

  it("lets the user add a song to their playlist", () => {
    const mockHandleAddToPlaylist = jest.fn();
    mockTrackResponse = {
      items: [
        { name: "song1", artists: [{ name: "artist1" }] },
        { name: "song2", artists: [{ name: "artist2" }] },
      ],
    };

    mockSongs = mockTrackResponse.items;

    render(
      <SongList
        songs={mockSongs}
        handleAddToPlaylist={mockHandleAddToPlaylist}
      />
    );

    const addToPlaylistButton = screen.getAllByText("+");
    addToPlaylistButton[0].click();
    expect(mockHandleAddToPlaylist).toHaveBeenCalled();
  });
});

describe("SongList after a user has entered an invalid search", () => {
  it("renders no results", () => {
    mockTrackResponse = { items: [] };
    mockSongs = mockTrackResponse.items;

    render(<SongList songs={mockSongs} />);

    const noResults = screen.getByText("No results");
    expect(noResults).toBeInTheDocument();
  });
});
