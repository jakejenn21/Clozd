import React from "react";
import "./App.css";
import { COLUMNS } from "./column";
import Details from "./components/Details";
import { PaginatedTable } from "./components/PaginatedTable";
import {Routes, Route } from "react-router-dom";

function App() {
  const [users, setUsers] = React.useState([]);

  function getUsers (results,seed){
    console.log("entering get user");
    console.log(results);
    fetch(`/users/${results}/${seed}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((newUsers) => {
        console.log("new users: ", newUsers)
        setUsers([...newUsers])
        console.log("all users", users)
      });
      
  }

  //fetch initial list of users from endpoint
  React.useEffect(() => {
    const run = async function(seed){
      await getUsers(3500,seed);
    }
    run("abc");
    run("def");

  }, []);



  return (
    <>
     <Routes>
      <Route path="/" element={<PaginatedTable data={users} columns={COLUMNS} /> }/>
      <Route path="details/:id" element={<Details users={users}/>}/>
    </Routes>
     </>
  );
}

export default App;
