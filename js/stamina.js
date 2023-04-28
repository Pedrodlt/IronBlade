class Stamina {
    constructor(ctx, canvasSize, posX, posY, color) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.staminaBar1 = {
            pos: { x: posX, y: posY },
            size: { w: 800, h: 40 }
        }
        this.timer = {
            pos: { x: this.canvasSize.w / 2 - 80, y: 40 },
            size: { w: 160, h: 130 }
        }
        this.color = color
    }

    drawStamina() {

        this.ctx.fillStyle = this.color,
            this.ctx.fillRect(
                this.staminaBar1.pos.x,
                this.staminaBar1.pos.y,
                this.staminaBar1.size.w,
                this.staminaBar1.size.h
            )
    }
    drawTimer() {
        this.ctx.fillStyle = 'green',
            this.ctx.fillRect(
                this.timer.pos.x,
                this.timer.pos.y,
                this.timer.size.w,
                this.timer.size.h
            )
    }


}

