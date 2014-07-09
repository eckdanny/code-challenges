console.log((function NoughtsDeterminer(strArr) {

  var indices = function (strArr, match) {
    return strArr.reduce(function (indices, val, index) {
      if (match === val) {
        indices.push(index);
      }
      return indices;
    }, []);
  };

  var horiz = function (index) {
    return [
      [0, 1, 2],
      [4, 5, 6],
      [8, 9, 10]
    ][Math.floor((index + 1) / 4)];
  };

  var vert = function (index) {
    return [
      [0, 4, 8],
      [1, 5, 9],
      [2, 6, 10]
    ][index%4];
  };

  var diags = function (index) {
    var diags = []
      , ctrls = [ [8, 5, 2],
                  [0, 5, 10] ];

    for (i in ctrls) {
      if (-1 < ctrls[i].indexOf(index)) {
        diags.push(ctrls[i]);
      }
    }

    return diags;
  };

  var lines = function (index) {
    var lines = [];
    lines.push(horiz(index));
    lines.push(vert(index));
    diags(index).forEach(function (arr) {
      lines.push(arr);
    });
    return lines;
  };

  var isSame = function (index1, index2) {
    return strArr[index1] == strArr[index2] && ['X', 'O'].indexOf(strArr[index1]) > -1;
  }

  var win;
  indices(strArr, '-').forEach(function (index) {
    lines(index).forEach(function (line) {
      line.splice(line.indexOf(index), 1);
      if (isSame(line[0], line[1])) {
        win = index;
      }
    });
  });
  return win;

// })(["X","-","O","<>","-","-","O","<>","-","-","X"]);
})(["X","O","X","<>","-","O","O","<>","X","X","O"]));
