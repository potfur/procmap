var Visualise = (function() {
    function print(text, matrix) {
        var i, j, str = [];

        for(i = 0; i < matrix.length; i++) {
            str[i] = [];
            for(j = 0; j < matrix.length; j++) {
                str[i][j] = ('00' + matrix[i][j]).slice(-2);
            }

            str[i] = str[i].join(' ');
        }
        text.innerHTML = str.join("\n");
    }

    function draw(canvas, matrix, scale, grid) {
        var x, y, l = matrix.length, ctx = canvas.getContext('2d');

        grid = grid ? 1 : 0;

        scale = scale || 1;
        canvas.width = canvas.height = matrix.length * scale;

        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, canvas.width-grid, canvas.height-grid);

        for(x = 0; x < l; x++) {
            for(y = 0; y < l; y++) {
                ctx.fillStyle = color(matrix[y][x]);
                ctx.fillRect(x * scale, y * scale, scale - grid, scale - grid);
            }
        }
    }

    function color(value) {
        value = parse(value);
        value = ('000' + value.toString(16)).slice(-3);
        return '#' + value;
    }

    function parse(value) {
        switch(value) {
            case 'S':
                return 240;
            case 'E':
                return 3840;
            default:
                return Math.min(4095, Math.max(0, value));
        }
    }

    return {
        text: print,
        canvas: draw
    }
})();
