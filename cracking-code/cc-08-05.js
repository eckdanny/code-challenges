/**
 * Implement an algorithm to print all valid (e g , properly opened and closed)
 * combinations of n-pairs of parentheses.
 * EXAMPLE:
 *    input: 3 (eg; 3 pairs of parentheses)
 *    output: ()()(), ()(()), (())(), (()()), ((()))
 */
(function (N) { 'use strict';

  var parens = function parensFn (N) {

    // Found combinations
    var combs = [];

    // Recursively add '(' or ')' until N symbols are used. Record successes.
    var findCombs = function findCombsFn (str, open, closed) {

      str = str || '';
      open = open || 0;
      closed = closed || 0;

      if (closed > open) {
        // Do nothing (invalid syntax)
      } else if (open == N && closed == N) {
        // Base Case: Used all symbols and valid
        combs.push(str);
      } else {
        // Recurse
        if (N > open) {
          // Open
          findCombsFn(str + '(', open + 1, closed);
        }
        if (N > closed) {
          // Close
          findCombsFn(str + ')', open, closed +1);
        }
      }
    };

    findCombs();

    return combs;
  };

  console.log(parens(N));

})(3);
