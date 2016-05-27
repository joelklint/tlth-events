import express from 'express';
import winston from 'winston';

const app = express();
app.use(express.static('public'));

import viewEngine from './config/viewEngine';
viewEngine(app);

import applyPreRouteMiddleware from './middleware/preRoute';
applyPreRouteMiddleware(app);

import applyRoutes from './routes';
applyRoutes(app);

import applyPostRouteMiddleware from './middleware/postRoute';
applyPostRouteMiddleware(app);

export default app;
