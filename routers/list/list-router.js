const router = require("express").Router()
knex = require("../../config/knex-config");
const DB = require("./list-models")
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

//======Delete a list item by id ======//
router.delete("/:itemid", async(req,res) => {
  // let userId = parseInt(req.params.userid)
//get the list item by id
const {itemid} = req.params
knex.select()
    .from("listitems")
    .where("listitems.id", itemid)
    .del()
    .then(res => {
      res.status(202).json(res)
    }).catch(err => {
      res.status(200).json("deleted")
    })
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
  //=========Get list items========
  // router.get("/items",async (req,res) => {
  //   await DB.ListItems()
  //   .then(data => {
  //       res.status(200).json(data)
  //   }).catch(err => {
  //       res.status(500).json(err)
  //   })
  // })

  module.exports = router