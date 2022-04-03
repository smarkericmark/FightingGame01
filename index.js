const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0, canvas.width, canvas.height)

const gravity = 0.7

////

function rectangualarCollision({rectangle1,rectangle2}) {
    return (
        rectangle1.attackBox.postion.x + rectangle1.attackBox.width >= rectangle2.postion.x &&
        rectangle1.attackBox.postion.x <= rectangle2.postion.x + rectangle2.width &&
        rectangle1.attackBox.postion.y + rectangle1.attackBox.height >= rectangle2.postion.y &&
        rectangle1.attackBox.postion.y <= rectangle2.postion.y + rectangle2.height


    )
}

function determineWinner({player, enemy,timerID}) {
    clearTimeout(timerID)
    document.querySelector('#displayText').style.display = 'flex'

    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player One Wins'
    
    } else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player Two Wins'
        
    }
}

/////
const background = new Sprite({
    postion: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    postion: {
        x: 620,
        y: 127
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    postion: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y:0
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y:157
    },
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2
        },
        attack: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: './img/samuraiMack/TakeHit.png',
            framesMax: 4
        },
        death: {
            imageSrc: './img/samuraiMack/Death.png',
            framesMax: 6
        },
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 150,
        height: 50    
    }

})

const enemy = new Fighter({
    postion: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 215,
        y: 174
    },
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2
        },
        attack: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: './img/kenji/Take hit.png',
            framesMax: 3
        },death: {
            imageSrc: './img/kenji/Death.png',
            framesMax: 7
        },
    },
    attackBox: {
        offset: {
            x: -165,
            y: 50
        },
        width: 165,
        height: 50
        }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}


let timer = 60
let timerID
function decreaseTimer() {
    if (timer > 0) {
        timerID=setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer ===0) {
        determineWinner({player,enemy,timerID})
    }
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255,255,255,0.08)'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x =0
    enemy.velocity.x =0

    //player1 movement
    
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.switchSprite('run')
        player.velocity.x = 5
    } else {
        player.switchSprite('idle')
    }
    //Player 1 jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    //player 2 movement
    
///////////////////////
    //Player 2 movement
    
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.switchSprite('run')
        enemy.velocity.x = 5
    } else {
        enemy.switchSprite('idle')
    }
    //Player 2 jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

////////////////////////

    //////////////////
    //Hit Detection//
    ////////////////
    
    // Acutal Hit

    if (
        rectangualarCollision({
            rectangle1: player,
            rectangle2: enemy
        }) && player.isAttacking && player.framesCurrent  === 4
    ) {
        enemy.takeHit()
        player.isAttacking = false
        //document.querySelector('#player2Health').style.width = enemy.health + '%'
        gsap.to('#player2Health', {
            width: enemy.health + '%'
        })
    }
    if (
        rectangualarCollision({
            rectangle1: enemy,
            rectangle2: player
        }) && enemy.isAttacking && enemy.framesCurrent  === 2
    ) {
        player.takeHit()
        enemy.isAttacking = false
        //document.querySelector('#player1Health').style.width = player.health + '%'
        gsap.to('#player1Health', {
            width: player.health + '%'
        })
    }

    //The hit misses
    if (player.isAttacking && player.framesCurrent ===4) {
        player.isAttacking = false
    }

    if (enemy.isAttacking && enemy.framesCurrent ===2) {
        enemy.isAttacking = false
    }

    // End Game Based on Health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player,enemy,timerID })
    }

} 

animate()

window.addEventListener('keydown', (event) => {
    if (!player.dead) {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y =-20
            break
        case 's':
            player.attack()
            break
        }   
    }

    if (!enemy.dead) {
        switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey='ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y =-20
            break
        
        case 'ArrowDown':
            enemy.attack()
            break
        }
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        
    }
})