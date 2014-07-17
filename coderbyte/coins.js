console.log((function CoinDeterminer (num) { 'use strict';

  var vals = [1, 5, 7, 9, 11];

  // Returns an array mapping of scalar - vals where val_i > 0
  var subtrahends = function (num) {
    return vals.map(function (val) {
      return num - val;
    }).filter(function (val) {
      return val >= 0;
    });
  };

  var reductions = function (num, denoms, subs) {

    var curr
      , nexts
      , queue = [[num]]
      , done = []
      ;

    var append = function (arr) {
      queue.push(arr);
    };

    var concat = function (val) {
      return curr.concat(val);
    };

    while ( (curr = queue.pop()) ) {
      if (0 === curr[curr.length - 1]) {
        done.push(curr);
      }
      nexts = subs(curr[curr.length - 1]).map(concat).forEach(append);
    }

    return done;
  };

  var minLength = function (arrs) {
    return arrs.reduce(function (min, arr) {
      return arr.length - 1 < min ? arr.length - 1 : min;
    }, Infinity);
  };

  return minLength(reductions(num, vals, subtrahends));

})(19));
