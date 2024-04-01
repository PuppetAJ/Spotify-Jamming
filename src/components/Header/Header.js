import React from "react";

function Header({ loggedIn, logoutClick, userData }) {
  return (
    <div className="header">
      <h1 data-testid="header">
        Ja<span className="heading-color">mmm</span>ing
      </h1>
      {userData && !userData.error && loggedIn && (
        <button className="logout-button" onClick={logoutClick}>
          Log Out
        </button>
      )}
    </div>
  );
}

export default Header;
