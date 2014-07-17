console.log((function IntersectingLines(strArr) {

  var FracMath = (function () {

    function Fraction (num, den) {
      this.num = num;
      this.den = den || 1;
    };

    Fraction.prototype.simplify = function () {
      var smaller = Math.abs(this.num) > Math.abs(this.den) ?
                    Math.abs(this.den) :
                    Math.abs(this.num);
      while (smaller) {
        if (0 == this.num%smaller && 0 == this.den%smaller) {
          this.num /= smaller;
          this.den /= smaller;
          return this;
        }
        smaller--;
      }
    };

    Fraction.prototype.toString = function () {
      var out = '';
      var a = FracMath.create(this.num, this.den);
      a.simplify();
      out += FracMath.isPositive(a) ? '' : '-';
      out += Math.abs(a.num);
      out += 1 == Math.abs(a.den) ? '' : '/' + Math.abs(a.den);
      return out;
    };

    return {

      create: function () {

        var args = arguments;

        function _create () {
          return Fraction.apply(this, args)
        };

        _create.prototype = Fraction.prototype;

        return new _create();
      },

      isPositive: function (frac) {
        var ns = frac.num >= 0;
        var ds = frac.den >  0;
        return (ns == ds);
      },

      isEqual: function (frac1, frac2) {

        if (typeof frac1 !== typeof frac2) {
          return false;
        }

        var a = FracMath.create(frac1.num, frac1.den);
        var b = FracMath.create(frac2.num, frac2.den);

        return Math.abs(a.simplify().num) == Math.abs(b.simplify().num) &&
               Math.abs(a.den) == Math.abs(b.den) &&
               this.isPositive(a) == this.isPositive(b);
      },

      multiply: function (frac1, frac2) {
        return this.create(frac1.num * frac2.num, frac1.den * frac2.den);
      },

      divide: function (frac1, frac2) {
        return this.multiply(frac1, this.create(frac2.den, frac2.num));
      },

      add: function (frac1, frac2) {

        var a = this.create(frac1.num, frac1.den);
        var b = this.create(frac2.num, frac2.den);

        a.num *= frac2.den;
        a.den *= frac2.den;

        b.num *= frac1.den;
        b.den *= frac1.den;

        return this.create(a.num + b.num, a.den).simplify();
      },

      subtract: function (frac1, frac2) {
        var a = this.create(frac2.num * -1, frac2.den);
        return this.add(frac1, a);
      }

    };
  })();

  var setPoints = function (strArr) {
    return strArr.map(function (str) {
      return str.match(/\((\-?\d+),(\-?\d+)\)/).slice(1).map(function (val) {
        return val *= 1;
      });
    });
  };

  var m = function (pt2, pt1) {
    if (pt2[0] == pt1[0]) {
      return Infinity;
    }
    return FracMath.create( pt2[1] - pt1[1], pt2[0] - pt1[0] );
  }

  var b = function (pt, m) {

    // console.log('pt: ' + pt + ' m: ' + m);
    if (m == Infinity) {
      return NaN;
    } else if (Math.abs(m.num) == 0) {
      return FracMath.create(pt[1]);
    } else {
      var mx = FracMath.multiply(m, FracMath.create(pt[0], 1));
      var y = FracMath.create(pt[1]);
      var b = FracMath.subtract(y, mx);

      return FracMath.subtract(FracMath.create(pt[1]), mx);
      return FracMath.subtract(FracMath.create(pt[1]), FracMath.multiply(m, FracMath.create(pt[0])));
    }
  }

  var points = setPoints(strArr);

  // console.log(points);

  var m0 = m(points[1], points[0]);
  var m1 = m(points[3], points[2]);

  // console.log(m0);
  // console.log(m1);

  if (FracMath.isEqual(m0, m1)) {
    return 'no intersection';
  }

  var b0 = b(points[1], m0);
  var b1 = b(points[3], m1);

  // console.log('L0: y =', m0, 'x + ', b0);
  // console.log('L1: y =', m1, 'x + ', b1);

  var xInt, yInt;

  if (Infinity == m0) {
    // console.log('hello');
    xInt = FracMath.create(points[0][0]);
    // console.log('mx', FracMath.multiply(m1, xInt));
    // console.log(b1);
    yInt = FracMath.add(FracMath.multiply(m1, xInt), b1);
  } else if (Infinity == m1) {
    xInt = FracMath.create(points[2][0]);
    yInt = FracMath.add(FracMath.multiply(m0, xInt), b0);
  } else {
    xInt = FracMath.divide(FracMath.subtract(b1, b0), FracMath.subtract(m0, m1));
    yInt = FracMath.add(FracMath.multiply(m1, xInt), b1);
  }

  // console.log(xInt, yInt);


  return '(' + xInt.toString() + ',' + yInt.toString() + ')';

// })(["(9,-2)","(-2,9)","(3,4)","(10,11)"]));
// })(["(1,2)","(3,4)","(-5,-6)","(-7,-8)"]));
// })(["(3,0)","(1,4)","(0,-3)","(2,3)"]));
})(["(0,0)","(0,-1)","(1,1)","(0,1)"]));
