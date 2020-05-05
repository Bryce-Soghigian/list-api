const router = require("express").Router();
knex = require("../../config/knex-config");





router.get("/", (req, res) => {
  knex
    .select("*")
    .from("episode")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//get a list of a series episodes
router.get("/:id", (req, res) => {
  const series_id  = req.params.id;
  knex
    .select("*")
    .from("episode")
    .where("list_item_id.id", series_id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  knex("episode")
    .insert({
      list_item_id: req.body.list_item_id,
      season_num: req.body.season_num,
      episode_num: req.body.episode_num,
      episode_description: req.body.episode_description,
      episode_rating: req.body.episode_rating,
    })
    .returning("*")
    .then((data) => {
      console.log(JSON.stringify(data));
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      // res.status(500).json(err)
    });
});

module.exports = router;
