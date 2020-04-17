const express = require('express');
const postDB= require('./postDb.js');

const router = express.Router();

// not sure I completed sub-routes correctly

router.get('/', async (req, res) => {
  try{
    const postsData= await postDB.get();
    return res.json(postsData);
  } catch(err){
    console.log('Error getting posts:', err);
    next(err);
  }
});

router.get('/:id', validatePostId(), (req, res) => {
  res.json(req.post);
});

router.delete('/:id', validatePostId(), async (req, res) => {
  try{
    await postDB.remove(req.params.id);
    res.status(204).end();
  } catch(err){
    console.log('Error deleting:', err);
    next(err);
  }
});

router.put('/:id', validatePost(), validatePostId(), async (req, res) => {
  try{
    const updatedPost= await postDB.update(req.params.id, req.body);
    res.json(updatedPost);
  } catch(err){
    console.log('Error updating post:', err);
    next(err);
  }
});

// custom middleware

function validatePostId() {
  return async (req, res, next) =>{
    try{
      const postID= await postDB.getById(req.params.id);
      if(postID){
        req.post= postID;
        next();
      } else{
        res.status(404).json({
          request_errorMessage: 'Invalid post id or post does not exist'
        })
      }
    } catch(err){
      console.log('Error validating post id:', err);
      next(err);
    }
  }
}

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
