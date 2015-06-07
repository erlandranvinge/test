
var webgl = require('gl/gl');
var assets = require('assets');
var utils = require('utils');
var Input = require('input');
var Console = require('ui/console');
var StatusBar = require('ui/statusbar');
var Client = require('client');

if (!window.requestFrame) {
    window.requestFrame = ( function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function() {
                window.setTimeout( callback, 1000 / 60 );
            };
    })();
}

Quake = function() {};

var tick = function(time) {
    requestFrame(tick);
    Quake.instance.tick(time);
};

Quake.prototype.tick = function(time) {

    this.client.update(time);
    this.handleInput();

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);

    if (this.client.viewEntity > 0)
        this.client.world.draw(this.projection, this.client.viewEntity);

    /*

    */
    /*
    if (this.client.viewEntity !== -1) {
        var pos = this.client.entities[this.client.viewEntity].nextState.origin;
        mat4.translate(m, m, [-pos[0], -pos[1], -pos[2]]);

        if (this.client.map) {
            this.client.map.draw(this.projection, m);

            var models = this.client.models;

            var mm = mat4.create();

            var statics = this.client.statics;
            for (var i = 0; i < statics.length; i++) {
                var state = statics[i].state;
                var model = models[state.modelIndex];
                var mm = mat4.translate(mm, m, state.origin);
                model.draw(this.projection, mm, 0, 0);
            }

            var entities = this.client.entities;
            for (var i = 0; i < entities.length; i++) {
                if (i === this.client.viewEntity)
                    continue;

                var state = entities[i].state;
                var model = models[state.modelIndex];
                if (model) {
                    try {
                        var mm = mat4.translate(mm, m, state.origin);
                        mat4.rotateZ(mm, mm, utils.deg2Rad(state.angles[1]));

                        model.draw(this.projection, mm, 0, state.frame);
                    } catch (e) { console.log(e); }
                }
            }

        }
    }
    */
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    this.statusBar.draw(this.ortho);
};

// Temp. controller.
Quake.prototype.handleInput = function() {
    if (this.client.viewEntity === -1)
        return;

    /*
    var angle = utils.deg2Rad(this.client.viewAngles[1]);
    var position = this.client.entities[this.client.viewEntity].nextState.origin;
    var speed = 5.0;

    if (this.input.left)
        this.client.viewAngles[1] -= 2;
    if (this.input.right)
        this.client.viewAngles[1] += 2;
    if (this.input.up) {
        this.client.demo = null;
        position[0] += Math.cos(angle) * speed;
        position[1] -= Math.sin(angle) * speed;
    }
    if (this.input.down) {
        position[0] -= Math.cos(angle) * speed;
        position[1] += Math.sin(angle) * speed;
    }
    if (this.input.flyUp)
        position[2] += 10;
    if (this.input.flyDown)
        position[2] -= 10;
    */
};

Quake.prototype.start = function() {
    Quake.instance = this;
    webgl.init('canvas');
    this.ortho = mat4.ortho(mat4.create(), 0, gl.width, gl.height, 0, -10, 10);
    this.projection = mat4.perspective(mat4.create(), 68.03, gl.width / gl.height, 0.1, 4096);

    assets.add('data/pak0.pak');
    assets.add('shaders/color2d.shader');
    assets.add('shaders/model.shader');
    assets.add('shaders/texture2d.shader');
    assets.add('shaders/world.shader');

    var self = this;
    assets.precache(function() {
        self.console = new Console();
        self.statusBar = new StatusBar();
        self.input = new Input();
        self.client = new Client();
        self.client.playDemo('demo1.dem');
        tick();
    });
};




