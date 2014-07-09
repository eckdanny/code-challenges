console.log((function (num) { 'use strict';

  // var factorial = function (num) {
  //   var mem = 1, i = 1;
  //   do {
  //     mem = mem * i;
  //     i++;
  //   } while (i <= num);
  //   return mem;
  // };

  var factorial = function (num) {
    return num < 2 ? 1 : num * factorial(num - 1);
  };

  return factorial(num);

})(4));
