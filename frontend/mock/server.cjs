const jsonServer = require('json-server');
const middleware = require('./middleware.cjs');
const routes = require('./routes.json');
const path = require('path');

const server = jsonServer.create();

server.use(jsonServer.defaults());

server.use(jsonServer.bodyParser);

server.use(jsonServer.rewriter(routes));

server.use((req, res, next) => {
    console.log('After body parsing, req.body:', req.body);
    next();
});

server.use(middleware);

const router = jsonServer.router(path.join(__dirname, 'db.json'));

server.use(router);

const port = 8080;
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
    console.log(`API is available at http://localhost:${port}/api`);
});