const router = require("express").Router()
const knex = require("../../config/knex-config")

/**
 * GETS TIER
 */
router.get("/:tier", (req,res) => {
    knex.select("*")
    .where("listitems.rating", req.params.tier.toString().toUpperCase())
    .from("listitems")
    .then(data => {
        console.log(`==========${req.params.tier} tier data=========`)
        console.log(data)
        res.status(200).json(data)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err_message:err})
    })
})



module.exports = router