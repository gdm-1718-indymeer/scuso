/* eslint-disable import/order */
/*
Import configuration
*/
import config from './config';

/*
Import the external libraries:
- http
- https
- express
- morgan
- chalk
- body-parser
- cors
- path
- ejs
- mongoose
- swagger
- passport
*/
import http from 'http';
/* import https from 'https'; */
import express from 'express';
import morgan from 'morgan';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import socket from 'socket.io';


/*
Import internal libraries
- apiV1Router
- logger
- Seeder
*/
import apiV1Router from './api/v1/routes';
import { logger } from './utilities';
import { Seeder } from './api/v1/database';

// Mongoose (MongoDb port)
const mongoDbConnectionString = config.mongoDbConnectionstring;
mongoose.connect(mongoDbConnectionString, {
    useNewUrlParser: true, useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', () => { logger.log({ level: 'error', message: 'MongoDb connection error' }); });
db.on('connected', () => { logger.log({ level: 'info', message: 'MongoDb connected' }); });

// Morgan middleware
const morganMiddleware = morgan((tokens, req, res) => {
    [
        '\n',
        chalk.hex('#ff4757').bold('🍄  Morgan --> '),
        chalk.hex('#34ace0').bold(tokens.method(req, res)),
        chalk.hex('#ffb142').bold(tokens.status(req, res)),
        chalk.hex('#ff5252').bold(tokens.url(req, res)),
        chalk.hex('#2ed573').bold(`${tokens['response-time'](req, res)}  ms`),
        chalk.hex('#f78fb3').bold(`@ ${tokens.date(req, res)}`),
        chalk.yellow(tokens['remote-addr'](req, res)),
        chalk.hex('#fffa65').bold(`from ${tokens.referrer(req, res)}`),
        chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
        '',
    ].join(' ');
});

// Cors options
const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token'],
};

// Swagger options
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'NMD MERN TEMPLATE API',
            version: '1.0.0',
            description: 'The Express API with autogenerated swagger doc',
        },
    },
    apis: [path.join(__dirname, './api/v1/routes/*.js')],
};
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// Create the express application
const app = express();
if (config.nodeEnvironment === 'Development') {
    app.use(morganMiddleware);
}
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', keepExtensions: true }));
app.set('views', path.join(__dirname, 'views')); // Set the default views directory to views folder
app.set('view engine', 'ejs'); // Set the view engine to ejs
if (config.nodeEnvironment === 'Production') {
    app.use(express.static(path.join(__dirname, 'client')));
} else {
    app.use(express.static(path.join(__dirname, '/../client/build')));
}
app.use(passport.initialize());
app.use('/static', express.static(path.join(__dirname, 'assets')));
app.use('/api/v1', apiV1Router);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpecs);
});
app.get('/docs', (req, res) => {
    res.render('redoc', {});
});

io.on('connection', function(socket){
    console.log('a user connected');
});

app.get('*', (req, res) => {
    if (config.nodeEnvironment === 'Production') {
        res.sendFile(path.join(__dirname, './client/index.html'));
    } else {
        res.sendFile(path.join(__dirname, '/../client/build/index.html'));
    }
});

// Global Application Error Handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    const obj = {
        error: {
            message: error.message,
            status: error.status,
            timestamp: new Date().getTime(),
        },
    };

    logger.log({ level: 'error', message: `${obj.error.message}` });

    if (req.xhr) {
        res.json(obj);
    } else if (!req.xhr && error.status === 404) {
        res.render('404', obj);
    } else {
        res.render('error', obj);
    }
    return next();
});

// Create the http Node.js server
const httpServer = http.Server(app);

// Launch the http server: ip and port
httpServer.listen(config.nodePort, config.nodeHostname, () => {
    logger.log({ level: 'info', message: `Server is running at http://${config.nodeHostname}:${config.nodePort} !` });
});

if (config.nodeEnvironment === 'Development') {
    const seeder = new Seeder();
    seeder.seed();
}

<<<<<<< HEAD
// socket.io
let numUsers = 0;
const server = http.createServer(app);

let io = socket(server);


io.on('connection', (socket) => {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data,
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
=======
const io = require('socket.io')();
io.on('connection', (client) => {
    // here you can start emitting events to the client
});
const port = 8000;
io.listen(port);
console.log('listening on port ', port);

>>>>>>> c726fcec7f1b6454126a7d854b4db90431aa4faa
// Export our app for testing purposes
export default app;
