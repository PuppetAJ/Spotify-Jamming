import { render, screen, cleanup } from "@testing-library/react";
import ContentContainer from "../containers/ContentContainer/ContentContainer";

afterEach(() => {
  cleanup();
});

let mockUserData,
  mockExpired,
  mockTrackResponse,
  mockUserPlaylistData,
  mockSongs,
  mockSetSongs,
  mockLoggedIn,
  mockCurrentToken;

describe("Content Container by default", () => {
  it("renders header", () => {
    render(<ContentContainer />);
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
  });
});

describe("Content Container when user is NOT signed in", () => {
  beforeEach(() => {
    mockUserData = null;
    mockExpired = undefined;
    mockTrackResponse = undefined;
    mockUserPlaylistData = [];
    mockSongs = [];
    mockSetSongs = jest.fn();
    mockLoggedIn = false;

    render(
      <ContentContainer
        userData={mockUserData}
        expired={mockExpired}
        trackResponse={mockTrackResponse}
        userPlaylistData={mockUserPlaylistData}
        songs={mockSongs}
        setSongs={mockSetSongs}
        loggedIn={mockLoggedIn}
      />
    );
  });

  it("does not render log out button when user is not signed in", () => {
    const button = screen.queryByText("Log Out");
    expect(button).toBeNull();
  });

  it("does not render search form when user is not signed in", () => {
    const button = screen.queryByText("Search");
    expect(button).toBeNull();
  });

  it("does not render result container when user is not signed in", () => {
    const heading = screen.queryByText("Results");
    expect(heading).toBeNull();
  });

  it("does not render playlist container when user is not signed in", () => {
    const button = screen.queryByText("Save to Spotify");
    expect(button).toBeNull();
  });
});

describe("Content Container when user is signed in", () => {
  beforeEach(() => {
    mockUserData = {};
    mockExpired = false;
    mockTrackResponse = { items: "test" };
    mockUserPlaylistData = [];
    mockSongs = [];
    mockSetSongs = jest.fn();
    mockLoggedIn = true;
    mockCurrentToken = {};

    render(
      <ContentContainer
        userData={mockUserData}
        expired={mockExpired}
        trackResponse={mockTrackResponse}
        userPlaylistData={mockUserPlaylistData}
        songs={mockSongs}
        setSongs={mockSetSongs}
        loggedIn={mockLoggedIn}
        currentToken={mockCurrentToken}
      />
    );
  });

  it("renders logout button when user is signed in", () => {
    const button = screen.getByText("Log Out");
    expect(button).toBeInTheDocument();
  });

  it("renders search form when user is signed in", () => {
    const button = screen.getByText("Search");
    expect(button).toBeInTheDocument();
  });

  it("renders result container when user is signed in", () => {
    const heading = screen.getByText("Results");
    expect(heading).toBeInTheDocument();
  });

  it("renders playlist container when user is signed in", () => {
    const button = screen.getByText("Save to Spotify");
    expect(button).toBeInTheDocument();
  });
});

describe("Content Container when user attemtps sign in and there is an error", () => {
  beforeEach(() => {
    mockUserData = { error: { message: "test error" } };
    mockExpired = undefined;
    mockTrackResponse = undefined;
    mockUserPlaylistData = [];
    mockSongs = [];
    mockSetSongs = jest.fn();
    mockLoggedIn = false;

    render(
      <ContentContainer
        userData={mockUserData}
        expired={mockExpired}
        trackResponse={mockTrackResponse}
        userPlaylistData={mockUserPlaylistData}
        songs={mockSongs}
        setSongs={mockSetSongs}
        loggedIn={mockLoggedIn}
        currentToken={mockCurrentToken}
      />
    );
  });

  it("renders error message when user is not signed in and there is an error", () => {
    const errorMessage = screen.getByText("test error");
    expect(errorMessage).toBeInTheDocument();
  });

  it("does not render log out button when there is an error", () => {
    const logoutButton = screen.queryByText("Log Out");
    expect(logoutButton).toBeNull();
  });

  it("does not render search form when there is an error", () => {
    const searchForm = screen.queryByText("Search");
    expect(searchForm).toBeNull();
  });

  it("does not render result container when there is an error", () => {
    const resultContainer = screen.queryByText("Results");
    expect(resultContainer).toBeNull();
  });

  it("does not render playlist container when there is an error", () => {
    const playlistContainer = screen.queryByText("Save to Spotify");
    expect(playlistContainer).toBeNull();
  });
});

describe("Content Container when user's token has expired", () => {
  beforeEach(() => {
    mockUserData = {};
    mockExpired = true;
    mockTrackResponse = undefined;
    mockUserPlaylistData = [];
    mockSongs = [];
    mockSetSongs = jest.fn();
    mockLoggedIn = true;
    mockRefreshTokenClick = jest.fn();

    render(
      <ContentContainer
        userData={mockUserData}
        expired={mockExpired}
        trackResponse={mockTrackResponse}
        userPlaylistData={mockUserPlaylistData}
        songs={mockSongs}
        setSongs={mockSetSongs}
        loggedIn={mockLoggedIn}
        currentToken={mockCurrentToken}
        refreshTokenClick={mockRefreshTokenClick}
      />
    );
  });

  it("renders refresh token button when user's token has expired", () => {
    const button = screen.getByText("Refresh token");
    expect(button).toBeInTheDocument();
  });

  it("does not render search form when user's token has expired", () => {
    const button = screen.queryByText("Search");
    expect(button).toBeNull();
  });

  it("does not render result container when user's token has expired", () => {
    const heading = screen.queryByText("Results");
    expect(heading).toBeNull();
  });

  it("does not render playlist container when user's token has expired", () => {
    const button = screen.queryByText("Save to Spotify");
    expect(button).toBeNull();
  });

  it("renders log out button when user's token has expired", () => {
    const button = screen.queryByText("Log Out");
    expect(button).toBeInTheDocument();
  });

  it("fires refreshTokenClick when refresh token button is clicked", () => {
    const button = screen.getByText("Refresh token");
    button.click();
    expect(mockRefreshTokenClick).toHaveBeenCalled();
  });
});
