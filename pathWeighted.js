// http://coderbyte.com/CodingArea/GuestEditor.php?ct=Weighted%20Path&lan=JavaScript

var input =  ['4','A','B','C','D', 'A|B|2', 'C|B|11', 'C|D|3', 'B|D|2'];
var output = 'A-B-D';

console.log(output === (function (strArr) { 'use strict';

  // Process input data
  var count = strArr.shift()
    , nodes = strArr.splice(0, count)
    , edges = strArr.map(function (str) {
      var arr = str.split('|');
      arr[2] = arr[2] * 1;
      return arr;
    });

  //
  // Helper Fns
  //

  // Returns adjacent edges
  var getNeighbors = function (node) {
    return edges.reduce(function (neighbors, edge) {

      var isCounted = function (node) {
        return neighbors.indexOf(node) > -1;
      };

      if (node === edge[0] && !isCounted(edge[1])) {
        neighbors.push(edge[1]);
      } else if (node === edge[1] && !isCounted(edge[0])) {
        neighbors.push(edge[0]);
      }

      return neighbors;
    }, []);
  };

  // Returns weight for a path between two nodes
  var getEdgeWeight = function (a, b) {
    for (var i = 0, N = edges.length; i < N; i++) {
      if ([a, b].indexOf(edges[i][0]) > -1 && [a, b].indexOf(edges[i][1]) > -1) {
        return edges[i][2];
      }
    }
    throw "edge does not exist!";
  };

  // Returns the forward path created from backtrace
  var trace = function (nodes, path) {

    var prev = function (node) {
      return paths[node].prev;
    }

    var prevNode, stack = [nodes[count - 1]];

    while (prevNode = prev(stack[0])) {
      stack.unshift(prevNode);
    };

    return stack;
  };

  // Sets the initial step weights and traversals
  var init = function (nodes) {
    var paths = {};
    for (var i in nodes) {
      paths[nodes[i]] = {
        prev: null,
        steps: i == 0 ? 0 : Infinity
      };
    }
    return paths;
  };

  // Generate the output string
  var outStr = function (nodes, trace) {
    if (nodes[0] !== trace[0] || nodes[nodes.length - 1] !== trace[trace.length - 1]) {
      return -1;
    } else {
      return trace.join('-');
    }
  };

  //
  // Solve
  //

  var paths = init(nodes)
    , curNode
    , fringe = [nodes[0]]
    ;

  while (curNode = fringe.shift()) {
    getNeighbors(curNode).forEach(function (node) {
      if (paths[curNode].steps + getEdgeWeight(node, curNode) < paths[node].steps) {
        paths[node].steps = paths[curNode].steps + getEdgeWeight(node, curNode);
        paths[node].prev  = curNode;
        fringe.push(node);
      }
    });
  }

  return outStr(nodes, trace(nodes, paths));


})(input));
