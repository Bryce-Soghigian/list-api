const router = require("express").Router()
knex = require("../../config/knex-config");


//==========Get all the list items from a user=====//
router.get("/:id", async (req,res)=> {
let userId = parseInt(req.params.id)

knex.select()
    .from("listitems")
    .where("listitems.user_id", userId)
    .then(user => {
        console.log("=======User Data========")
        console.log(user)
        console.log("======================")
        res.status(200).json(user)
    }).catch(err => {
        console.log(err)
        res.status(500).json({err_message:err})
    })

})
//======Post a new listitem========//
router.post("/", (req, res) => {
    knex("listitems")
      .insert({
        listItem: req.body.listItem,
        description: req.body.description,
        user_id: req.body.userId
      })
      .returning("*")
      .then((postId) => {
        res.status(200).json(postId);
      })
      .catch((error) => console.log(error));
  });

  module.exports = router