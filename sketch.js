let playerSheet;
let player;
let swordSheet;
let sword;
function preload() {
    playerSheet = loadImage('assets/sprites/knight.png');
    swordSheet = loadImage('assets/sprites/excalibur_.png');
}
function setup() {
    new Canvas(124, 48, 'pixelated x4');
    allSprites.pixelPerfect = true;
    player = new Sprite(62, 24, 32, 32);
    player.spriteSheet = playerSheet;
    player.w = 16;
    player.h = 18;
    player.anis.offset.y = -3;
    player.addAnis({
        stand: { w: 32, h: 32, row: 0, frames: 4, frameDelay: 8},
        run: { w: 32, h: 32, row: 2, frames: 16},
        roll: { w: 32, h: 32, row: 5, frames: 8, frameDelay: 4},
        hurt: { w: 32, h: 32, row: 6, frames: 4, frameDelay: 8},
        dead: { w: 32, h: 32, row: 7, frames: 4, frameDelay: 16}
    });
    player.changeAni('stand');
    player.debug = true;
    sword = new Sprite(72, 24, 32, 32);
    sword.spriteSheet = swordSheet;
    sword.offset.y = 0;
    sword.debug = true;
    sword.scale = 0.75;
    sword.w = 10;
    sword.h = 18;
    sword.collider = 'none';
    sword.rotation = 90;
    //player.(90, 0);

    sword.addAnis({
        idle: {w: 32, h: 32, row: 0, frames: 1},
        swing: {w: 32, h: 32, row: 1, frames: 4, frameDelay: 4},
        stab: {w: 32, h: 32, row: 3, frames: 4, frameDelay: 5}
    });
    
    sword.changeAni(['idle', 'stab', 'idle']);
}

function draw() {
    background('skyblue');
    sword.x = player.x ;
    sword.x = player.y + 10;
    if (kb.presses('s')) player.changeAni('stand');
    if (kb.presses('r')) player.changeAni('run');
    if (kb.presses('o')) player.changeAni('roll');
    if (kb.presses('h')) player.changeAni('hurt');
    if (kb.presses('d')) player.changeAni('dead');

}