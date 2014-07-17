/**
 * Write a method to compute all permutations of a string.
 */
(function (str) { 'use strict';

  var permutations = function permutationsFn (str) {

    // Create array from string
    str = str.split('');

    // Found permutations
    var perms = [];

    // Given 2 sets, traverse the RHS combining one letter at a time
    // recursively to the LHS until the RHS is empty.
    var findPerms = function findPermsFn (right, left) {
      var i;
      left = left || [];
      if (!right.length) {
        perms.push(left.join(''));
      } else {
        for (i = 0; i < right.length; i++) {
          findPermsFn(
            right.slice(i + 1).concat(right.slice(0, i)),
            left.concat(right[i])
          );
        }
      }
    };

    findPerms(str);

    return perms;
  };

  console.log(permutations(str));

})('abcde');
