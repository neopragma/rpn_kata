# Notes

I'm going to do this with JavaScript, starting with the basic RPN engine and
then extending that out to a service, and then a quick front-end.

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
