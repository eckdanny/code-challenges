(function () {

  'use strict';

  var args = function ( args ) {
    return [].slice.call(args).join(', ');
  };

  var r2 = function () {
    return [1, 2];
  };

  var times2 = function ( x ) {
    return x * 2;
  };

  var sum = function ( x, y ) {
    console.log('sum called with:', args(arguments));
    return x + y;
  };

  var out = sum.apply( null, r2().map(times2) );

  console.log('output:', out);

})();
