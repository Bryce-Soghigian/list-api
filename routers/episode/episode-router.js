const router = require("express").Router()
knex = require("../../config/knex-config");

router.post("/",(req,res) => {
    knex("listitems")
    .insert(req.body)
    .returning("*")
    .then(res => {
        console.log(JSON.stringify(res))
        res.status(200).json(res)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })


})




module.exports = router