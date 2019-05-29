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
import socket_io from 'socket.io';


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

/*io.on('connection', function(socket){
    console.log('a user connected');
});*/

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

// socket.io
// const WebSocket = require('ws');
//
// const wss = new WebSocket.Server({ port: 3030 });
//
// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(data) {
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     });
//   });
// });
//const io = socket_io(app)
/*
const ht = require('http').Server(app);
const io = require('socket.io')(ht);
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('User Disconnected');
    });
    socket.on('example_message', function(msg){
        console.log('message: ' + msg);
    });
});
io.listen(8000);
*/
// Export our app for testing purposes
export default app;
