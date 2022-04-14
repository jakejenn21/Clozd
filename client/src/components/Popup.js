import React, { useState } from "react";

// popup component
export default function Popup({ togglePopup, user }) {
  return (
    <div className="modal-content">

      <div className="modal-header">
        <span class="close">&times;</span>
        <h2>Modal Header</h2>
      </div>

      <div class="modal-body">
        <p>Some text in the Modal Body</p>
        <p>Some other text...</p>
      </div>

      <div className="modal-footer">
        <button className="cancel-btn" onClick={togglePopup}>
          close
        </button>
      </div>
      
    </div>
  );
}
