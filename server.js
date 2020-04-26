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
server.use('/api/users/posts', posts_router);
server.use('/api/users', users_router);

server.use((req, res) => {
	res.status(404).send(
      `<h4 align='center'>The url ${req.url.toUpperCase()} was not found.</h4>`
    )
});

// any time a middleware function calls `next` with a parameter, like `next(error)`,
// this middleware function will run. The stack skips directly down to it, like a
// catch statement.
server.use((err, req, res, next) => {
	console.log('Server error:', err)
	res.status(500).json({
		// we never want to expose the details of a server error
		// to the client, since it could potentially contain sensitive
		// info. Keep the message generic, and log out the details for
		// the developer to see.
		message: "Oops, Something went wrong",
	})
})

module.exports = server;
