var Matrix = (function() {
    function assertIsPoint(point) {
        if(point[0] === undefined || point[1] === undefined) {
            throw 'Provided point is not a real point';
        }
    }

    function fill(size, fill) {
        var x, y, matrix = [];

        for(x = 0; x < size; x++) {
            matrix[x] = [];
            for(y = 0; y < size; y++) {
                matrix[x][y] = fill;
            }
        }

        return matrix;
    }

    function move(point, offset) {
        assertIsPoint(point);
        assertIsPoint(offset);

        return [point[0] + offset[0], point[1] + offset[1]];
    }

    function exists(matrix, point) {
        return matrix[point[0]] !== undefined && matrix[point[0]][point[1]] !== undefined
    }

    var matrix = function(size) {
        this.matrix = fill(size, 0);
        this.length = this.matrix.length;

        this.current = [0, 0];
        this.prev = undefined;
    };

    matrix.prototype.exists = function(point, offset) {
        return exists(this.matrix, move(point || this.current, offset || [0, 0]))
    };

    matrix.prototype.point = function(point) {
        if(!this.exists(point)) {
            throw 'Unable to set point ' + point.join(',') + ', point does not exists in matrix';
        }

        this.prev = this.current;
        this.current = point;
    };

    matrix.prototype.move = function(offset) {
        this.point(move(this.current, offset));
    };

    matrix.prototype.getValue = function(point, offset) {
        point = move(point || this.current, offset || [0, 0]);
        assertIsPoint(point);

        if(!this.exists(point)) {
            throw 'Unable to get value from ' + point.join(',') + ', point does not exists in matrix';
        }

        return this.matrix[point[0]][point[1]];
    };

    matrix.prototype.setValue = function(value, point) {
        point = point || this.current;

        if(!Array.isArray(value)) {
            setSingleValue(this.matrix, point, value);
            return;
        }

        setBlockValue(this.matrix, point, value);
    };

    function setBlockValue(matrix, point, value) {
        var i, j, li, lj, p;
        for(i = 0, li = value.length; i < li; i++) {
            for(j = 0, lj = value[i].length; j < lj; j++) {
                setSingleValue(matrix, move(point, [i, j]), value[i][j])
            }
        }
    }

    function setSingleValue(matrix, point, value) {
        if(!exists(matrix, point)) {
            throw 'Unable to set value to ' + point.join(',') + ', point does not exists in matrix';
        }

        matrix[point[0]][point[1]] = value;
    }

    matrix.prototype.scale = function(scale) {
        var i, j, l = this.matrix.length * scale, matrix = new Matrix(this.matrix.length * scale);

        for(i = 0; i < l; i++) {
            for(j = 0; j < l; j++) {
                matrix.setValue(this.getValue([Math.floor(i / scale), Math.floor(j / scale)]), [i, j]);
            }
        }

        this.matrix = matrix.matrix;
        this.length = matrix.length;

    };

    return matrix;
})();
