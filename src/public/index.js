// Height, width, stage
Crafty.init(600, 400);

Crafty.e('2D, Canvas, Color, Fourway') // Entity component system (OOP vs ECS, ECS in Crafty like CSS classes)
    .attr({x: 0, y: 0, w: 100, h: 100})
    .color('blue')
    .fourway(4)
