'use strict';

function Stack () {
  this.stack = [];
}
Stack.prototype.pop = function() {
  return this.stack.pop();
};
Stack.prototype.push = function(item) {
  this.stack.push(item);
};

function Queue () {
  this.queue = [];
}
Queue.prototype.enqueue = function(item) {
  this.queue.push(item);
};
Queue.prototype.dequeue = function() {
  return this.queue.shift();
};


// 7.2

function Call (level) {
  this.level = level || 1;
};

function CallCenter (pm, tl, freshers) {
  this.pm = pm;
  this.tl = tl;
  this.freshers = freshers || [];
}

CallCenter.prototype.getCallHandler = function() {

  var fresher = _.first(this.freshers.filter(function (fresher) {
    return !fresher.call;
  }));

  if (fresher) {
    return fresher;
  } else if (!this.tl.call) {
    return this.tl;
  } else {
    return this.pm;
  }
};

function Employee () {
  this.call = false;
}

function Fresher () {
  Employee.call(this, data);
};

function TL () {
  Employee.call(this, data);
}

function PM () {
  Employee.call(this, data);
}
