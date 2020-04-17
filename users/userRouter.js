const express = require('express');
const userDB= require('./userDb.js');
const postDB= require('../posts/postDb.js');

const router = express.Router();

// POST /users (create user)
router.post('/', validateUser(), async (req, res) => {
  try{
    const createdUser= await userDB.insert(req.body)
    res.status(201).json(createdUser);
  } catch(err){
    console.log('Error posting:', err);
    next(err);
  }
});

// POST /users/:id/posts (create post by user)
router.post('/:id/posts', validateUserId(), validatePost(), async (req, res) => {
  try{
    const createdPost= await postDB.insert({
      user_id: req.params.id,
      text: req.body.text, 
    });
    res.status(201).json(createdPost);
  } catch(err){
    console.log('Error creating post:', err);
    next(err);
  }
});

// GET /users (all users)
router.get('/', async (req, res) => {
  try{
    const usersData= await userDB.get();
    return res.json(usersData);
  } catch (err){
    next(err);
  }
});

// GET /users/:id (users by id)
router.get('/:id', validateUserId(), (req, res) => {
  res.json(req.user);
});

// GET /users/:id/posts (posts by user)
router.get('/:id/posts', validateUserId(), async (req, res) => {
  try{
    const userPost= await userDB.getUserPosts(req.params.id);
    res.json(userPost);
  } catch(err){
    console.log('Error fetching posts:', err);
    next(err);
  }
});

// DELETE /users/:id (delete user)
router.delete('/:id', (req, res) => {
  // do your magic!
});

// PUT /users/:id (update a user)
router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

// validating a user by its id
function validateUserId() {
  return async (req, res, next) =>{
    try{
      const usersById= await userDB.getById(req.params.id);
      if(usersById){
        req.user= usersById;
        next();
      } else{
        res.status(404).json({
          request_errorMessage: 'Invalid user id'
        })
      }
    } catch(err){
      console.log(err);
      next(err);
    }
  }
}

// validating if the user properly sent name data or none at all
function validateUser() {
  return (req, res, next) =>{
    if(!req.body){
      return res.status(400).json({
        error_message: 'Missing user data',
      })
    } else if(!req.body.name){
      return res.status(400).json({
        error_message: 'Missing required name field',
      })
    } else{
      next();
    }
  } 
}

// validating the users post body is filled and that there is a text property
function validatePost() {
  return (req, res, next) => {
    if(!req.body){
      return res.status(400).json({
        error_message: 'Missing post data',
      })
    }
    else if(!req.body.text){
      return res.status(400).json({
        error_message: 'Missing required text field',
      })
    } else{
      next();
    }
  }
}

module.exports = router;
