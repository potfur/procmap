var RoomGenerator = (function() {

    var generator = function(templates) {
        this.tpl = templates;
    };

    generator.prototype.get = function(type) {
        if(this.tpl[type] === undefined) {
            throw 'Undefined room type ' + type;
        }

        return this.tpl[type];
    };

    generator.prototype.generate = function(type, seed) {
        return fill(this.get(type), seed);
    };

    function fill(template, seed) {
        var i, j, v, t = [], l = template.length;

        for(i = 0; i < l; i++) {
            t[i] = [];

            for(j = 0; j < l; j++) {
                v = ('00' + template[i][j]).slice(-2).split('');
                v = [parseInt(v[0]), parseInt(v[1])];

                if(v[1] === 0 || v[1] <= seed.next()) {
                    t[i][j] = Math.round(v[0] * 300);
                    continue;
                }

                t[i][j] = 0;
            }
        }


        return t;
    }

    return generator;
})();
