console.log((function (input) { 'use strict';

  var reduce = function (str) {
    var s = str;
    s = s.replace(/\{\}/g, '');
    s = s.replace(/\[\]/g, '');
    s = s.replace(/\(\)/g, '');
    return s;
  };

  var isValid = function (str) {
    if (!str.length) {
      return true;
    } else {
      var reduced = reduce(str);
      return (reduced === str) ? false : isValid(reduced);
    }
  };

  return isValid(input);

})('[[({}{})]{}]'));     // 1
// }('][(}))(}})]'));      // 0
// }('[(){}]'));           // 1
// }(']()'));              // 0
// }('{([]{})()}'));       // 1

