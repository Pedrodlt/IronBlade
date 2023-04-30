class Player {
    constructor(ctx, canvasSize, posX, sizeW, posY, playerId, framesCounter) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.imageInstance = undefined
        this.playersSpecs = {
            pos: { x: posX, y: posY },
            size: { w: sizeW, h: 150 },
            velocity: { x: 0, y: 50 }
        }
        this.attackBox = {
            pos: { x: posX - 155, y: posY },
            size: { w: 360, h: 150 },
            velocity: { x: 0, y: 50 }
        }
        this.framesCounter = framesCounter
        this.playerId = playerId
        this.gravity = 1
        this.playersImg = undefined
        this.enemyImg = undefined
        this.playerAttackImg = undefined
        this.enemyAttackImg = undefined
        this.playerJumpImg = undefined
        this.enemyJumpImg = undefined
        this.playerIsAtacking = false
        this.enemyIsAtacking = false
        this.playerIsJump = false
        this.enemyIsJump = false
        this.init()
    }
    init() {
        //player
        this.playersImg = new Image()
        this.playersImg.src = './images/player1.png'
        this.playerAttackImg = new Image()
        this.playerAttackImg.src = './images/player1attack.png'
        this.playerJumpImg = new Image()
        this.playerJumpImg.src = './images/playerJump.png'

        //enemy
        this.enemyImg = new Image()
        this.enemyImg.src = './images/player2.png'
        this.enemyAttackImg = new Image()
        this.enemyAttackImg.src = './images/player2attack.png'
        this.enemyJumpImg = new Image()
        this.enemyJumpImg.src = './images/enemyJumpPrueba.png'

        // frames Player & Enemy
        this.playersImg.frames = 6
        this.playersImg.framesIndex = 0
        this.enemyImg.frames = 6
        this.enemyImg.framesIndex = 0
    }
    draw(framesCounter) {

        // this.ctx.fillStyle = 'green',
        //     this.ctx.fillRect(
        //         this.attackBox.pos.x,
        //         this.attackBox.pos.y,
        //         this.attackBox.size.w,
        //         this.attackBox.size.h
        //     )

        // this.ctx.fillStyle = 'red',
        //     this.ctx.fillRect(
        //         this.playersSpecs.pos.x,
        //         this.playersSpecs.pos.y,
        //         this.playersSpecs.size.w,
        //         this.playersSpecs.size.h);

        //Dibujar player posicion inicial
        if (this.playerId === 'player' && !this.playerIsAtacking && !this.playerIsJump) {
            this.ctx.drawImage(
                this.playersImg,
                this.playersImg.width / this.playersImg.frames * this.playersImg.framesIndex,
                0,
                this.playersImg.width / this.playersImg.frames,
                this.playersImg.height,
                this.playersSpecs.pos.x - 60,
                this.playersSpecs.pos.y - 80,
                this.playersSpecs.size.w + 200,
                this.playersSpecs.size.h + 115
            )
        }
        //Dibujar player attack
        if (this.playerId === 'player' && this.playerIsAtacking) {
            this.ctx.drawImage(
                this.playerAttackImg,
                this.playerAttackImg.width / this.playersImg.frames * this.playersImg.framesIndex,
                0,
                this.playerAttackImg.width / this.playersImg.frames,
                this.playerAttackImg.height,
                this.playersSpecs.pos.x - 70,
                this.playersSpecs.pos.y - 120,
                this.playersSpecs.size.w + 250,
                this.playersSpecs.size.h + 200
            )
        }
        //Dibujar player jump
        if (this.playerId === 'player' && this.playerIsJump) {
            this.ctx.drawImage(
                this.playerJumpImg,
                this.playerJumpImg.width / this.playersImg.frames * this.playersImg.framesIndex,
                0,
                this.playerJumpImg.width / this.playersImg.frames,
                this.playerJumpImg.height,
                this.playersSpecs.pos.x - 70,
                this.playersSpecs.pos.y - 120,
                this.playersSpecs.size.w + 250,
                this.playersSpecs.size.h + 200
            )
        }
        //Dibujar Enemy posicion inicial
        if (this.playerId === "enemy" && !this.enemyIsAtacking && !this.enemyIsJump) {
            this.ctx.drawImage(
                this.enemyImg,
                this.enemyImg.width / this.enemyImg.frames * this.enemyImg.framesIndex,
                0,
                this.enemyImg.width / this.enemyImg.frames,
                this.enemyImg.height,
                this.playersSpecs.pos.x - 130,
                this.playersSpecs.pos.y - 90,
                this.playersSpecs.size.w + 220,
                this.playersSpecs.size.h + 143
            )
        }
        //Dibujar Enemy posición de ataque
        if (this.playerId === "enemy" && this.enemyIsAtacking) {
            this.ctx.drawImage(
                this.enemyAttackImg,
                this.enemyAttackImg.width / this.enemyImg.frames * this.enemyImg.framesIndex,
                0,
                this.enemyAttackImg.width / this.enemyImg.frames,
                this.enemyAttackImg.height,
                this.playersSpecs.pos.x - 180,
                this.playersSpecs.pos.y - 110,
                this.playersSpecs.size.w + 220,
                this.playersSpecs.size.h + 143
            )
        }
        //Dibujar salto Enemy
        if (this.playerId === "enemy" && this.enemyIsJump) {
            this.ctx.drawImage(
                this.enemyJumpImg,
                this.enemyJumpImg.width / this.enemyImg.frames * this.enemyImg.framesIndex,
                0,
                this.enemyJumpImg.width / this.enemyImg.frames,
                this.enemyJumpImg.height,
                this.playersSpecs.pos.x - 110,
                this.playersSpecs.pos.y - 110,
                this.playersSpecs.size.w + 220,
                this.playersSpecs.size.h + 143
            )
        }
        if (this.playerIsAtacking) this.animateAttack(framesCounter)
        if (this.playerIsJump) this.animateJump(framesCounter)
        if (this.enemyIsAtacking) this.animateAttack(framesCounter)
        if (this.enemyIsJump) this.animateJump(framesCounter)
        this.animate(framesCounter)
    }
    animate(framesCounter) {
        if (framesCounter % 6 == 0) {
            this.playersImg.framesIndex++ && this.enemyImg.framesIndex++
        }
        if (this.playersImg.framesIndex >= this.playersImg.frames) {
            this.playersImg.framesIndex = 0
        }
        if (this.enemyImg.framesIndex >= this.enemyImg.frames) {
            this.enemyImg.framesIndex = 0
        }
        this.move()
    }
    animateAttack(framesCounter) {
        if (framesCounter % 6 == 0) {
            this.playersImg.framesIndex++ && this.enemyImg.framesIndex++
        }
        if (this.playersImg.framesIndex >= this.playersImg.frames) {
            this.playersImg.framesIndex = 0
        }
        if (this.enemyImg.framesIndex >= this.enemyImg.frames) {
            this.enemyImg.framesIndex = 0
        }
        this.move()
    }
    animateJump(framesCounter) {

        if (framesCounter % 6 == 0) {
            this.playersImg.framesIndex++ && this.enemyImg.framesIndex++
        }

        if (this.playersImg.framesIndex >= this.playersImg.frames) {
            this.playersImg.framesIndex = 0
        }
        if (this.enemyImg.framesIndex >= this.enemyImg.frames) {
            this.enemyImg.framesIndex = 0
        }
        this.move()
    }
    move() {
        // this.playersSpecs.pos.x += this.playersSpecs.velocity.x
        if (this.playersSpecs.pos.y + this.playersSpecs.size.h >= this.canvasSize.h - 50) {
            this.playersSpecs.velocity.y = 0
            this.playersSpecs.pos.y = this.canvasSize.h - 50 - this.playersSpecs.size.h
        } else {
            this.playersSpecs.pos.y += this.playersSpecs.velocity.y
            this.playersSpecs.velocity.y += this.gravity
        }

        // Attack box
        this.attackBox.pos.y += this.attackBox.velocity.y
        if (this.attackBox.pos.y + this.attackBox.size.h >= this.canvasSize.h - 50) {
            this.attackBox.velocity.y = 0
            this.attackBox.pos.y = this.canvasSize.h - 50 - this.attackBox.size.h
        } else {
            this.attackBox.pos.y += this.attackBox.velocity.y
            this.attackBox.velocity.y += this.gravity
        }
    }
}
