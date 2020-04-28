const router = require("express").Router()
knex = require("../../config/knex-config");

router.post("/",  (req, res) => {
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

  module.exports = router