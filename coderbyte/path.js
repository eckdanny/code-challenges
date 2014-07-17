var input = ["5","A","B","C","D","F","A-B","A-C","B-C","C-D","D-F"];
var test  = "A-C-D-F";

var input = ["4","X","Y","Z","W","X-Y","Y-Z","X-W"];
var test  = "X-W";

(function solve (input) {

  // Process input data
  var count = input.shift()
    , nodes = input.splice(0, count)
    , edges = input.map(function (str) {
      return str.split('-');
    });

  // Returns array of adjacent nodes from a src node
  var getNeighbors = function (node) {
    return edges.reduce(function (neighbors, pair) {

      var isCounted = function (node) {
        return neighbors.indexOf(node) > -1 || neighbors.indexOf(node) > -1;
      };

      if (node == pair[0] && !isCounted(pair[1])) {
        neighbors.push(pair[1]);
      } else if (node == pair[1] && !isCounted(pair[0])) {
        neighbors.push(pair[0]);
      }

      return neighbors;
    }, []);
  }

  var trace = function () {

    var prev = function (node) {
      return paths[node].prev;
    }

    var prevNode, stack = [nodes[count - 1]];

    while (prevNode = prev(stack[0])) {
      stack.unshift(prevNode);
    };

    return stack;
  }

  // State Table
  var paths = {};

  // Sets the initial step weights
  for (var i in nodes) {
    paths[nodes[i]] = {
      prev: null,
      steps: i == 0 ? 0 : Infinity
    };
  }

  var curNode
    , fringe = [nodes[0]];

  while (curNode = fringe.shift()) {
    getNeighbors(curNode).forEach(function (node) {
      if (paths[curNode].steps + 1 < paths[node].steps) {
        paths[node].steps = paths[curNode].steps + 1;
        paths[node].prev  = curNode;
        fringe.push(node);
      }
    });
  }

  var trace = trace();
  if (nodes[0] !== trace[0] || nodes[nodes.length - 1] !== trace[trace.length - 1]) {
    return -1;
  } else {
    return trace.join('-');
  }

})(input);
