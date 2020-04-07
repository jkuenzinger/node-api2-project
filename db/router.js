const express = require("express");
const posts = require("../data/db.js");
const router = express.Router();


//going to write the all the endpoint for /api/posts

// adding a post
router.post('/', (req, res) => {
    console.log(req.body)
    const {title, contents}= req.body;
    !title || !contents
    ? res.status(400).json({ message: "Please provide title and contents"})
    :posts.insert(req.body)
    .then(posts =>{
        res.status(201).json(req.body);
    })
    .catch(err =>{
        res.status(500).json({message: "server error on post"})
    })
})
router.post('/:id/comments', (req,res)=>{
    const {id}=req.params;
    db.findPostComments(id)
    .then( comments =>{
        res.status(201).json(comments)
    })
    .catch(err=>{
        res.status(500).json({error: "The comment information could not be received "})
    })
})




//Get post with id

router.get('/:id', (req, res) => {
    const {id}=req.params;
    db.findById(id)
    .then(posts => {
        if(posts.length>0){
            res.status(200).json(posts)
        } else {
            res.status(404).json({error: 'the post with the specific id does not exist'})
        }
    })
    .catch(err=> {
        res.status(500).json({error:'the information was not recieved'})
    })
})
// get request by comment id
router.get("/:id/comments", (req, res) => {
    const {id}=req.params;
    db.findPostComments(id)
    .then(comment => {
        if(comment.length>0){
            res.status(200).json(comment)
        } else {
            res.status(404).json({error: ' the comment with the specific id doesnt exist'})
        }
    })
    .catch(err=>{
        res.status(500).json({error: 'the information was not recieved'})
    })
})

//get all posts 
router.get('/', (req, res) => {
    posts.find()
    .then(posts => {
        res.status(200).json(posts)   
     })
     .catch(err =>{
         res.status(500).json({message: 'server error'})
     })
})

router.put("/:id", (req,res)=>{
    const {id}=req.params;
    const body=req.body
    db.findById(id)
    .then(postid=>{
        if (!postid.length){
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        } 
        else if (!body.title || !body.contents ){
             res.status(400).json({errorMessage: "Please provide title and contents for the post."})
        } else if (body.title && body.contents){
            db.update(id, body)
                .then(put=>{
                    res.status(200).json(body)
                })
                .catch(err=>{
                    console.log(" error from update", err)
                    res.status(500).json({error : " The information cannot be modified"})
                })
        }})
    })




router.delete('/:id', (req, res)=>{
    const{id}= req.params
    posts.remove(id)
    .then(deleted =>{
        if (deleted){
            res.status(200).json({message: `Post was deleted`, deleted})
        } else {
            res.status(404).json({message:`The post specified id does not exist`})
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "Server error"})
    })
})




module.exports = router;