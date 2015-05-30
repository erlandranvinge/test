var glMatrix = require('lib/gl-matrix-min.js');

var gl = function() {};

gl.init = function(id) {
    window.vec2 = glMatrix.vec2;
    window.vec3 = glMatrix.vec3;
    window.mat4 = glMatrix.mat4;

    var canvas = document.getElementById(id);
    if (!canvas)
        throw 'Error: No canvas found.';

    var context = canvas.getContext('webgl', options);
    if (!context)
        throw 'Error: No WebGL support found.';

    gl.width = canvas.width;
    gl.height = canvas.height;
    gl.clearColor(0, 0, 1, 1);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.depthFunc(gl.LEQUAL);
    gl.cullFace(gl.FRONT);
    return gl;
};

module.exports = exports = gl;

