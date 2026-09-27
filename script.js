// ========================================
// CAR RACING GAME
// ========================================

const road = document.getElementById("road");

const player = document.getElementById("player");

const enemy1 = document.getElementById("enemy1");
const enemy2 = document.getElementById("enemy2");

const scoreText = document.getElementById("score");

const gameOverScreen = document.getElementById("gameOver");

const finalScore = document.getElementById("finalScore");

const restartButton = document.getElementById("restartButton");

const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");


// ========================================
// VARIABLES
// ========================================

let playerX = 50;

let enemy1Y = -120;
let enemy2Y = -400;

let score = 0;

let speed = 4;

let gameRunning = false;

let animationFrame = null;

let moveLeft = false;
let moveRight = false;


// ========================================
// PLAYER KEYBOARD CONTROLS
// ========================================

document.addEventListener("keydown", function(event) {

    if (
        event.key === "ArrowLeft" ||
        event.key === "a" ||
        event.key === "A"
    ) {
        moveLeft = true;
    }

    if (
        event.key === "ArrowRight" ||
        event.key === "d" ||
        event.key === "D"
    ) {
        moveRight = true;
    }

});


document.addEventListener("keyup", function(event) {

    if (
        event.key === "ArrowLeft" ||
        event.key === "a" ||
        event.key === "A"
    ) {
        moveLeft = false;
    }

    if (
        event.key === "ArrowRight" ||
        event.key === "d" ||
        event.key === "D"
    ) {
        moveRight = false;
    }

});


// ========================================
// PHONE CONTROLS
// ========================================

leftButton.addEventListener("pointerdown", function(event) {

    event.preventDefault();

    moveLeft = true;

});


leftButton.addEventListener("pointerup", function(event) {

    event.preventDefault();

    moveLeft = false;

});


leftButton.addEventListener("pointerleave", function() {

    moveLeft = false;

});


rightButton.addEventListener("pointerdown", function(event) {

    event.preventDefault();

    moveRight = true;

});


rightButton.addEventListener("pointerup", function(event) {

    event.preventDefault();

    moveRight = false;

});


rightButton.addEventListener("pointerleave", function() {

    moveRight = false;

});


// ========================================
// RANDOM ENEMY POSITION
// ========================================

function randomPosition() {

    return Math.floor(Math.random() * 75) + 10;

}


// ========================================
// COLLISION
// ========================================

function checkCollision(car1, car2) {

    const a = car1.getBoundingClientRect();

    const b = car2.getBoundingClientRect();

    return (
        a.left < b.right &&
        a.right > b.left &&
        a.top < b.bottom &&
        a.bottom > b.top
    );

}


// ========================================
// RESET ENEMY 1
// ========================================

function resetEnemy1() {

    enemy1Y = -120;

    enemy1.style.top = enemy1Y + "px";

    enemy1.style.left = randomPosition() + "%";

    score++;

}


// ========================================
// RESET ENEMY 2
// ========================================

function resetEnemy2() {

    enemy2Y = -300;

    enemy2.style.top = enemy2Y + "px";

    enemy2.style.left = randomPosition() + "%";

    score++;

}


// ========================================
// GAME LOOP
// ========================================

function gameLoop() {

    // Stop if game isn't running
    if (!gameRunning) {
        return;
    }


    // ====================================
    // MOVE PLAYER
    // ====================================

    if (moveLeft) {

        playerX -= 0.9;

    }

    if (moveRight) {

        playerX += 0.9;

    }


    // Keep player inside road

    if (playerX < 8) {

        playerX = 8;

    }

    if (playerX > 88) {

        playerX = 88;

    }


    player.style.left = playerX + "%";


    // ====================================
    // MOVE ENEMY 1
    // ====================================

    enemy1Y += speed;

    enemy1.style.top = enemy1Y + "px";


    // ====================================
    // MOVE ENEMY 2
    // ====================================

    enemy2Y += speed;

    enemy2.style.top = enemy2Y + "px";


    // ====================================
    // ENEMY 1 PASSED
    // ====================================

    if (enemy1Y > road.clientHeight) {

        resetEnemy1();

    }


    // ====================================
    // ENEMY 2 PASSED
    // ====================================

    if (enemy2Y > road.clientHeight) {

        resetEnemy2();

    }


    // ====================================
    // SCORE
    // ====================================

    scoreText.textContent = score;


    // ====================================
    // INCREASE SPEED
    // ====================================

    if (score >= 10) {

        speed = 5;

    }

    if (score >= 20) {

        speed = 6;

    }

    if (score >= 30) {

        speed = 7;

    }

    if (score >= 50) {

        speed = 8;

    }


    // ====================================
    // CHECK CRASH
    // ====================================

    if (
        checkCollision(player, enemy1) ||
        checkCollision(player, enemy2)
    ) {

        stopGame();

        return;

    }


    // Continue animation

    animationFrame = requestAnimationFrame(gameLoop);

}


// ========================================
// START GAME
// ========================================

function startGame() {

    // Stop old animation if there is one

    if (animationFrame !== null) {

        cancelAnimationFrame(animationFrame);

    }


    // Reset everything

    playerX = 50;

    enemy1Y = -120;

    enemy2Y = -400;

    score = 0;

    speed = 4;

    moveLeft = false;

    moveRight = false;


    // Reset player

    player.style.left = "50%";


    // Reset enemy 1

    enemy1.style.left = randomPosition() + "%";

    enemy1.style.top = "-120px";


    // Reset enemy 2

    enemy2.style.left = randomPosition() + "%";

    enemy2.style.top = "-400px";


    // Reset score

    scoreText.textContent = "0";


    // Hide Game Over

    gameOverScreen.style.display = "none";


    // Start game

    gameRunning = true;

    animationFrame = requestAnimationFrame(gameLoop);

}


// ========================================
// STOP GAME
// ========================================

function stopGame() {

    gameRunning = false;

    moveLeft = false;
    moveRight = false;


    if (animationFrame !== null) {

        cancelAnimationFrame(animationFrame);

        animationFrame = null;

    }


    finalScore.textContent = score;

    gameOverScreen.style.display = "block";

}


// ========================================
// PLAY AGAIN BUTTON
// ========================================

restartButton.addEventListener("click", function() {

    startGame();

});


// ========================================
// START THE GAME
// ========================================

startGame();