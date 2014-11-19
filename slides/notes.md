# Notes

## Does JavaScript do everything?

* JavaScript is great for browsers, servers, but games typically demand highest performance

## Game programming in general

* Typically C/C++, Formerly assembly
    * Other langauges like Lua, UnrealScript (scripting) are also popular
* Game loop
    * Process input
    * Update game state/AI
    * Render game (graphics, sounds)
    * Control rate of gameplay
        * slow down/skip frames
* Sprite sheets
* Collision detection
* Etc

## Game programming in JS

* DIVs
    * Most support, worst performance (let's call it HTML4)
* Canvas
    * HTML5 element, higher performance, game like JS methods
* ASM.js
    * Best peformance, typically code is complied to ASM
    * https://www.humblebundle.com/home

## Available Frameworks

* Paid
* Free
* See http://html5gameengine.com/

## Crafty

* http://craftyjs.com/
* Install: direct download, bower, npm
* Example: Pong
    * Challenge someone to pong
        * Up the speed
* Game: my game

### Basic example

* Show index.html
* Show index.js
* Explain basics, components

    Crafty.e('2D, Canvas, Color, Fourway') // Entity component system (OOP vs ECS, ECS in Crafty like CSS classes)
        .attr({x: 0, y: 0, w: 100, h: 100})
        .color('blue')
        .fourway(4)

### Keep on screen

    .bind('EnterFrame', function () {
        if (this.x > 500) {
            this.x = 500;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        }
    });

### Add a friend

    Crafty.e('2D, Canvas, Color') // Don't need FourWay
        .attr({x: 300, y: 0, w: 100, h: 100})
        .color('red')

### Give friend some "AI"

    .bind('EnterFrame', function () {
        this.velocity = this.velocity || 3;
        this.x = this.x + this.velocity;
        if (this.x > 500) {
            this.velocity = -3;
        }
        if (this.x < 0) {
            this.velocity = 3;
        }
    });


### Let's try a side scroller: Here's our protagonist

    Crafty.e('2D, Canvas, Twoway, Color')
        .attr({x: 10, y: 10, h: 30, w: 30})
        .color('red')
        .twoway(5, 5);


### Built in gravity component

    Crafty.e('2D, Canvas, Twoway, Color, Gravity')
    ...
    .gravity()

### If he falls off,

    .bind('EnterFrame', function () {
        if (this.y > 400) {
            this.y = 0;
        }
    });

### Let's give him something to land on

    Crafty.e('2D, Canvas, Color, solid') // custom component
        .attr({x: 0, y: 390, h: 10, w: 300})
        .color('blue');

        // player
        .gravity('solid')


### Let's do some collision detection

//TODO: not working
    .bind('Moved', function(from) {
        if (this.hit('solid')){
            this.attr({x: from.x, y: from.y});
        }
    });

### Hack: worlds simplest level editor

    document.getElementById('cr-stage')
        .addEventListener('click', function (e) {
            console.log(e);
            Crafty.e('2D, Canvas, Color, solid')
                .attr({x: e.offsetX, y: e.offsetY, h: 40, w: 40})
                .color('orange');
            });


### Simple image with a sprite map

    // Define a sprite-map component
    Crafty.sprite(64, 'images/stick.png', {
        player: [2,1],
    }, 4, 4, true); // x padding, y padding, hasOuterPadding


### animate player

    var player = Crafty.e('2D, Canvas, Twoway, Gravity, Collision, SpriteAnimation, player')
        .attr({x: 10, y: 10, h: 64, w: 64})
        .twoway(5, 5)
        .reel('PlayerRunning', 250, [[3,0], [0,1], [1,1]])
        .animate('PlayerRunning', -1)
        .gravity('solid')
        .collision()
        .bind('EnterFrame', function () {
            if (this.y > 400) {
                this.y = 0;
            }
        });

### better (not best) animations

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
