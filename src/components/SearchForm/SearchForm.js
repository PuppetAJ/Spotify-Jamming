import React from "react";

function SearchForm({ formSubmit, setFormInput, formInput }) {
  return (
    <form onSubmit={formSubmit} className="search-form container">
      <input
        data-testid="search-input"
        type="text"
        className="search-bar"
        placeholder="Search for a song..."
        onChange={(e) => setFormInput(e.target.value)}
        value={formInput}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
