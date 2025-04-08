import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'
import MathFighterScene from './MathFighterScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 450,
	height: 650,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [MathFighterScene],

	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
	},

}

export default new Phaser.Game(config)
