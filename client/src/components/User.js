import React from "react";
import "./App.css";
import Popup from "./Popup";

// user compoenet
export default function User({user}) {
  // popup state
  const [showPopupUser, setShowPopupUser] = React.useState(false);

  // toggle popup handler
  const togglePopup = () => {
    setShowPopupUser(!showPopupUser);
  };

  return (
    <>
    {showPopupUser && (
      <Popup
        togglePopup={togglePopup}
        user={user}
      />
    )}
      <tr>
      <td>{user.fullName}</td>
      <td>{user.email}</td>
      <td>{user.city}</td>
      <td>
        <button onClick={togglePopup}>Details</button>
      </td>
      </tr>
      </>
  );
}
