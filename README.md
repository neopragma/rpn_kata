# RPN Implementation

[![Build Status](https://travis-ci.org/svetzal/rpn_kata.svg?branch=master)](https://travis-ci.org/svetzal/rpn_kata)
[![Code Climate](https://codeclimate.com/github/svetzal/rpn_kata.png)](https://codeclimate.com/github/svetzal/rpn_kata)

This was a fun little coding exercise meant to practice setting up a CI and CD
pipeline for a web service and front-end web app that implements an RPN
calculator.

I decided to implemented it with NodeJS and the Express server to serve both
the API and the static front-end files, and used React to implement a simple
Single-Page-App for the front-end.

In terms of the build pipeline, I decided to refresh myself on travis-ci for
the build and test-run, codeclimate for static analysis, and heroku still seems
nice as a free path for proof-of-concept prototypes.

- commit changes to github
    - triggers travis-ci build (tests under Node 6 and 8)
        - success triggers codeclimate
        - success triggers heroku deployment

I stopped short of UI testing, I tend to use a Chef-built X11 vfb / headless
environment for browser testing, but it's a lot of overhead for this and doesn't
fit the travis pipeline as-is. Unsure of possible open-source friendly test
environments out there (but I didn't go looking, perhaps another day).

## API

There is a single API point at `/api/v1/reduce` that accepts a `POST` request
containing a JSON encoded array that represents the stack of elements to
process with the RPN algorithm.

The only content-type accepted and responded with at this time is
`application/json`.

If the stack sent is invalid, an http status 400 will be returned, along with
the original input data.

Sample requests and responses:

- `[]` -> `[]`
- `[1,2]` -> `[1,2]`
- `[1,2,"+"]` -> `[3]`
- `[1,2,3,"+","+"]` -> `[6]`

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