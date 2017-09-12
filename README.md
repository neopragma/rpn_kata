# RPN Implementation

[![Build Status](https://travis-ci.org/svetzal/rpn_kata.svg?branch=master)](https://travis-ci.org/svetzal/rpn_kata)
[![Code Climate](https://codeclimate.com/github/svetzal/rpn_kata.png)](https://codeclimate.com/github/svetzal/rpn_kata)

This was a fun little coding exercise meant to practice setting up a CI and CD
pipeline for a web service and front-end web app that implements an RPN
calculator.

## Setup

Make sure you have Node >= 6 installed and on your path.

Set up the project with:

```
npm install
```

## Tests

Run the unit tests with:

```
npm test
```

## Running Locally

Start the local server with:

```
npm start
```

Check the local API with:

```
curl -X POST -d '[1,2,"+"]' -H 'accept: application/json' \
 -H 'content-type: application/json' http://localhost:3000/api/v1/reduce
```

When running the local API, you can visit the front end by visiting
http://localhost:3000/

## Viewing in Production

You can view this app [in production at Heroku](https://pure-thicket-62410.herokuapp.com)