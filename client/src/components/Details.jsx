import React from "react";
import "../styles/Details.css"
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function Details({ users }) {

  let params = useParams();
  let user = users.find((user) => user.id === parseInt(params.id));
  const navigate = useNavigate();

  let date = "0" + user.dob.slice(0, 9).split("-").reverse().join("-")

  function handleBackButtonClick() {
    navigate("/")
  }

  return (
    <>
      <button type="button" onClick={handleBackButtonClick}>
        <ArrowBackIcon />
      </button>
      <h1>Details</h1>
      <div className="details-container">
        <img src={user.photo} alt="profile pic"></img>
        <p>{user.fullName}</p>
        <p>{user.email}</p>
        <p>{user.fullAddress}</p>
        <p>{user.phoneNumber}</p>
        <p>Date of Birth: {date}</p>
      </div>
    </>
  );
}
