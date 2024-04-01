import { render, screen, cleanup } from "@testing-library/react";
import SongList from "../components/SongList/SongList";

afterEach(() => {
  cleanup();
});

let mockTrackResponse, mockSongs, mockSetSongs;

describe("SongList by default", () => {
  it("renders no results", () => {
    render(<SongList />);
    const noResults = screen.getByText("No results");
    expect(noResults).toBeInTheDocument();
  });

  it("does not render a next button", () => {
    render(<SongList />);
    const nextButton = screen.queryByText("Next");
    expect(nextButton).not.toBeInTheDocument();
  });

  it("does not render a previous button", () => {
    render(<SongList />);
    const previousButton = screen.queryByText("Prev");
    expect(previousButton).not.toBeInTheDocument();
  });
});

describe("SongList after a user has entered a valid search", () => {
  beforeEach(() => {
    mockTrackResponse = {
      items: [
        { name: "song1", id: 1, artists: [{ name: "artist1", id: 1 }] },
        { name: "song2", id: 2, artists: [{ name: "artist2", id: 2 }] },
      ],
      next: "next",
      previous: "previous",
    };

    mockSetSongs = jest.fn();
    mockSongs = mockTrackResponse.items;
  });
  it("renders a list of songs", () => {
    render(
      <SongList
        trackResponse={mockTrackResponse}
        setSongs={mockSetSongs}
        songs={mockSongs}
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

  it("lets the user add a song to their playlist", () => {
    const mockHandleAddToPlaylist = jest.fn();
    mockTrackResponse = {
      items: [
        { name: "song1", id: 1, artists: [{ name: "artist1", id: 1 }] },
        { name: "song2", id: 2, artists: [{ name: "artist2", id: 2 }] },
      ],
      next: "next",
      previous: "previous",
    };

    mockSetSongs = jest.fn();

    mockSongs = mockTrackResponse.items;

    render(
      <SongList
        trackResponse={mockTrackResponse}
        setSongs={mockSetSongs}
        songs={mockSongs}
        handleAddToPlaylist={mockHandleAddToPlaylist}
      />
    );

    const addToPlaylistButton = screen.getAllByText("+");
    addToPlaylistButton[0].click();
    expect(mockHandleAddToPlaylist).toHaveBeenCalled();
  });

  it("renders a next button if there are more results", () => {
    render(
      <SongList
        trackResponse={mockTrackResponse}
        setSongs={mockSetSongs}
        songs={mockSongs}
      />
    );

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeInTheDocument();
  });

  it("renders a previous button if there are previous results", () => {
    render(
      <SongList
        trackResponse={mockTrackResponse}
        setSongs={mockSetSongs}
        songs={mockSongs}
      />
    );

    const previousButton = screen.getByText("Prev");
    expect(previousButton).toBeInTheDocument();
  });

  it("lets the user navigate to the next page of results", () => {
    const mockHandleSongListNav = jest.fn();
    render(
      <SongList
        trackResponse={mockTrackResponse}
        setSongs={mockSetSongs}
        songs={mockSongs}
        handleSongListNav={mockHandleSongListNav}
      />
    );

    const nextButton = screen.getByText("Next");
    nextButton.click();
    expect(mockHandleSongListNav).toHaveBeenCalled();
  });

  it("lets the user navigate to the previous page of results", () => {
    const mockHandleSongListNav = jest.fn();
    render(
      <SongList
        trackResponse={mockTrackResponse}
        setSongs={mockSetSongs}
        songs={mockSongs}
        handleSongListNav={mockHandleSongListNav}
      />
    );

    const previousButton = screen.getByText("Prev");
    previousButton.click();
    expect(mockHandleSongListNav).toHaveBeenCalled();
  });

  it("does not render a next button if there are no more results", () => {
    mockTrackResponse = { items: [], next: null, previous: null };
    mockSongs = mockTrackResponse.items;
    mockSetSongs = jest.fn();

    render(
      <SongList
        setSongs={mockSetSongs}
        songs={mockSongs}
        trackResponse={mockTrackResponse}
      />
    );

    const nextButton = screen.queryByText("Next");
    expect(nextButton).not.toBeInTheDocument();
  });

  it("does not render a previous button if there are no previous results", () => {
    mockTrackResponse = { items: [], next: null, previous: null };
    mockSongs = mockTrackResponse.items;
    mockSetSongs = jest.fn();

    render(
      <SongList
        setSongs={mockSetSongs}
        songs={mockSongs}
        trackResponse={mockTrackResponse}
      />
    );

    const previousButton = screen.queryByText("Prev");
    expect(previousButton).not.toBeInTheDocument();
  });
});

describe("SongList after a user has entered an invalid search", () => {
  it("renders no results", () => {
    mockTrackResponse = { items: [], next: null, previous: null };
    mockSongs = mockTrackResponse.items;
    mockSetSongs = jest.fn();

    render(
      <SongList
        setSongs={mockSetSongs}
        songs={mockSongs}
        trackResponse={mockTrackResponse}
      />
    );

    const noResults = screen.getByText("No results");
    expect(noResults).toBeInTheDocument();
  });
});
