import React from "react";
import "./App.css";
import User from "./User";

function App() {
  const [users, setUsers] = React.useState([]);

  // fetch initial list of users from endpoint
  React.useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((newUsers) => setUsers(newUsers))
  }, []);

  return (

    <div className="list-container">

      <tr>
        <th>Full Name</th>
        <th>Email</th>
        <th>City/Country</th>
      </tr>
      {users.map((user, index) => {
        return (
          //user component

          <User
            key={index}
            user={user}
          />
        );
      })}
      </div>
  );
}

export default App;
