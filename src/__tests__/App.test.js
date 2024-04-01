import { render, screen, cleanup } from "@testing-library/react";
import App from "../App";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("renders login page when user is not signed in", () => {
    render(<App />);
    const button = screen.getByText("Link Spotify");
    expect(button).toBeInTheDocument();
  });
});
