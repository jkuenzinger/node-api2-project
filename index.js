const express = require("express");
const userRouter = require("./db/router.js");

const server = express();

server.use(express.json());

server.use("/api/posts", userRouter);


server.listen(4000, () => {
    console.log("server runing on http://localhost:4000")
})