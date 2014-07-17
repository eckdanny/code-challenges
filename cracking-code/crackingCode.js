'use strict';
// 1.1
function allUnique (str) {
  var used = {};
  for (var i = 0; i < str.length; i++) {
    if (used[str[i]]) {
      return false;
    } else {
      used[str[i]] = true;
    }
  }
  return true;
}

// 1.1 (no add'l data structures)
function noRpts (str) {
  for (var i = 0, N = str.length; i < N; i++) {
    for (var j = i + 1; j < N; j++) {
      if (str[i] === str[j]) {
        return false;
      }
    }
  }
  return true;
}

// 1.2
function revStr (str) {
  return str.split('').reverse().join('');
}

// 1.3
function rmDup (str) {
  var usage = {};
  var outStr = '';
  for (var i = 0; i < str.length; i++) {
    if (!usage[str[i]]) {
      usage[str[i]] = true;
      outStr += str[i];
    }
  }
  return outStr;
}

// 1.4
function isAnagram (str1, str2) {
  return str1.split('').sort().join('') === str2.split('').sort().join('');
}

// 1.5
function rplc20 (str) {
  return str.replace(/\s+/g, '%20');
}

// 1.6
function rotate (arr) {
  var trns = [];
  for (var j = 0, J = arr[0].length; j < J; j++) {
    for (var i = 0, I = arr.length; i < I; i++) {
      if (!trns[j]) {
        trns[j] = [];
      }
      trns[j][J - i] = arr[i][j];
    }
  }
  return trns;
}


// 1.6 (in place)

// 1.7
function zeroRowCol (arr) {

  var i, j, M, N, zeros;

  zeros = {
    rows: {},
    cols: {}
  };

  // Determine i* and j* where zeros should occur
  for (i = 0, M = arr.length; i < M; i++) {
    for (j = 0, N = arr[0].length; j < N; j++) {
      if (0 === arr[i][j]) {
        zeros.rows[i] = true;
        zeros.cols[j] = true;
      }
    }
  }

  // Insert zeros
  for (i = 0, M = arr.length; i < M; i++) {
    for (j = 0, N = arr[0].length; j < N; j++) {
      if (zeros.rows[i] || zeros.cols[j]) {
        arr[i][j] = 0;
      }
    }
  }
}

// 1.8
function isRotation (str1, str2) {
  var isSubstring = function (s1, s2) {};
  return isSubstring(str1, st2 + str2);
}

//
// Chapter 2: Linked Lists
//

// 2.1
var remDups = function (arr) {
  var isUsed = {};
  return arr.filter(function (val) {
    if (!isUsed[val]) {
      isUsed[val] = true;
      return true;
    }
  });
};

