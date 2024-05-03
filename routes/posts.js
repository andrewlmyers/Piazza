// Importing the Express library
const express = require('express');

// Creating a new Router
const router = express.Router();

// Importing the post from the model
const Post = require('../models/Post');
const { authenticateRole, isAdmin } = require('../middleware/authMiddleware'); // Ensure this path is correct

router.use(authenticateRole);

// POST (create data)
router.post('/', async(req, res) => {
    // Creating a JSON object for the database
    const postData = new Post({
        title:req.body.title,
        topic:req.body.topic,
        message:req.body.message,
        hashtags:req.body.hashtags
    });

    // Try to insert the data...
    try {
        const postToSave = await postData.save();
        res.send(postToSave);
    } catch (err) {
        res.send({message:err});
    }
});

// GET everything (read)
router.get('/', async(req, res) => {
    // Try to get the data
    try {
        const getPosts = await Post.find();
        res.send(getPosts);
    } catch (err) {
        res.send({message:err});
    }
});

// GET what the user requests (read)
router.get('/:postId', async(req, res) => {
    // Try to get the data
    try {
        const getPost = await Post.findById(req.params.postId);
        res.send(getPost);
    } catch (err) {
        res.send({message:err});
    }
});

// PATCH by id (update)
router.patch('/:postId', isAdmin, async(req, res) => {
    // Trying to update the post by id
    try {
        const updateByPostId = await Post.updateOne({_id:req.params.postId}, {$set: req.body});
        res.send(updateByPostId);
    } catch (err) {
        res.send({message:err});
    }
});

// DELETE one (delete)
router.delete('/:postId', isAdmin, async(req, res) => {
    try {
        const deletePostById = await Post.deleteOne({_id:req.params.postId});
        res.send(deletePostById);
    } catch (err) {
        res.send({message:err});
    }
});

// DELETE all (delete)
router.delete('/', isAdmin, async(req, res) => {
    try {
        const deletePost = await Post.deleteMany({});
        res.send(deletePost);
    } catch (err) {
        res.send({message:err});
    }
});

// Exporting the router
module.exports = router;