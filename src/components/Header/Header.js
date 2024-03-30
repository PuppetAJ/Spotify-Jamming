import React from "react";

function Header({ loggedIn, logoutClick }) {
  return (
    <div className="header">
      <h1>
        Ja<span className="heading-color">mmm</span>ing
      </h1>
      {loggedIn && (
        <button className="logout-button" onClick={logoutClick}>
          Log Out
        </button>
      )}
    </div>
  );
}

export default Header;
