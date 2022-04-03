

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