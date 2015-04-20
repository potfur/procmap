var Generator = (function() {
    var generator = function(matrix, step) {
        this.matrix = matrix;
        this.step = step || 'start';
        this.stoped = false;
        this.flags = {};
    };

    generator.prototype.run = function(callbacks, seed) {
        var step = this.step;

        if(callbacks === undefined) {
            throw 'Callbacks list not';
        }

        while(step && callbacks[step] !== undefined) {
            if(this.stoped) {
                break;
            }

            step = callbacks[step](this, this.matrix, seed);
        }
    };

    generator.prototype.stop = function() {
        this.stoped = true;
    };

    generator.prototype.set = function(flag, value) {
        this.flags[flag] = value;
    };

    generator.prototype.get = function(flag) {
        return this.flags[flag];
    };

    return generator;
})();
