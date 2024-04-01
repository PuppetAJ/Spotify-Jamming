import React from "react";
import { Link1Icon } from "@radix-ui/react-icons";

function Login({ handleLogin }) {
  const showInfo = () => {
    alert(
      "This application uses oAuth2 to authenticate with Spotify. Information will only be saved on your local storage."
    );
  };

  return (
    <div className="login-modal container">
      <div className="welcome">Welcome!</div>
      <img
        src="./toppng.com-deezer-logo-white-png-spotify-icon-png-white-810x810.png"
        alt="Spotify Logo"
        className="spotify-logo"
      />
      <p className="login-blurb">
        In order to use this app please link your spotify account.
      </p>
      <button className="login-button" onClick={handleLogin}>
        <Link1Icon className="link-icon" /> Link Spotify
      </button>
      <p className="information" onClick={showInfo}>
        INFORMATION
      </p>
      <div className="welcome-bottom-bg"></div>
    </div>
  );
}

export default Login;
