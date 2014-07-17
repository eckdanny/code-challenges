/**
 * Write a method to generate the nth Fibonacci number
 */
(function (index) { 'use strict';

  var Fib = function () {
    var memo = {};
    return function fn (n) {

      if (memo[n]) {
        return memo[n];
      }

      if (n < 2) {
        return 1;
      } else {
        return fn(n - 1) + fn(n - 2);
      }
    }
  };

  console.log(Fib()(index));

})(6);
