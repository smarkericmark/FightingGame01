class Sprite {
    constructor({postion, imageSrc, scale =1, framesMax = 1,offset = {x:0,y:0} }) {
        this.postion = postion
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElpased = 0
        this.framesHold = 10 
        this.offset = offset
    }

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.postion.x - this.offset.x, 
            this.postion.y - this.offset.y,
            (this.image.width /this.framesMax) * this.scale,
            this.image.height* this.scale)
    }

    animateFrames() {
        
        this.framesElpased++
        
        if (this.framesElpased % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax -1) {
                this.framesCurrent++
        } else {
            this.framesCurrent = 0
            }
        }
    }

    update() {
        this.draw()
        this.animateFrames()

        
    }

}





class Fighter extends Sprite {
    constructor({
        postion,
        velocity,
        color='red',
        imageSrc, 
        scale =1, 
        framesMax = 1,
        offset= {x:0,y:0},
        sprites,
        attackBox = {offset: {},width: undefined, height: undefined}
    }) {
        super({
            postion,
            imageSrc,
            scale,
            framesMax,
            offset
        })
        
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.color = color
        this.lastKey
        this.attackBox = {
            postion: {
                x: this.postion.x,
                y: this.postion.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        },
        this.isAttacking,
        this.health= 100,
        this.framesCurrent = 0
        this.framesElpased = 0
        this.framesHold = 10
        this.sprites = sprites
        this.dead = false

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }


    }

  
    update() {
        this.draw()
        
        if (!this.dead) this.animateFrames()

        this.attackBox.postion.x = this.postion.x + this.attackBox.offset.x
        this.attackBox.postion.y = this.postion.y + this.attackBox.offset.y

        //Uncomment to see attack box 

        //c.fillRect(this.attackBox.postion.x, this.attackBox.postion.y, this.attackBox.width,this.attackBox.height)


        this.postion.x += this.velocity.x
        this.postion.y += this.velocity.y


        //gravety funtion (not the movie)
        if (this.postion.y + this.height + this.velocity.y >= canvas.height - 95) {
            this.velocity.y = 0
            this.postion.y = 331
        } else 
        this.velocity.y += gravity
    }

    attack() {
        this.switchSprite('attack')
        this.isAttacking =true
        
    }

    takeHit() {
        this.health -= 20

        if (this.health <= 0) {
            this.switchSprite('death')
        } else {
            this.switchSprite('takeHit')
        }
    }

    switchSprite(sprite) {
        
        //override for death
        if (this.image === this.sprites.death.image){
            if (this.framesCurrent === this.sprites.death.framesMax -1)
                this.dead =true
            return}
        
        //override all animations for attack


        if (
            this.image === this.sprites.attack.image && 
            this.framesCurrent < this.sprites.attack.framesMax -1) 
            
            return
        //override all animations for hits
        
        if (
            this.image === this.sprites.takeHit.image && 
            this.framesCurrent < this.sprites.takeHit.framesMax -1)
        
            return

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                    break
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
                break

            case 'attack':
                if (this.image !== this.sprites.attack.image) {
                    this.image = this.sprites.attack.image
                    this.framesMax = this.sprites.attack.framesMax
                    this.framesCurrent = 0
                }
                break

            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0
                }
                break

            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                }
                break     
        }
    }
}