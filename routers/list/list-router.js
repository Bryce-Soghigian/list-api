const router = require("express").Router()
knex = require("../../config/knex-config");
// const verifyToken = require("../../middleware/verifyToken")
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

router.get("/tier/:tier", async (req,res) => {
let tier = req.body.tier
  knex.select()
    .from("listitems")
    .where("listitems.rating", tier)
    .then(data => {
      console.log("=======Tier Data========")
      console.log(data)
      console.log("======================")
      res.status(200).json(data)
  }).catch(err => {
      console.log(err)
      res.status(500).json({err_message:err})
  })
})

//======Delete a list item by id ======//
router.delete("/:itemid", async(req,res) => {

const {itemid} = req.params
knex.select()
    .from("listitems")
    .where("listitems.id", itemid)
    .del()
    .then(res => {
      res.status(202).json(res)
    }).catch(err => {
      console.log(err)
      res.status(200).json("deleted")
    })
})
//=======Updates by ID ===========//
router.put("/:id", (req,res) => {
  knex("listitems").where({id:req.params.id}).update(req.body).returning("*")
    .then((postId) => {
      res.status(200).json(postId);
    })
    .catch((error) => console.log(error));
})

//======Post a new listitem========//
router.post("/", (req, res) => {
    knex("listitems")
      .insert({
        listItem: req.body.listItem,
        description: req.body.description,
        genre:req.body.genre,
        rating:req.body.rating,
        user_id: req.body.userId
      })
      .returning("*")
      .then((postId) => {
        res.status(200).json(postId);
      })
      .catch((error) => console.log(error));
  });

  module.exports = router