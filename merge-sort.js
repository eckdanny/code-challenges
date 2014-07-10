(function () {

  'use strict';

  var randArray = function ( length ) {
    var arr = [];
    while (arr.length < length) {
      arr.push(Math.floor(Math.random() * 10));
    }
    return arr;
  };

  // var myArray = [6,5,3,1,8,7,2,4];
  var myArray = randArray(12);

  var split = function ( array ) {
    var splitAt = Math.floor(array.length / 2);
    return [
      array.slice(0, splitAt),
      array.slice(splitAt)
    ];
  };

  var merge = function ( a, b ) {
    var merged = [];
    while (a.length && b.length) {
      if (a[0] < b[0]) {
        merged.push(a.shift());
      } else {
        merged.push(b.shift());
      }
    }
    return merged.concat(a, b);
  };

  var mergeSort = function ( array ) {
    if (array.length < 2) {
      return array;
    } else {
      var arrays = split(array);
      var a = arrays[0];
      var b = arrays[1];
      return merge(mergeSort(a), mergeSort(b));
    }
  };

  console.log('original:  ', myArray);
  console.log('merge sort:', mergeSort(myArray));
  console.log('native:    ', myArray.sort());

})();
