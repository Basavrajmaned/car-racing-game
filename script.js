const road = document.getElementById("road");
const player = document.getElementById("player");
const enemy1 = document.getElementById("enemy1");
const enemy2 = document.getElementById("enemy2");

const scoreText = document.getElementById("score");
const finalScore = document.getElementById("finalScore");

const gameOver = document.getElementById("gameOver");

const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const againButton = document.getElementById("again");

let playerX = 50;

let enemy1Y = -120;
let enemy2Y = -400;

let score = 0;
let speed = 4;

let leftPressed = false;
let rightPressed = false;

let playing = true;
let animation;


/* KEYBOARD */

document.addEventListener("keydown", function(e) {

    if (e.key === "ArrowLeft" || e.key === "a") {
        leftPressed = true;
    }

    if (e.key === "ArrowRight" || e.key === "d") {
        rightPressed = true;
    }

});

document.addEventListener("keyup", function(e) {

    if (e.key === "ArrowLeft" || e.key === "a") {
        leftPressed = false;
    }

    if (e.key === "ArrowRight" || e.key === "d") {
        rightPressed = false;
    }

});


/* TOUCH */

leftButton.addEventListener("touchstart", function(e) {
    e.preventDefault();
    leftPressed = true;
});

leftButton.addEventListener("touchend", function(e) {
    e.preventDefault();
    leftPressed = false;
});

rightButton.addEventListener("touchstart", function(e) {
    e.preventDefault();
    rightPressed = true;
});

rightButton.addEventListener("touchend", function(e) {
    e.preventDefault();
    rightPressed = false;
});


/* MOUSE */

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


/* RANDOM POSITION */

function randomPosition() {
    return Math.floor(Math.random() * 75) + 10;
}


/* COLLISION */

function collision(a, b) {

    const x = a.getBoundingClientRect();
    const y = b.getBoundingClientRect();

    return (
        x.left < y.right &&
        x.right > y.left &&
        x.top < y.bottom &&
        x.bottom > y.top
    );
}


/* RESET ENEMY */

function resetEnemy1() {

    enemy1Y = -120;

    enemy1.style.top = enemy1Y + "px";
    enemy1.style.left = randomPosition() + "%";

    score++;
}


function resetEnemy2() {

    enemy2Y = -300;

    enemy2.style.top = enemy2Y + "px";
    enemy2.style.left = randomPosition() + "%";

    score++;
}


/* GAME */

function gameLoop() {

    if (!playing) {
        return;
    }


    /* PLAYER */

    if (leftPressed) {
        playerX -= 1;
    }

    if (rightPressed) {
        playerX += 1;
    }


    if (playerX < 8) {
        playerX = 8;
    }

    if (playerX > 88) {
        playerX = 88;
    }


    player.style.left = playerX + "%";


    /* ENEMIES */

    enemy1Y += speed;
    enemy2Y += speed;

    enemy1.style.top = enemy1Y + "px";
    enemy2.style.top = enemy2Y + "px";


    /* RESET */

    if (enemy1Y > road.clientHeight) {
        resetEnemy1();
    }

    if (enemy2Y > road.clientHeight) {
        resetEnemy2();
    }


    /* SCORE */

    scoreText.textContent = score;


    /* SPEED */

    if (score >= 10) {
        speed = 5;
    }

    if (score >= 20) {
        speed = 6;
    }

    if (score >= 30) {
        speed = 7;
    }


    /* CRASH */

    if (
        collision(player, enemy1) ||
        collision(player, enemy2)
    ) {

        endGame();
        return;
    }


    animation = requestAnimationFrame(gameLoop);
}


/* GAME OVER */

function endGame() {

    playing = false;

    leftPressed = false;
    rightPressed = false;

    cancelAnimationFrame(animation);

    finalScore.textContent = score;

    gameOver.style.display = "block";
}


/* RESTART */

againButton.addEventListener("click", startGame);

againButton.addEventListener("touchend", function(e) {
    e.preventDefault();
    startGame();
});


/* START */

function startGame() {

    cancelAnimationFrame(animation);

    playerX = 50;

    enemy1Y = -120;
    enemy2Y = -400;

    score = 0;
    speed = 4;

    leftPressed = false;
    rightPressed = false;

    player.style.left = "50%";

    enemy1.style.left = randomPosition() + "%";
    enemy1.style.top = "-120px";

    enemy2.style.left = randomPosition() + "%";
    enemy2.style.top = "-400px";

    scoreText.textContent = "0";

    gameOver.style.display = "none";

    playing = true;

    gameLoop();
}


startGame();