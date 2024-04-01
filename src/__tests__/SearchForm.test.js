import { render, screen, cleanup } from "@testing-library/react";
import SearchForm from "../components/SearchForm/SearchForm";

afterEach(() => {
  cleanup();
});

describe("initial render", () => {
  it("should render search button", () => {
    render(<SearchForm />);
    const searchButton = screen.getByText("Search");
    expect(searchButton).toBeInTheDocument();
  });
});

describe("form", () => {
  it("should render text input", () => {
    render(<SearchForm />);
    const searchInput = screen.getByPlaceholderText("Search for a song...");
    expect(searchInput).toBeInTheDocument();
  });

  it("should render text input with value", () => {
    render(<SearchForm formInput="hello" />);
    const searchInput = screen.getByDisplayValue("hello");
    expect(searchInput).toBeInTheDocument();
  });

  it("should fire form submit function on submit", () => {
    const mockFormSubmit = jest
      .fn()
      .mockImplementation((e) => e.preventDefault());
    render(<SearchForm formSubmit={mockFormSubmit} />);
    const searchButton = screen.getByText("Search");
    searchButton.click();
    expect(mockFormSubmit).toHaveBeenCalled();
  });

  it("should capture input value on submit", () => {
    const mockInput = "hello";
    let mockCapture = {};
    const mockFormSubmit = jest.fn().mockImplementation((e) => {
      e.preventDefault();
      expect(searchInput.value).toBe(mockInput);
      mockCapture = { input: searchInput.value };
      expect(mockCapture.input).toBe(mockInput);
    });

    render(<SearchForm formSubmit={mockFormSubmit} formInput={mockInput} />);
    const searchInput = screen.getByTestId("search-input");
    const searchButton = screen.getByText("Search");
    searchButton.click();
  });
});
