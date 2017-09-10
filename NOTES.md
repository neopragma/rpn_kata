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

