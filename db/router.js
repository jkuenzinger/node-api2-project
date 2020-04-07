const express = require("express");
const db = require("./data/db.js");
const router = express.Router();


//going to write the all the endpoint for /api/posts

router.insert('/', (req, res) => {
    db.add(req.body)
        .then((Db) => {
            if (Db) {
            res.status(201).json(Db);
        } else {
            res.status(400).json({message: "please provide title and contents for this post"})
            }
        }) 
        .catch((error) => {
            console.log(error)
            res.status(500).json({ errorMessage: 'There was an error while saving the post to the database'})
        })
    })

router.insertComment('/:id/comments', (req, res) => {
    db.add(req.body)
        .then((Db) => {
            if (Db){
            res.status(201).json(Db)
            } else {
                res.status(400).json({message: "The post with the specified ID does not exist"})
            }
        })
        .catch((error))
        console.log(error)
        res.status(500).json({ errorMessage: 'There was an error while saving the comment to the database'})
})


router.find('/', (req,res) => {
    db.find(req.body)
})