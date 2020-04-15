const express = require('express');

const server = express();

// built-in middleware
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h4>Let's write some middleware!</h4>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
