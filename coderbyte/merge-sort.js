(function ( arr ) {

  'use strict';

  var array;    // The array to be sorted

  //
  // Helpers
  //

  var randArray = function ( length ) {
    var arr = [];
    while ( arr.length < length ) {
      arr.push(Math.floor(Math.random() * 10));
    }
    return arr;
  };

  var split = function ( array ) {
    var splitAt = Math.floor(array.length / 2);
    return [
      array.slice(0, splitAt),
      array.slice(splitAt)
    ];
  };

  var merge = function ( a, b ) {
    var merged = [];
    while ( a.length && b.length ) {
      if ( a[0] < b[0] ) {
        merged.push(a.shift());
      } else {
        merged.push(b.shift());
      }
    }
    return merged.concat(a, b);
  };

  var mergeSort = function ( array ) {
    if ( array.length < 2 ) {
      return array;
    } else {
      return merge.apply(null, split(array).map(mergeSort));
    }
  };

  //
  // Output
  //

  array = arr || randArray(7);

  console.log('original:  ', array);
  console.log('merge sort:', mergeSort(array));
  console.log('native:    ', array.sort());

// })([6,5,3,1,8,7,2,4]);
})();
