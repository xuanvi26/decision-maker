"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

var pollId;

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/createpoll/step/1", (req, res) => {
  res.render("create-poll-step-1");
});

app.post('/createpoll/step/1', (req, res) => {
  knex('polls').insert({owner_name: req.body.ownerName, email: req.body.email, name: req.body.pollName, description: req.body.description}).returning('id').then(function(id){
    pollId = id;
    res.redirect(`/createpoll/step/2/poll/${id}`);
  });
});

app.get('/createpoll/step/2/poll/:id', (req, res) => {
  res.render('create-poll-step-2');
});

app.get('/polls/:id', async (req, res) => {
  const queryRes = await knex('answers').select('*');
  res.json(queryRes);
});

app.post('/createpoll/step/2/poll/:id', async (req, res) => {
  const answer = await knex('answers').insert({name: req.body.name, description: req.body.description, poll_id: req.params.id}).returning('*');
  res.json(answer[0]);
});

app.post('/createpoll/complete', (req, res) => {
  res.redirect('/createpoll/complete');
});

app.get('/createpoll/complete', (req, res) => {
  res.render('create-poll-complete', {pollId});
});

app.get('/answer/poll/:id', async (req, res) => {
  const answers = await knex.select('name', 'description').from('answers').where({poll_id: req.params.id});
  const pollName = await knex.select('name').from('polls').where({id: req.params.id});
  console.log(pollName);
  res.render('answer-poll', {answers, pollName});
});

app.post('/answer/complete', async (req, res) => {
  res.redirect('/answer/complete');
});

app.get('/answer/complete', (req, res) => {
  res.render('answer-complete');
});

app.get('/viewresults', (req, res) => {
  res.render('view-poll-results');
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
