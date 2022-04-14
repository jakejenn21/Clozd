const express = require("express");
const api_helper = require("./API");
const app = express();
const port = process.env.PORT || 3700;

app.use(express.json());

// global users array
let users = [];

/* get users endpoint */
// Main page
// ○ List summary - include full name, email, and city/country
// ● Details page
// ○ Include photo, full name, email, full address, phone number, and date of birth
app.get("/users", (req, res) => {
  console.log("entered get users");
  //'https://randomuser.me/api/?exc=gender,registered,login,cell,nat?results=5000'

  if (users.length != 0) {
    res.json(users);
  } else {
    api_helper
      .make_API_call("https://randomuser.me/api/?results=5000")
      .then((response) => {
        let resUsers = response.results;

        users = resUsers.map((user) => {
          return {
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
        console.log(users);
        res.json(users);
      })
      .catch((error) => {
        console.log("error:", error);
        res.send(error);
      });
  }

  // api_helper.make_API_call('https://randomuser.me/api/?results=2000')
  // .then(response => {
  //     let resUsers = response.results;

  //     let additionalUsers = resUsers.map((user)=>{
  //         return {
  //             photo: user.picture.thumbnail,
  //             fullName: user.name.first + " " + user.name.last,
  //             email: user.email,
  //             fullAddress: user.location.street.number + " " + user.location.street.name +
  //             " " + user.location.city + "," + user.location.state + " " + user.location.postcode,
  //             city: user.location.city,
  //             country: user.location.timezone.description,
  //             phoneNumber: user.phone,
  //             dob: user.dob.date
  //         }

  //     })

  //     users.push(additionalUsers);
  //     console.log(users);
  //     res.json(users);

  // })
  // .catch(error => {
  //     console.log("error:", error)
  //     res.send(error);
  // })
});

// server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});
