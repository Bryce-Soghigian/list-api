const router = require("express").Router();
const Users = require("./user-model");
knex = require("../../config/knex-config");

router.get("/", (req, res) => {
  Users.getUsers()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ err_message: err });
    });
});
//=========Function that hashes password
const hashFunction = (password) => {};
const unHash = (password) => {};

router.post("/signup", (req, res) => {
  if (req.body.password && req.body.username) {
    //Password hashing logic
    req.body.password = hashFunction(req.body.password);
    const { body } = req.body;

    Users.addUser(body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ err_message: err });
      });
  } else {
    res.status(400).json({ err_message: "PLEASE ENTER A VALID PASSWORD" });
  }
});

router.get("/login", (req, res) => {
  //Get the user from the database
  //if user exists we want to authenticate the user by returning a web token
  //else we want to tell them its an invalid password
  if (!req.body.username) {
    res.status(500).json({ err_message: "PLEASE ENTER A USERNAME" });
  }
  if (!req.body.password) {
    res.status(500).json({ err_message: "PLEASE ENTER A VALID PASSWORD" });
  }
  req.password = unHash(req.password);
  const { body } = req.body;
  Users.getUser(body)
    .then((data) => {
      //return jwt
    })
    .catch((err) => {
      res.status(500).json({ err_message: err });
    });
});
//
router.post("/", async (req, res) => {
  knex("listitems")
    .insert({
      listItem: req.body.listItem,
      description: req.body.description,
    })
    .returning("*")
    .then((postId) => {
      res.status(200).json(postId);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
