const express = require('express');
const db= require('./userDb.js');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', async (req, res) => {
  try{
    const usersData= await db.get()
    return res.json(usersData);
  } catch (err){
    next(err);
  }
});

router.get('/:id', validateUserId(), (req, res) => {
  res.json(req.user);
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId() {
  return async (req, res, next) =>{
    try{
      const usersById= await db.getById(req.params.id);
      if(usersById){
        req.user= usersById;
        next();
      } else{
        res.status(404).json({
          error_message: 'Invalid user id.'
        })
      }
    } catch(err){
      console.log(err);
      next(err);
    }
  }
}



function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
