const express = require('express');
const db= require('./userDb.js');

const router = express.Router();

// POST /users (create user)
router.post('/', validateUser(), async (req, res) => {
  try{
    const createUser= await db.insert(req.body)
    res.status(201).json(createUser);
  } catch(err){
    console.log('Error posting:', err);
    next(err);
  }
});

// POST /users/:id/posts (create post by user)
router.post('/:id/posts', (req, res) => {
  // do your magic!
});

// GET /users (all users)
router.get('/', async (req, res) => {
  try{
    const usersData= await db.get()
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
router.get('/:id/posts', (req, res) => {
  // do your magic!
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
      const usersById= await db.getById(req.params.id);
      if(usersById){
        req.user= usersById;
        next();
      } else{
        res.status(404).json({
          request_errorMessage: 'Invalid user id.'
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
    if(!req.body.name){
      return res.status(400).json({
        error_message: 'Missing user data.',
      })
    } else{
      next();
    }
  } 
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
