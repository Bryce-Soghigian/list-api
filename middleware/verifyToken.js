const express = require("express");
jwt = require("jsonwebtoken")
function verifyToken(req, response, next) {

    

    if (!req.headers.authorization) {
        console.log("Because you have no req.headers.auth")
        return response.status(401).send('Unauthorized req');

    }

    let token = req.headers.authorization.split(' ')[1];


    if (token === "null") {
        console.log("Because req.headers/auth is null")
        return response.status(401).send("Unauthorized req");
    }

    let payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
        console.log("Because you have no payload")
        return response.status(401).send("Unauthorized req");
    }


    req.userId = payload.user[0].id;
   
    next();
}



module.exports = verifyToken;