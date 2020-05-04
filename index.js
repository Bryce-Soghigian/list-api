const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const userRouter = require("./routers/users/user-router")
const listRouter = require("./routers/list/list-router")
const episodeRouter = require("./routers/episode/episode-router")
const watchRouter = require("./routers/watch/watch-router")
const tierRouter = require("./routers/tier/tier.js")
const friendRouter = require("./routers/friend/friend")
//==========Server Init ==========//
const server = express();
const PORT = process.env.PORT || 5555;

server.listen(PORT, () => {
    console.log(`=======...Server is running on ${PORT}...========`)
})
//=========Server Middleware and config=====//
server.use(cors(),helmet(),express.json())
server.use("/user",userRouter)
server.use("/list",listRouter)
server.use("/episode",episodeRouter)
server.use("/watch", watchRouter)
server.use("/tier", tierRouter)
server.use("/friend", friendRouter)
//===========Server UP endpoint========================//
server.get("/",(req,res) => {
    res.json({is_server_up:"true"})
})