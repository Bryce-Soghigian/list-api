const router = require("express").Router();
const Users = require("./user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("./secrets")

//========Gets users and all of their data
router.get("/", (req, res) => {
  Users.getUsers()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ err_message: err });
    });
});
router.post("/signup", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  router.post("/login", (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          const id = user.id
          res.status(200).json({
            user_id: id,
            message: `Welcome ${user.username}!`,
            token
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "There was an error logging you in" });
      });
  });
  
  function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username
    };
  
    const options = {
      expiresIn: "8h"
    };
  
    return jwt.sign(payload, secrets.jwtSecret, options);
  }
  


module.exports = router;
