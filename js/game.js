const oneVone = {
    appName: "IronBlades",
    author: "Cristian y Pedro",
    version: "2.0",
    license: undefined,
    description: "Two players figth game",
    ctx: undefined,
    frameIndex: 0,
    FPS: 60,
    framesCounter: 0,
    player: undefined, //propiedades de personaje 1
    enemy: undefined,  // propiedades de personaje 2
    canvasSize: {
        w: undefined,
        h: undefined
    },
    isAttacking: undefined,
    playerIsJumping: undefined,
    enemyIsAttacking: undefined,
    enemyIsJumping: undefined,
    backgroundImage: undefined,
    healthPlayer: 100,
    healthEnemy: 100,
    popinio: undefined,
    //timer: 60,

    init() { //Inicia el juego!
        this.setContext()
        this.setDimensions()
        this.setEventListeners()
        this.initBackground()
        this.createPlayers()
        this.start()
    },
    setContext() { //Nos enlaza con el canvas y nos dice las dimensiones espaciales! NO TOCAR 
        this.ctx = document.querySelector('canvas').getContext('2d')
    },
    setDimensions() { //Nos da las dmensiones del canvas! NO TOCAR
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
        document.querySelector('canvas').setAttribute('width', this.canvasSize.w)
        document.querySelector('canvas').setAttribute('height', this.canvasSize.h)
    },

    initBackground() { //FONDO VERDE (CAMBIAR)
        this.backgroundImage = new Image()
        this.backgroundImage.src = './images/japaniseBK.gif'
    },

    drawBackground() {
        this.ctx.drawImage(
            this.backgroundImage,
            0,
            0,
            this.canvasSize.w,
            this.canvasSize.h
        )
    },

    drawPlayers() { //Dibuja a los jugadores llama a la clase player!
        this.player.draw(this.framesCounter)
        this.enemy.draw(this.framesCounter)
    },
    drawAll() { //Llama a todos los Draws!
        this.drawBackground()
        this.drawPlayers()
    },

    start() { //Intervalo lleva el timing de la app!

        this.interval = setInterval(() => {
            // this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.framesCounter++
            this.clearAll()
            this.drawAll()
        }, 1000 / this.FPS)
    },

    musicGame() {
        this.backgroundSound = new Audio()
        this.backgroundSound.src = './music/musicFondo.mp3'
        this.backgroundSound.volume = 1
        this.backgroundSound.play()
    },

    musicAttack() {
        this.attackSound = new Audio()
        this.attackSound.src = './music/swordSound.mp3'
        this.attackSound.volume = 1
        this.attackSound.play()
    },

    musicJump() {
        this.jumpSound = new Audio()
        this.jumpSound.src = './music/jump.mp3'
        this.jumpSound.volume = 0.2
        this.jumpSound.play()
    },

    createPlayers() { //Enlaza con la clase players para darle las propiedades 
        this.player = new Player(this.ctx, this.canvasSize, 600, 50, 0, "player", this.framesCounter)
        this.enemy = new Player(this.ctx, this.canvasSize, 1400, 50, 0, "enemy", this.framesCounter)
    },

    setEventListeners() {
        const keysPressed = {}
        document.onkeydown = event => {
            const { key } = event
            keysPressed[key] = true
            //movement player <<<<<<<<<<<<<<<<<<<<<<<
            if (keysPressed['a']) {
                this.player.playersSpecs.pos.x -= 20
                this.player.attackBox.pos.x -= 20
            }
            if (keysPressed['d']) {
                this.player.playersSpecs.pos.x += 20
                this.player.attackBox.pos.x += 20
            }
            //aqui estan los mandos del enemigo<<<<<<<<<<<<<
            if (keysPressed['k']) {
                this.enemy.playersSpecs.pos.x -= 20
                this.enemy.attackBox.pos.x -= 20
            }
            if (keysPressed['ñ']) {
                this.enemy.playersSpecs.pos.x += 20
                this.enemy.attackBox.pos.x += 20
            }
        }
        document.onkeyup = event => {//saltos y borrado del array k
            const { key } = event
            //salto de player <<<<<<<<<<<<<<<<<<<<<<<<<<<<
            if (keysPressed['w']) {
                if (this.player.playersSpecs.velocity.y === 0) {
                    this.player.playersSpecs.pos.y -= 10
                    this.player.attackBox.pos.y -= 10
                    this.jumpPlayer()  //movements
                    this.musicJump()
                }
            }
            if (keysPressed['q']) {
                if (this.player.playersSpecs.velocity.y === 0) {
                    this.player.playersSpecs.pos.y -= 10
                    this.player.playersSpecs.pos.x -= 100
                    this.player.attackBox.pos.y -= 10
                    this.player.attackBox.pos.x -= 100
                    this.jumpPlayer()  //movements 
                    this.musicJump()

                }
            }
            if (keysPressed['e']) {
                if (this.player.playersSpecs.velocity.y === 0) {
                    this.player.playersSpecs.pos.y -= 10
                    this.player.playersSpecs.pos.x += 100
                    this.player.attackBox.pos.y -= 10
                    this.player.attackBox.pos.x += 100
                    this.jumpPlayer()  //movements 
                    this.musicJump()
                }
            }
            if (keysPressed['s']) {
                this.playerIsAtacking = false
                this.attackPlayer()
                this.musicAttack()

            }
            //salto de Enemy<<<<<<<<<<<<<<<<<<<<<<
            if (keysPressed['o']) {
                if (this.enemy.playersSpecs.velocity.y === 0) {
                    this.enemy.playersSpecs.pos.y -= 10
                    this.enemy.attackBox.pos.y -= 10
                    this.enemyIsJumping = false
                    this.jumpEnemy()
                    this.musicJump()
                }
            }
            if (keysPressed['i']) {
                if (this.enemy.playersSpecs.velocity.y === 0) {
                    this.enemy.playersSpecs.pos.y -= 10
                    this.enemy.playersSpecs.pos.x -= 100
                    this.enemy.attackBox.pos.y -= 10
                    this.enemy.attackBox.pos.x -= 100
                    this.enemyIsJumping = false
                    this.jumpEnemy()  //movements
                    this.musicJump()
                }
            }
            if (keysPressed['p']) {
                if (this.enemy.playersSpecs.velocity.y === 0) {
                    this.enemy.playersSpecs.pos.y -= 10
                    this.enemy.playersSpecs.pos.x += 100
                    this.enemy.attackBox.pos.y -= 10
                    this.enemy.attackBox.pos.x += 100
                    this.enemyIsJumping = false
                    this.jumpEnemy()  //movements
                    this.musicJump()
                }
            }
            if (keysPressed['l']) {
                this.enemyIsAttacking = false
                this.attackEnemy()
                this.musicAttack()
            }

            if (keysPressed[' ']) {
                this.musicGame()
            }

            delete keysPressed[key]
        }
    },

    attackPlayer() {
        this.isAttacking = true
        this.player.playerIsAtacking = true
        setTimeout(() => {
            this.isAttacking = false
            this.player.playerIsAtacking = false
        }, 300)

        if (this.player.attackBox.pos.x + this.player.attackBox.size.w >= this.enemy.playersSpecs.pos.x &&
            this.player.attackBox.pos.x <= this.enemy.playersSpecs.pos.x + this.enemy.playersSpecs.size.w &&
            this.player.attackBox.pos.y + this.player.attackBox.size.h >= this.enemy.playersSpecs.pos.y &&
            this.player.attackBox.pos.y <= this.enemy.playersSpecs.pos.y + this.enemy.playersSpecs.size.h && this.isAttacking) {

            //Restar vida al Player
            this.healthEnemy -= 5
            document.querySelector('#enemyHealth').style.width = this.healthEnemy + '%'

            if (this.healthEnemy === 0) {
                return this.gameOver()
            }
        }
    },

    attackEnemy() {
        this.enemyIsAttacking = true
        this.enemy.enemyIsAtacking = true
        setTimeout(() => {
            this.enemyIsAttacking = false
            this.enemy.enemyIsAtacking = false
        }, 300)

        if (this.enemy.attackBox.pos.x + this.enemy.attackBox.size.w >= this.player.playersSpecs.pos.x &&
            this.enemy.attackBox.pos.x <= this.player.playersSpecs.pos.x + this.player.playersSpecs.size.w &&
            this.enemy.attackBox.pos.y + this.enemy.attackBox.size.h >= this.player.playersSpecs.pos.y &&
            this.enemy.attackBox.pos.y <= this.player.playersSpecs.pos.y + this.player.playersSpecs.size.h && this.enemyIsAttacking) {

            //Restar vida al Enemy
            this.healthPlayer -= 5
            document.querySelector('#playerHealth').style.width = this.healthPlayer + '%'

            if (this.healthPlayer === 0) {
                return this.gameOver()
            }
        }
    },

    jumpPlayer() {
        this.playerIsJumping = true
        this.player.playerIsJump = true
        setTimeout(() => {
            this.playerIsJumping = false
            this.player.playerIsJump = false
        }, 300)

        // this.player.playersSpecs.pos.y -= 400;
        this.player.playersSpecs.velocity.y -= 20;
        // this.player.attackBox.pos.y -= 400;
        this.player.attackBox.velocity.y -= 20;

    },
    jumpEnemy() {
        this.enemyIsJumping = true
        this.enemy.enemyIsJump = true
        setTimeout(() => {
            this.enemyIsJumping = false
            this.enemy.enemyIsJump = false
        }, 300)

        // this.enemy.playersSpecs.pos.y -= 400;
        this.enemy.playersSpecs.velocity.y -= 20;
        // this.enemy.attackBox.pos.y -= 400;
        this.enemy.attackBox.velocity.y -= 20;
    },
    gameOver() {
        clearInterval(this.interval)
        this.backgroundSound.pause()
        this.attackSound.pause()
        this.jumpSound.pause()
    },

    reset() {
        this.createPlayers()
        this.initBackground()
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

}

