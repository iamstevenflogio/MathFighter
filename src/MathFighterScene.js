import Phaser from 'phaser'
 export default class MathFighterScene extends Phaser.Scene{
    constructor(){
        super('math-fighter-scene')
    }

    init(){
        this.gameHalfWidth = this.scale.width * 0.5;
        this.gameHalfHeight = this.scale.height * 0.5;
        this.player = undefined;
        this.enemy = undefined;
        this.slash = undefined;

        this.startGame = false
        this.questionText = undefined
        this.resultText = undefined
    }

    preload(){
        //this.load.image('player','Images/warrior1.png') //player
        //this.load.image('enemy','Images/warrior2.png')
        //this.load.image('slash', 'Images/slash.png')
        this.load.image("background", 'Images/bg_layer1.png')
        this.load.image("fight-bg", 'Images/fight-bg.png')
        this.load.image("tile", 'Images/tile.png')
        this.load.image("start-btn", 'Images/start_button.png')

    }
    create(){
        this.add.image(80, 80, 'player')
        this.add.image(80, 80, 'enemy')
        this.add.image(71.25, 131, 'numbers')
        this.add.image(88, 42, 'slash')

        this.add.image(240, 320, "background")                 //background 
        const fight_bg = this.add.image(240, 160, "fight-bg")
        const tile = this.physics.add.staticImage(240, fight_bg.height - 40, "tile")

        //add player at a chosen location / note: this.physics.add is used to add a sprite with physics. Meaning, it's affected by gravity! Or other physics objects
        this.player = this.physics.add.sprite(this.gameHalfWidth-150, this.gameHalfHeight-200, 'player').setBounce(0.2).setOffset(-20, -10); 
        this.physics.add.collider(this.player, tile) // works with the line above, to stop the player from falling. But only if player is ontop of the tile!
        
        //adds enemy, similar to line 33-35
        this.enemy = this.physics.add.sprite(this.gameHalfWidth+150, this.gameHalfHeight-200, 'enemy').setBounce(0.2).setOffset(-20, -10).setFlipX(true);
        this.physics.add.collider(this.enemy, tile)

        //slash
        this.slash = this.physics.add.sprite(240, 60, 'slash').setActive(false).setVisible(true).setGravity(-500).setOffset(0, -10).setDepth(0).setCollideWorldBounds(true);
        
        //IMPORTANT: calls the animations 
        this.createAnimation();


        /*
            * Codes for the Buttons! *
        */
        let start_button = this.add.image(this.gameHalfWidth, this.gameHalfHeight+181, "start-btn").setInteractive();
    }   
    update(){
        
    }

    createAnimation() {
        //player animations
         this.anims.create({
            key: 'player-attack',
            frames: this.anims.generateFrameNumbers('player', { start: 10, end: 14}),
            frameRate:10
        });
        this.anims.create({
            key: 'player-hit',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 9}),
            frameRate: 10
        });
        this.anims.create({
            key: 'player-die',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4}),
            frameRate: 10
        });     this.anims.create({
            key: 'player-standby',
            frames: this.anims.generateFrameNumbers('player', { start: 15, end: 19}),
            frameRate: 10,
            repeat: -1
        });

        //enemy animations
        this.anims.create({
            key: 'enemy-attack',
            frames: this.anims.generateFrameNumbers('enemy', { start: 10, end: 14 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'enemy-hit',
            frames: this.anims.generateFrameNumbers('enemy', { start: 5, end: 9 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'enemy-die',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 4 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'enemy-standby',
            frames: this.anims.generateFrameNumbers('enemy', { start: 15, end: 19 }),
            frameRate: 10,
            repeat: -1
        });
    }

    gameStart() {
        this.startGame = true;
        this.player.anims.play('player-standby', true);
        this.enemy.anims.play('enemy-standby', true);
        this.resultText = this.add.text(this.gameHalfWidth, 200, '0', { fontSize: '32px', fill: '#000'});
        this.questionText = this.add.text(this.gameHalfWidth, 100, '0', { fontSize: '32px', fill: '#000'})
    }

 }