const server= require('./server.js');
const port= 3005;

server.listen(port, () => {
    console.log(`\n Server listening on port ${port}... \n`);
});
