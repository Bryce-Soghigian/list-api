const router = require("express").Router();
const knex = require("../../config/knex-config");

/*

/:id get | gets all of the users that have a relationship with the user completed accepted reqeust so on
/:id post | posts a friend request to the database by user id to a user id
/:id put | allows user to accept of deny a friend request

*/

/**
 * /:id {post}
 * THis makes a friend request to a user
 * params {id} === user that is making the request
 * body {
 * "friend_username":"some user"// friend that the user is trying to request
 * }
 */
router.post("/:id", (req, res) => {
  const user = req.params.id;

  knex("friends")
    .insert({
      my_id: user,
      friend_username: req.body.friend_username,
      status: req.body.status,
    })
    .returning("*")
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ err_message: err });
    });
});
/**
 * get /:id
 * gets all users requests by user id
 */
router.get("/:id", (req, res) => {
  knex
    .select("*")
    .where("friends.id", req.params.id)
    .from("friends")
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/**
 * put /:id
 * updates by request id
 */
router.put("/:id", (req, res) => {
  knex("friends")
    .where({ id: req.params.id })
    .update(req.body)
    .returning("*")
    .then((data) => {
      res.status(200).json(data[0].status);
    })
    .catch((err) => {
      res.status(500).json({ err_message: err });
    });
});

module.exports = router;
