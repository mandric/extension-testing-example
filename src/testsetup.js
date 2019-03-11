console.log('loading testsetup');
//import chai from './chai.js'
import mocha from './mocha.js'
mocha.setup('bdd')
mocha.growl() // Enables web notifications
