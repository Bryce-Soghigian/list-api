const express = require("express")
const cors = require("cors")
const helmet = require("helmet")


//==========Server Init ==========//
const server = express();
const PORT = process.env.PORT || 5555;

server.listen(PORT, () => {
    console.log(`=======...Server is running on ${PORT}...========`)
})
//=========Server Middleware and config=====//
server.use(cors(),helmet(),express.json())

//===========Server UP endpoint========================//
server.get("/",(req,res) => {
    res.json({is_server_up:"true"})
})