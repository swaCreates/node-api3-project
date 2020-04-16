const express= require('express');

const router= express.Router();

router.get('/', (req, res) => {
    res.send(`<h4 align='center'>Let's write some middleware!</h4>`);
});
  
module.exports= router;