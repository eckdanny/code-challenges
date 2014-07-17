/**
 * Imagine a robot sitting on the upper left hand corner of an NxN grid The
 * robot can only move in two directions: right and down How many possible
 * paths are there for the robot? Imagine certain squares are “off limits”,
 * such that the robot can not step on them Design an algorithm to get all
 * possible paths for the robot.
 */
(function (N, offLimits) { 'use strict';

  var successes = [];

  var isOffLimits = function (x, y) {
    for (var i = 0; i < offLimits.length; i++) {
      if (x == offLimits[i][0] && y == offLimits[i][1]) {
        return true;
      }
    }
  };

  var isOutOfBounds = function (x, y) {
    return ( 0 > x || x > N || 0 > y || y > N);
  };

  (function startAt (x, y, path) {

    path = path || [];

    // Base case: Reached End
    if (N == x && N == y) {
      successes.push(path);
    }

    // Base case: not a valid square
    else if (isOffLimits(x, y) || isOutOfBounds(x,y)) {
      return void 0;
    }

    // Recursive Call
    else {
      startAt(x + 1, y, path.concat('R'));
      startAt(x, y + 1, path.concat('D'));
    }
  })(1, 1);

  console.log(successes);

})(3, [[3,2]]);
