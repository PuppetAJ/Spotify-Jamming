import { render, screen, cleanup } from "@testing-library/react";
import ResultContainer from "../containers/ResultContainer/ResultContainer";

let mockTrackResponse, mockSongs, mockSetSongs, mockUserPlaylistData;

afterEach(() => {
  cleanup();
});

it("should be true", () => {
  expect(true).toBe(true);
});

describe("initial render", () => {
  beforeEach(() => {
    mockTrackResponse = { items: [] };
    mockSongs = undefined;
    mockSetSongs = jest.fn();
    mockUserPlaylistData = [];
    render(
      <ResultContainer
        trackResponse={mockTrackResponse}
        songs={mockSongs}
        setSongs={mockSetSongs}
        userPlaylistData={mockUserPlaylistData}
      />
    );
  });
  it("should render no results in result section", () => {
    const noResults = screen.getByText("No results");
    expect(noResults).toBeInTheDocument();
  });

  it("should render empty playlist name in playlist section", () => {
    const playListName = screen.getByTestId("playlist-name");
    expect(playListName.value).toBe("");
  });
});
