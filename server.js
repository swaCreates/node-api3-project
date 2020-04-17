const express = require('express');
const helmet= require('helmet')
const posts_router= require('./posts/postRouter.js');
const users_router= require('./users/userRouter.js');
const logger= require('./custom_middleware/logger.js');
const welcome_router= require('./welcome/welcome-router.js');

const server = express();

// built-in middleware
server.use(express.json());

//third party middleware
server.use(helmet());

// custom middleware
server.use(logger)

// route handlers
server.use(welcome_router);
server.use('/users', users_router);

server.use((req, res) => {
	res.status(404).send(
      `<h4 align='center'>The url ${req.url.toUpperCase()} was not found.</h4>`
    )
});

module.exports = server;
