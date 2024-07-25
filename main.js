let playerSheet;
let player;
let worldSheet;
function preload() {
    playerSheet = loadImage('assets/sprites/knight.png');
    worldSheet = loadImage('assets/sprites/world_tileset.png');
    
}
function setup() {
    new Canvas(300, 200, 'pixelated x4');
    world.gravity.y = 9.81;
    player = new Sprite(62, 24, 16, 16);
    player.spriteSheet = playerSheet;
    player.anis.offset.y = -3;
    player.addAnis({
        stand: { w: 32, h: 32, row: 0, frames: 4, frameDelay: 8},
        run: { w: 32, h: 32, row: 2, frames: 16},
        roll: { w: 32, h: 32, row: 5, frames: 8, frameDelay: 4},
        hurt: { w: 32, h: 32, row: 6, frames: 4, frameDelay: 8},
        dead: { w: 32, h: 32, row: 7, frames: 4, frameDelay: 16},
        death: { w: 32, h: 32, row: 7, col: 3}
    });
    player.changeAni('stand');
    player.rotationLock = true;
    player.jumpTimer = 0;

    player.debug = true;
    grass = new Group();
    grass.collider = 'static';
    grass.spriteSheet = worldSheet;
    grass.addAni({ w: 16, h: 16, row: 0, col: 0 });
    grass.tile = 'g';

    leftBridge = new Group();
    leftBridge.collider = 'static';
    leftBridge.spriteSheet = worldSheet;
    leftBridge.addAni({ w: 16, h: 16, row: 0, col: 9 });
    leftBridge.tile = '<'
    // leftBridge.debug = true;
    middleBridge = new Group();
    middleBridge.collider = 'static';
    middleBridge.spriteSheet = worldSheet;
    middleBridge.addAni({ w: 16, h: 16, row: 0, col: 10 });
    middleBridge.tile = '_'

    rightBridge = new Group();
    rightBridge.collider = 'static';
    rightBridge.spriteSheet = worldSheet;
    rightBridge.addAni({ w: 16, h: 16, row: 0, col: 11 });
    rightBridge.tile = '>'


    tiles = new Tiles([
        '................',
        'gggggggggg<___>gg'
    ], 30, 100, 16, 16);
}

function draw() {
    background('skyblue')
    camera.x = player.x;
    camera.y = player.y;
    if (player.vel.y > 10) player.vel.y = 10;
    if (kb.pressing('right')) {
        player.mirror.x = false;
        player.vel.x = 1.75;
        player.changeAni('run');
    } else if (kb.pressing('left')) {
        player.mirror.x = true;
        player.vel.x = -1.75;
        player.changeAni('run');
    } else {
        player.changeAni('stand');
    }
    if (kb.presses('up') && player.colliding(tiles)) {
        player.vel.y = -4;
        player.jumpTimer++; // jumpTimer = jumpTimer + 1;
    } else if (kb.presses('up') && player.jumpTimer === 1) {
        player.jumpTimer = 0;
        player.vel.y = -4;
    }

}