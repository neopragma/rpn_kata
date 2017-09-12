# Notes

I'm going to do this with JavaScript, starting with the basic RPN engine and
then extending that out to a service, and then a quick front-end.

I'm pressed for time, task started interspersed with getting ready to leave
shared office, then drove out for a meeting and got back late.

2017-09-07:

- set up some base things, disappointed about not being able to reconcile
  linter with the way mocha runs the tests - pre v3 mocha I used to be able to
  import describe and it in order to not leave hanging undefined method refs
  in the test code :-(
- heh, .deep.equal does value equality :) .equal does object quality
- working through RPN logic, maybe let's make the method that calculates the
  result of a stack of numbers/operations a pure function
- want a validator for the items on the stack; what types should we allow there?
  strings & numerics? just strings?
  - let's allow numerics unless this seems to get hairy
  - yeah, I like regex, looks a bit "clever", but I'll leave it for now, use a
    a var name to express the intent
  - hmm duplicate knowledge of operators between tests / class, let's
    reduce that
  - Yay, wacked the regex! :D going to use op consts, I like that better maybe

- set up travis
- added full input array validation

2017-09-08:

Full day at client site, then drive Toronto to Cornwall (4h) for Play 4 Agile
North America.

- refactored validation methods a bit for clarity
- added to codeclimate account
- added quick links for status images

2017-09-09:

Lost the whole day at P4ANA; just couldn't get the time away.

OK I lied, had to get this one out of the way...

- separated RPNLogic module from spec
- Refactor: let's create a stack so we can do some work, and instead of
  returning input (degenerate) let's copy onto the stack.
- let's see about pulling a strategy class out of this...
- into a Map() ? Nope, don't like iterators, let's use Object
- do we like this Strategy thingie? ...
- adding a subtract strategy exposed a bug in operand ordering, fixed that up
- is assembling the strategies the concern of the RPNLogic?
- pausing to catch up with folks at P4ANA

2017-09-10:

P4ANA wrapup + travel, exhausted.

2017-09-11:

Happy Monday!

Let's see about putting a service in front of this. Let's say src/server.js
runs Express and processes API calls. We'll use path versioning, and we'll
use the base url /api

I'd like to have a stateless API to start for simplicity, so we'll just bridge
the full reduce function to it.

ie.

curl -X POST -d '[1,2,"+"]' -H 'accept: application/json' \
 -H 'content-type: application/json' http://localhost:3000/api/v1/reduce
==> [3]

Hmm. Haven't used Express before :) seems simple enough...
- Let's spike!
- OK got it worked out, going to use the body-parser middleware to reduce work
- Going to just commit the spike as it's only a couple files, I'll refactor
  the mess
- Not gonna mock what I don't own, express wrapper is pretty paper thin anyways
- pausing, apprentice needs help, he's all jazzed about serverless apps after
  his last tech meetup... oh, youthful enthusiasm :P

Hmm. What kind of front-end. Aurelia looks like it's getting stale. Let's use
React, never did that before :) could get messy so going to spike this too.

- oh cool, a controlled input will let me filter out non-numeric characters
  from the numeric input
- oi OK react will be a teeny bit hairy, but I think I have enough; going to
  start this in a single component and see how it does; pausing for dinner and
  to reflect

- ok let's blow out a single component and see what this looks like
- pausing on refinement realizing haven't completed CD stage of pipeline

