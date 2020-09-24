const express = require("express");
const router = express.Router();
const db = require("../conf/database");
const { route } = require(".");
const { urlencoded } = require("express");

router.get("/getAllUsers", (req, res, next) => {
  db.query("SELECT * FROM users", (err, results, fields) => {
    console.log(results);
    res.send(results);
  });

  //   next(err);
  // });
});

// //ContentType: x - www - form - urlencoded;
// router.post("/createUser", (req, res, next) => {
//   if (err) {
//     next(err);
//   }
//   console.log(req.body);
//   let username = req.body.username;
//   let email = req.body.email;
//   let password = req.body.password;

//   //validate data, if bad, send response back
//   //res.redirect(/registration);

//   let baseSQL =
//     "INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now())";
//   db.query(baseSQL, [username, email, password]).then(([results, fields]) => {
//     if (results && results.affectedRows) {
//       res.send("user was made");
//     } else {
//       res.send("user was not made");
//     }
//   });
// });

module.exports = router;
