/**
 * Write a method that returns all subsets of a set
 */
(function (set) { 'use strict';

  function getSubsets (set) {

    // Create array from string
    set = set.split('');

    // Combinations of two sets
    var combine = function combineFn (arr1, arr2) {
      return [arr1].concat(arr2).concat(
        arr2.map(function (el) {
          return arr1.concat(el);
        })
      );
    };

    // Recurse to create smaller sets
    var extract = function extractFn (set) {
      if (set.length < 3) {
        // Base Case
        return [
          [set[0]],
          [set[1]],
          [set[0], set[1]]
        ];
      } else {
        // Recursive Call
        return combine([set[0]], extract(set.slice(1)));
      }
    };

    return extract(set)
  }

  console.log(getSubsets(set));

})('abcde');

