console.log((function CoinDeterminer (num) { 'use strict';

  var vals = [1, 5, 7, 9, 11];

  var mesh = [];

  //
  // Helpers
  //

  var plusVals = function( amt ) {
    return vals.map(function( val) {
      return amt + val;
    });
  };

  var lteqX = function( x ) {
    return function( arr ) {
      return arr.filter(function( element ) {
        return element <= x;
      });
    };
  };

  var lteqN = lteqX(num);

  var mkNode = function( value, weight, parent ) {
    return {
      value: value,
      weight: weight,
      parent: parent
    };
  };

  var getNode = function( value ) {
    var compareFn = function( el ) {
      return value === el.value;
    };
    for (var i = 0; i < mesh.length; i++) {
      if (compareFn(mesh[i])) {
        return mesh[i];
      }
    }
  };

  var makeNeighbors = function( node ) {
    return plusVals(node.value).map(function( value ) {
      return mkNode(value, node.weight + 1, node.value);
    }).filter(function( node ) {
      return node.value <= num;
    });
  };

  var addNeighbors = function( nodes ) {
    nodes.forEach(function( node ) {

      var existing = getNode(node.value);

      // If not present
      if (!existing) {
        mesh.push(node);
        return void 0;
      }

      // Update if already present and new weight is favorable (less)
      if (existing.weight > node.weight) {
        existing.parent = node.parent;
        existing.weight = node.weight;
      }

    });
    return mesh;
  };

  var getNodesByStep = function( step ) {
    return mesh.filter(function( el ) {
      return el.weight === step;
    });
  };

  var stack = function( destNode ) {
    var stack = [];
    var trace = function( node ) {
      stack.push(node);
      if (null === node.parent) {
        return stack;
      } else {
        return trace(getNode(node.parent));
      }
    };
    return trace(destNode);
  };

  var parts = function( stack ) {
    var parts = [];
    for ( var i = 0; i < stack.length - 1; i++ ) {
      parts.push(stack[i].value - stack[i+1].value);
    }
    return parts;
  };

  var add = function( el ) {
    addNeighbors(makeNeighbors(el));
  };

  //
  // Solver
  //

  mesh.push(mkNode(0, 0, null));

  var lengthApriori, step = 0;

  do {

    lengthApriori = mesh.length;

    getNodesByStep(step).forEach(add);

    step++;

  } while ( mesh.length > lengthApriori );

  if (!getNode(num)) {
    return 'impossible';
  } else {
    // return parts(stack(getNode(num)));
    return stack(getNode(num)).length - 1;
  }

})(36));
