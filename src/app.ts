import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone"
import { typeDefs } from './schema/schema';
import { resolvers } from './resolver/resolver'



import reportsRouter from './routes/reports';
import doctorsRouter from './routes/doctors';
import homePage from './routes/page'
dotenv.config()

const app = express();

// const DATABASE_URL = 

mongoose.connect(process.env.DATABASE_URL as string).then(()=>{
  console.log('database connected')
})
.catch(()=>{
  console.log('error connecting to database')
})




const server = new ApolloServer({
  typeDefs,
  resolvers
})

async function myserver() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 },
  })
  console.log(url)
  return url
}
myserver()


// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/reports', reportsRouter);
app.use('/doctors', doctorsRouter);
app.use('/', homePage)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:createError.HttpError, req:Request, res:Response, next:NextFunction):any {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
