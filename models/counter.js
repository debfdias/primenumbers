var util    = require('util'),
    events  = require('events')
    _       = require('underscore');

var isPrime = require('prime-number');
var primeNumberList = require('prime-number/list');

function Counter() {
    if(false === (this instanceof Counter)) {
        return new Counter();
    }

    this.second = 1000;  //intervalo entre contagem - sera maior se os numeros primos forem longes um do outro
    this.value = 0;
    this.interval = undefined;

    events.EventEmitter.call(this);

    _.bindAll(this);
};

util.inherits(Counter, events.EventEmitter);

Counter.prototype.start = function() {
    if (this.interval) {
        return;
    }

    console.log('Starting!');

    this.interval = setInterval(this.onTick, this.second);
    this.emit('start:counter');
};

Counter.prototype.stop = function() {
    console.log('Stopping!');
    if (this.interval) {
        clearInterval(this.interval);
        this.interval = undefined;
        this.emit('stop:counter');
    }
};

Counter.prototype.reset = function() {
    console.log('Resetting!');
    this.value = 0;
    this.emit('reset:counter', this.formatValue(this.value));
};

Counter.prototype.onTick = function() {

    for(var i=1;i<2;i++)
    {
        this.value += this.second + i;

        var temp = parseInt(this.value / this.second, 10);

        if(isPrime(temp) && temp!= 1)
        {
            var formattedValue = this.formatValue(this.value);
            this.emit('tick:counter', formattedValue);
        }

        if (this.value === 0) {
            this.stop();
        }
    }
    
    
};

Counter.prototype.formatValue = function(value) {
    var remainder = value,
        numSeconds,
        output = "";

    numSeconds = String(parseInt(remainder / this.second, 10));
    
    output = _.map([numSeconds], function(str) {
        return str;
    }).join(":");

    return output;
};

Counter.prototype.getValue = function() {
    return this.formatValue(this.value);
};

module.exports = Counter;