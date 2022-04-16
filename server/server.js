const express = require("express");
const api_helper = require("./API");
const app = express();
const port = process.env.PORT || 3700;

app.use(express.json());

// global id
let id = 0;
let users = [];

/* get users endpoint */
// Main page
// ○ List summary - include full name, email, and city/country
// ● Details page
// ○ Include photo, full name, email, full address, phone number, and date of birth
app.get("/users/:results/:seed", (req, res) => {
  if (users.length == 7000) {
    res.json(users);
  } else {
    console.log("entered get users");
    //'https://randomuser.me/api/?exc=gender,registered,login,cell,nat?results=5000'
    let url = `https://randomuser.me/api/?nat=us&results=${req.params.results}&seed=${req.params.seed}`;
    api_helper
      .make_API_call(url)
      .then((response) => {
        let resUsers = response.results;
        console.log("response: ", resUsers);
        let newUsers = resUsers.map((user) => {
          id = id + 1;
          return {
            id: id,
            photo: user.picture.thumbnail,
            fullName: user.name.first + " " + user.name.last,
            email: user.email,
            fullAddress:
              user.location.street.number +
              " " +
              user.location.street.name +
              " " +
              user.location.city +
              ", " +
              user.location.state +
              " " +
              user.location.postcode,
            city: user.location.city,
            country: user.location.timezone.description,
            phoneNumber: user.phone,
            dob: user.dob.date,
          };
        });
        users = [...users, ...newUsers];
        console.log(newUsers);
        res.send(users);
      })
      .catch((error) => {
        console.log("error:", error);
        res.json(error);
      });
  }
});

// server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
