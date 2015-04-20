var Seed = (function() {
    function generate(size, base) {
        var i, seed = [];
        for(i = 0; i < size; i++) {
            seed.push(Math.round(Math.random() * base));
        }

        return seed;
    }

    var seed = function(size, base, seed) {
        base = base || 10;
        this.seed = seed || generate(size, base);

        if(!Array.isArray(this.seed)) {
            this.seed = this.seed.split('').map(function(value) {
                return parseInt(value, base);
            });
        }

        this.reset();
    };

    seed.prototype.current = function() {
        return this.seed[this.pointer];
    };

    seed.prototype.prev = function() {
        this.pointer = (this.pointer || this.seed.length) - 1;
        return this.current();
    };

    seed.prototype.next = function() {
        this.pointer = this.pointer == this.seed.length - 1 ? 0 : this.pointer + 1;
        return this.current();
    };

    seed.prototype.reset = function() {
        this.pointer = 0;
    };

    return seed;
})();
