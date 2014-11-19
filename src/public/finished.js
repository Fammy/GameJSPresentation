// Height, width, stage
Crafty.init(600, 400);

/*
var box = Crafty.e('2D, Canvas, Color, Fourway') // Entity component system
    .attr({x: 0, y: 0, w: 100, h: 100}) // Each component can have attributes
    .color('blue')
    .fourway(4)
*/

// Define a sprite-map component
Crafty.sprite(64, 'images/stick.png', {
    player: [2,1]
}, 4, 4, true);

Crafty.e('2D, Canvas, Twoway, Gravity, Collision, SpriteAnimation, player')
    .attr({x: 10, y: 10, h: 64, w: 64})
    .twoway(5, 5)
    .reel('PlayerRunning', 250, [[3,0], [0,1], [1,1]])
    .gravity('solid')
    .collision()
    .bind('EnterFrame', function () {
        if (this.y > 400) {
            this.y = 0;
        }
    })
    .bind('Moved', function () {
        var left = Crafty.keydown[Crafty.keys.LEFT_ARROW];
        var right = Crafty.keydown[Crafty.keys.RIGHT_ARROW];

        if (left && !this.left) {
            this.flip('X').animate('PlayerRunning', -1);
        } else if (right && !this.right) {
            this.unflip('X').animate('PlayerRunning', -1);
        }

        this.left = left;
        this.right = right;
    });


Crafty.e('2D, Canvas, Color, solid')
    .attr({x: 0, y: 390, h: 10, w: 300})
    .color('blue');

Crafty.e('2D, Canvas, Color, solid')
    .attr({x: 300, y: 360, h: 40, w: 20})
    .color('green');

document.getElementById('cr-stage')
    .addEventListener('mousedown', function (e) {
        Crafty.e('2D, Canvas, Color, solid')
            .attr({x: e.x - 10, y: e.y - 10, h: 40, w: 40})
            .color('orange');

    });
