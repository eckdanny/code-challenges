input  = 'da2kr32a2';
output = 'yes a2';

(function PatternChaser(str) {

  var chase = function () {
    var nChars = Math.floor(str.length / 2), matches;
    do {
      for (i = 0, N = str.length - nChars; i < N; i++) {
        matches = str.match(new RegExp(str.substr(i, nChars), 'g'));
        if (1 < matches.length) {
          return matches[0];
        }
      }
      nChars--;
    } while (nChars > 1);
  }

  var found = chase();
  return found ? 'yes ' + found : 'no null';


})(input)
