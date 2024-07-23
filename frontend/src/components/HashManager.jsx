import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SettingsPopup } from "./SettingsPopups";
// Import other popup components as needed

const HashManager = () => {
  const location = useLocation();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    setCurrentHash(location.hash);
  }, [location]);

  const closePopup = () => {
    window.location.hash = "";
  };

  const renderPopup = () => {
    switch (currentHash) {
      case "#settings":
        return <SettingsPopup onClose={closePopup} />;
      // Add cases for other hashes
      // case '#profile':
      //   return <ProfilePopup onClose={closePopup} />;
      default:
        return null;
    }
  };

  return <>{renderPopup()}</>;
};

export default HashManager;
