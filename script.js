var road = document.getElementById("road");
var player = document.getElementById("player");
var enemy1 = document.getElementById("enemy1");
var enemy2 = document.getElementById("enemy2");

var scoreDisplay = document.getElementById("score");
var gameOverScreen = document.getElementById("gameOver");
var finalScore = document.getElementById("finalScore");

var leftButton = document.getElementById("leftButton");
var rightButton = document.getElementById("rightButton");
var restartButton = document.getElementById("restartButton");

var playerX = 50;
var enemy1Y = -120;
var enemy2Y = -400;

var score = 0;
var speed = 4;

var leftPressed = false;
var rightPressed = false;

var gameRunning = true;
var animation;

var touchStartX = 0;
var touchStartY = 0;


// ===============================
// KEYBOARD CONTROLS
// ===============================

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft" || event.key === "a") {
        leftPressed = true;
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        rightPressed = true;
    }

});

document.addEventListener("keyup", function(event) {

    if (event.key === "ArrowLeft" || event.key === "a") {
        leftPressed = false;
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        rightPressed = false;
    }

});


// ===============================
// LEFT / RIGHT BUTTONS
// ===============================

leftButton.addEventListener("touchstart", function(event) {
    event.preventDefault();
    leftPressed = true;
});

leftButton.addEventListener("touchend", function(event) {
    event.preventDefault();
    leftPressed = false;
});

rightButton.addEventListener("touchstart", function(event) {
    event.preventDefault();
    rightPressed = true;
});

rightButton.addEventListener("touchend", function(event) {
    event.preventDefault();
    rightPressed = false;
});

leftButton.addEventListener("mousedown", function() {
    leftPressed = true;
});

leftButton.addEventListener("mouseup", function() {
    leftPressed = false;
});

rightButton.addEventListener("mousedown", function() {
    rightPressed = true;
});

rightButton.addEventListener("mouseup", function() {
    rightPressed = false;
});


// ===============================
// SWIPE CONTROL
// ===============================

road.addEventListener("touchstart", function(event) {

    if (event.touches.length > 0) {

        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;

    }

}, { passive: false });


road.addEventListener("touchend", function(event) {

    event.preventDefault();

    if (!gameRunning) {
        return;
    }

    if (event.changedTouches.length === 0) {
        return;
    }

    var touchEndX = event.changedTouches[0].clientX;
    var touchEndY = event.changedTouches[0].clientY;

    var differenceX = touchEndX - touchStartX;
    var differenceY = touchEndY - touchStartY;

    // Only count a horizontal swipe
    if (Math.abs(differenceX) > Math.abs(differenceY)) {

        // Swipe LEFT
        if (differenceX < -30) {
            playerX = playerX - 12;
        }

        // Swipe RIGHT
        if (differenceX > 30) {
            playerX = playerX + 12;
        }

    }

    // Keep car inside road
    if (playerX < 8) {
        playerX = 8;
    }

    if (playerX > 88) {
        playerX = 88;
    }

}, { passive: false });


// ===============================
// RANDOM ENEMY POSITION
// ===============================

function randomPosition() {

    return Math.floor(Math.random() * 75) + 10;

}


// ===============================
// COLLISION
// ===============================

function collision(first, second) {

    var a = first.getBoundingClientRect();
    var b = second.getBoundingClientRect();

    return (
        a.left < b.right &&
        a.right > b.left &&
        a.top < b.bottom &&
        a.bottom > b.top
    );

}


// ===============================
// RESET ENEMY 1
// ===============================

function resetEnemy1() {

    enemy1Y = -120;

    enemy1.style.top = enemy1Y + "px";

    enemy1.style.left = randomPosition() + "%";

    score++;

}


// ===============================
// RESET ENEMY 2
// ===============================

function resetEnemy2() {

    enemy2Y = -300;

    enemy2.style.top = enemy2Y + "px";

    enemy2.style.left = randomPosition() + "%";

    score++;

}


// ===============================
// GAME LOOP
// ===============================

function gameLoop() {

    if (!gameRunning) {
        return;
    }


    // Keyboard / button movement

    if (leftPressed) {
        playerX = playerX - 1;
    }

    if (rightPressed) {
        playerX = playerX + 1;
    }


    // Keep player inside road

    if (playerX < 8) {
        playerX = 8;
    }

    if (playerX > 88) {
        playerX = 88;
    }


    // Move player

    player.style.left = playerX + "%";


    // Move enemies

    enemy1Y = enemy1Y + speed;

    enemy2Y = enemy2Y + speed;

    enemy1.style.top = enemy1Y + "px";

    enemy2.style.top = enemy2Y + "px";


    // Reset enemies

    if (enemy1Y > road.clientHeight) {
        resetEnemy1();
    }

    if (enemy2Y > road.clientHeight) {
        resetEnemy2();
    }


    // Score

    scoreDisplay.innerHTML = "Score: " + score;


    // Increase speed

    if (score >= 10) {
        speed = 5;
    }

    if (score >= 20) {
        speed = 6;
    }

    if (score >= 30) {
        speed = 7;
    }


    // Collision

    if (
        collision(player, enemy1) ||
        collision(player, enemy2)
    ) {

        endGame();

        return;

    }


    animation = requestAnimationFrame(gameLoop);

}


// ===============================
// GAME OVER
// ===============================

function endGame() {

    gameRunning = false;

    leftPressed = false;

    rightPressed = false;

    cancelAnimationFrame(animation);

    finalScore.innerHTML = score;

    gameOverScreen.style.display = "block";

}


// ===============================
// RESTART
// ===============================

restartButton.addEventListener("click", function() {

    startGame();

});


restartButton.addEventListener("touchend", function(event) {

    event.preventDefault();

    startGame();

});


// ===============================
// START GAME
// ===============================

function startGame() {

    cancelAnimationFrame(animation);

    playerX = 50;

    enemy1Y = -120;

    enemy2Y = -400;

    score = 0;

    speed = 4;

    leftPressed = false;

    rightPressed = false;

    gameRunning = true;

    player.style.left = "50%";

    enemy1.style.top = "-120px";

    enemy1.style.left = randomPosition() + "%";

    enemy2.style.top = "-400px";

    enemy2.style.left = randomPosition() + "%";

    gameOverScreen.style.display = "none";

    gameLoop();

}


// Start

startGame();