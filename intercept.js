function IntersectingLines(strArr) {

  var pts
    , xInt
    , yInt
    , m0
    , m1
    , b0
    , b1
    ;

  // Process Input Data
  pts = strArr.map(function (str) {
    var nums = str.match(/^\((.+)\,(.+)\)$/).slice(1, 3);
    for (i in nums) {
      nums[i] *= 1;
    }
    return nums;
  });

  // Namespace for Fraction arithmetic operations
  var Fraction = (function () {

    function Fraction (num, denom) {

      if (!arguments.length || 2 < arguments.length) {
        throw new Error('invalid argument(s)');
      }

      this.num = num;
      this.denom = denom || 1;

      return this.simplify();
    }

    Fraction.prototype.simplify = function () {

      // Choose smaller value for starting point
      var lcm = Math.abs(this.num) >= Math.abs(this.denom) ?
                Math.abs(this.denom) :
                Math.abs(this.num);

      // Find LCM to reduce
      while (lcm > 1) {
        if (!(Math.abs(this.num)%lcm) && !(Math.abs(this.denom)%lcm)) {
          this.num   /= lcm;
          this.denom /= lcm;
          break;
        }
        lcm--;
      }

      // Flip sign if both are negative
      if (this.num < 0 && this.denom < 0) {
        this.num   *= -1;
        this.denom *= -1;
      }

      return this;
    };

    Fraction.prototype.toString = function () {

      var self = this;

      var sign = function () {
        return self.num > 0 && self.denom > 0 ?
               '' :
               '-';
      }

      if (1 === this.denom) {
        return sign() + Math.abs(this.num);
      } else {
        return sign() + Math.abs(this.num) + '/' + Math.abs(this.denom);
      }
    };

    function create () {

      var args = arguments;

      function F() {
        return Fraction.apply(this, args);
      }
      F.prototype = Fraction.prototype;

      return new F();
    }

    function add (frac1, frac2) {
      var num = frac1.num * frac2.denom + frac2.num * frac1.denom;
      return create(num, frac1.denom * frac2.denom);
    }

    function subt (frac1, frac2) {
      var num = frac1.num * frac2.denom - frac2.num * frac1.denom;
      return create(num, frac1.denom * frac2.denom);
    }

    function mult (frac1, frac2) {

      return create(frac1.num * frac2.num, frac1.denom * frac2.denom);
    }

    function divide (frac1, frac2) {
      var inverse = create(frac2.denom, frac2.num);
      return mult(frac1, inverse);
    }

    return {
      create: create,
      add: add,
      subt: subt,
      mult: mult,
      divide: divide
    };
  })();

  // Slope Calculator
  var m = function (pt1, pt2) {
    if (pt2[0] == pt1[0]) {
      return NaN;
    } else if (pt2[1] == pt1[1]) {
      return Fraction.create(0, 1);
    } else {
      return Fraction.create(pt2[1] - pt1[1], pt2[0] - pt1[0]);
    }
  }

  // Y-Intercept Calculator
  var b = function (x, y, m) {

    var x0 = Fraction.create(x, 1);
    var y0 = Fraction.create(y, 1);

    console.log('x = %s', x0);
    console.log('y = %s', y0);
    console.log('m = ', m);

    if (!m.num && !m.denom) {
      // console.log('WTF!?', m);
      return NaN;
    } else if (!m.num) {
      console.log('zero slope?');
      return y0;
    } else {
      return Fraction.subt(y0, Fraction.mult(x0, m));
    }
  }

  // Determine Slopes
  m0 = m(pts[0], pts[1]);
  m1 = m(pts[2], pts[3]);

  console.log('m0 = %s', m0);
  console.log('m1 = %s', m1);

  // Exit if no intersect
  if (m0.num === m1.num && m0.denom == m1.denom) {
    return 'no intersection';
  }

  // Determine intercept: y - mx = b
  b0 = b(pts[0][0], pts[0][1], m0);
  b1 = b(pts[3][0], pts[3][1], m1);

  console.log('b0 = %s', b0);
  console.log('b1 = %s', b1);

  console.log('L1: y = ' + m0.toString() + 'x + ' + b0.toString());
  console.log('L2: y = ' + m1.toString() + 'x + ' + b1.toString());

  // Solve for x := (b1 - b0) / (m0 - m1)
  if (isNaN(m0)) {
    xInt = Fraction.create(pts[0][0]);
  } else if (isNaN(m1)) {
    xInt = Fraction.create(pts[2][0]);
  } else {
    xInt = Fraction.divide(Fraction.subt(b0, b1), Fraction.subt(m1, m0));
  }

  // Solve for y
  if (0 == m0.num) {
    yInt = Fraction.create(pts[0][1]);
  } else if (0 == m1.num) {
    yInt = Fraction.create(pts[2][1]);
  } else {
    yInt = Fraction.add(b0, Fraction.mult(xInt, m0));
  }

  // console.log('xInt = %s', xInt);
  // console.log('yInt = %s', yInt);

  console.log('Intercept at: (' + xInt.toString() + ', ' + yInt.toString() + ')');

  return '(' + xInt.toString() + ',' + yInt.toString() + ')';
}

IntersectingLines(["(9,-2)","(-2,9)","(3,4)","(10,11)"]);

// keep this function call here
// to see how to enter arguments in JavaScript scroll down
// IntersectingLines(readline());
