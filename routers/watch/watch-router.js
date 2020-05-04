const router = require('express').Router()
knex = require("../../config/knex-config");



router.get("/",(req,res) => {
    knex.select("*").from("watch")
    .then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json({err_message:err})
    })
})

router.post("/", (req,res) => {
knex.select()
.from("watch")
.insert({
    user_id: req.body.user_id,
    list_item:req.body.list_item,
    status: req.body.status
}).returning("*")
.then(data => {
    console.log(data)
    res.status(200).json(data)
}).catch(err => {
    res.status(500).json({err_message:err})
})
})
router.put("/:id",(req,res) =>{
    const {id} = req.params;
    knex("watch").where({id})
    .then(changed => {
        res.status(202).json(changed)
    }).catch(err => {
        res.status(500).json({err_message:err})
    })
})
//Get watch list of a user by id
router.get("/:id", (req,res) => {
    const {id} = req.params
    knex.select()
    .from("watch")
    .where("watch.user_id", id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json(data)
    })
})




module.exports = router