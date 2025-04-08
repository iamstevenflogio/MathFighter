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
        this.button1 = undefined;
        this.button2 = undefined;
        this.button3 = undefined;
        this.button4 = undefined;
        this.button5 = undefined;
        this.button6 = undefined;
        this.button7 = undefined;
        this.button8 = undefined;
        this.button9 = undefined;
        this.button0 = undefined;
        this.buttonDel = undefined;
        this.buttonOk = undefined;
    }

    preload(){
        this.load.spritesheet("player", "Images/warrior1.png", { //player spritesheet
            frameWidth: 80,
            frameHeight: 80,
          });
          this.load.spritesheet("enemy", "Images/warrior2.png", { //enemy spritesheet
            frameWidth: 80,
            frameHeight: 80,
          });
          this.load.spritesheet("slash", "Images/slash.png", { //slash spritesheet
            frameWidth: 42,
            frameHeight: 88,
          });
        this.load.spritesheet("numbers", "Images/numbers.png", {
            frameWidth: 131,
            frameHeight: 71.25,
        });
        this.load.image('enemy','Images/warrior2.png')
        this.load.image("background", 'Images/bg_layer1.png')
        this.load.image("fight-bg", 'Images/fight-bg.png')
        this.load.image("tile", 'Images/tile.png')
        this.load.image("start-btn", 'Images/start_button.png')
        //buttons

    }
    create(){       
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
        this.slash = this.physics.add.sprite(240, 60, 'slash').setActive(false).setVisible(false).setGravity(-500).setOffset(0, -10).setDepth(0).setCollideWorldBounds(true);
        
        //IMPORTANT: calls the animations 
        this.createAnimation();

        /*  * Codes for the Buttons! *  */
        let start_button = this.add.image(this.gameHalfWidth, this.gameHalfHeight + 181, "start-btn").setInteractive();
        
        start_button.on("pointerdown",() => { 
            this.gameStart();       // Run the gameStart method and the button disappears.
            start_button.destroy();
        }, this);
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
        this.resultText = this.add.text(this.gameHalfWidth-15, 200, '0', { fontSize: '32px', fill: '#000' });
        this.questionText = this.add.text(this.gameHalfWidth-15, 100, '0', { fontSize: '32px', fill: '#000' });
        this.createButtons();
    }

    createButtons() {
        const startPosY = this.scale.height - 246;
        const widthDiff = 131;
        const heightDiff = 71.25;

        // center buttons
        this.button2 = this.add.image(this.gameHalfWidth, startPosY, 'numbers', 1)
            .setInteractive()
            .setData('value', 2);

        this.button5 = this.add.image(this.gameHalfWidth, this.button2.y + heightDiff, 'numbers', 4)
            .setInteractive()
            .setData('value', 5);

        this.button8 = this.add.image(this.gameHalfWidth, this.button5.y + heightDiff, 'numbers', 7)
            .setInteractive()
            .setData('value', 8);

        this.button0 = this.add.image(this.gameHalfWidth, this.button8.y + heightDiff, 'numbers', 10)
            .setInteractive()
            .setData('value', 0);
        //left side
        this.button1 = this.add.image(this.button2.x - widthDiff, startPosY, "numbers", 0)
        .setInteractive()
        .setData("value", 1);

        this.button4 = this.add.image(this.button5.x - widthDiff, this.button1.y + heightDiff, "numbers", 3)
        .setInteractive()
        .setData("value", 4);

        this.button7 = this.add.image(this.button8.x - widthDiff, this.button4.y + heightDiff, "numbers", 6)
        .setInteractive()
        .setData("value", 7);

        this.buttonDel = this.add.image(this.button0.x - widthDiff, this.button7.y + heightDiff, "numbers", 9)
        .setInteractive()
        .setData("value", "del");
        //right side
        this.button3 = this.add.image(this.button2.x + widthDiff, startPosY, "numbers", 2)
        .setInteractive()
        .setData("value", 3);

        this.button6 = this.add.image(this.button5.x + widthDiff, this.button3.y + heightDiff, "numbers", 5)
        .setInteractive()
        .setData("value", 6);

        this.button9 = this.add.image(this.button8.x + widthDiff, this.button6.y + heightDiff, "numbers", 8)
        .setInteractive()
        .setData("value", 9);

        this.buttonOk = this.add.image(this.button0.x + widthDiff, this.button9.y + heightDiff, "numbers", 11)
        .setInteractive()
        .setData("value", "ok");

        }

 }