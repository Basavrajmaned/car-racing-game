// ===============================
// GET HTML ELEMENTS
// ===============================

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


// ===============================
// GAME VARIABLES
// ===============================

var playerX = 50;

var enemy1Y = -120;

var enemy2Y = -400;

var score = 0;

var speed = 4;

var leftPressed = false;

var rightPressed = false;

var gameRunning = true;

var animation;


// ===============================
// SWIPE VARIABLES
// ===============================

var touchStartX = 0;

var touchStartY = 0;


// ===============================
// KEYBOARD CONTROLS
// ===============================

document.addEventListener("keydown", function(event) {

    if (
        event.key === "ArrowLeft" ||
        event.key === "a" ||
        event.key === "A"
    ) {

        leftPressed = true;

    }


    if (
        event.key === "ArrowRight" ||
        event.key === "d" ||
        event.key === "D"
    ) {

        rightPressed = true;

    }

});


document.addEventListener("keyup", function(event) {

    if (
        event.key === "ArrowLeft" ||
        event.key === "a" ||
        event.key === "A"
    ) {

        leftPressed = false;

    }


    if (
        event.key === "ArrowRight" ||
        event.key === "d" ||
        event.key === "D"
    ) {

        rightPressed = false;

    }

});


// ===============================
// MOBILE BUTTON CONTROLS
// ===============================


// LEFT BUTTON

leftButton.addEventListener("touchstart", function(event) {

    event.preventDefault();

    leftPressed = true;

});


leftButton.addEventListener("touchend", function(event) {

    event.preventDefault();

    leftPressed = false;

});


leftButton.addEventListener("touchcancel", function() {

    leftPressed = false;

});


leftButton.addEventListener("mousedown", function() {

    leftPressed = true;

});


leftButton.addEventListener("mouseup", function() {

    leftPressed = false;

});


leftButton.addEventListener("mouseleave", function() {

    leftPressed = false;

});


// RIGHT BUTTON

rightButton.addEventListener("touchstart", function(event) {

    event.preventDefault();

    rightPressed = true;

});


rightButton.addEventListener("touchend", function(event) {

    event.preventDefault();

    rightPressed = false;

});


rightButton.addEventListener("touchcancel", function() {

    rightPressed = false;

});


rightButton.addEventListener("mousedown", function() {

    rightPressed = true;

});


rightButton.addEventListener("mouseup", function() {

    rightPressed = false;

});


rightButton.addEventListener("mouseleave", function() {

    rightPressed = false;

});


// ===============================
// SWIPE CONTROL
// ===============================


// Finger touches road

road.addEventListener(
    "touchstart",
    function(event) {

        if (event.touches.length > 0) {

            touchStartX =
                event.touches[0].clientX;

            touchStartY =
                event.touches[0].clientY;

        }

    },
    { passive: false }
);


// Finger leaves road

road.addEventListener(
    "touchend",
    function(event) {

        event.preventDefault();


        if (!gameRunning) {

            return;

        }


        if (event.changedTouches.length === 0) {

            return;

        }


        var touchEndX =
            event.changedTouches[0].clientX;

        var touchEndY =
            event.changedTouches[0].clientY;


        var differenceX =
            touchEndX - touchStartX;

        var differenceY =
            touchEndY - touchStartY;


        // Make sure it is mainly
        // a horizontal swipe

        if (
            Math.abs(differenceX) >
            Math.abs(differenceY)
        ) {


            // SWIPE LEFT

            if (differenceX < -30) {

                playerX = playerX - 12;

            }


            // SWIPE RIGHT

            if (differenceX > 30) {

                playerX = playerX + 12;

            }

        }


        // Keep player inside road

        if (playerX < 8) {

            playerX = 8;

        }


        if (playerX > 88) {

            playerX = 88;

        }

    },
    { passive: false }
);


// ===============================
// RANDOM ENEMY POSITION
// ===============================

function randomPosition() {

    return Math.floor(
        Math.random() * 75
    ) + 10;

}


// ===============================
// COLLISION DETECTION
// ===============================

function collision(first, second) {

    var a =
        first.getBoundingClientRect();

    var b =
        second.getBoundingClientRect();


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

    enemy1.style.top =
        enemy1Y + "px";

    enemy1.style.left =
        randomPosition() + "%";

    score++;

}


// ===============================
// RESET ENEMY 2
// ===============================

function resetEnemy2() {

    enemy2Y = -300;

    enemy2.style.top =
        enemy2Y + "px";

    enemy2.style.left =
        randomPosition() + "%";

    score++;

}


// ===============================
// GAME LOOP
// ===============================

function gameLoop() {

    if (!gameRunning) {

        return;

    }


    // =========================
    // PLAYER MOVEMENT
    // =========================

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

    player.style.left =
        playerX + "%";


    // =========================
    // ENEMY MOVEMENT
    // =========================

    enemy1Y =
        enemy1Y + speed;

    enemy2Y =
        enemy2Y + speed;


    enemy1.style.top =
        enemy1Y + "px";

    enemy2.style.top =
        enemy2Y + "px";


    // =========================
    // RESET ENEMIES
    // =========================

    if (
        enemy1Y >
        road.clientHeight
    ) {

        resetEnemy1();

    }


    if (
        enemy2Y >
        road.clientHeight
    ) {

        resetEnemy2();

    }


    // =========================
    // SCORE
    // =========================

    scoreDisplay.innerHTML =
        "Score: " + score;


    // =========================
    // INCREASE SPEED
    // =========================

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


    // =========================
    // COLLISION
    // =========================

    if (

        collision(player, enemy1) ||

        collision(player, enemy2)

    ) {

        endGame();

        return;

    }


    // Continue game

    animation =
        requestAnimationFrame(gameLoop);

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

    gameOverScreen.style.display =
        "block";

}


// ===============================
// RESTART BUTTON
// ===============================

restartButton.addEventListener(
    "click",
    function() {

        startGame();

    }
);


restartButton.addEventListener(
    "touchend",
    function(event) {

        event.preventDefault();

        startGame();

    }
);


// ===============================
// START / RESTART GAME
// ===============================

function startGame() {

    cancelAnimationFrame(animation);


    // Reset player

    playerX = 50;


    // Reset enemies

    enemy1Y = -120;

    enemy2Y = -400;


    // Reset score

    score = 0;


    // Reset speed

    speed = 4;


    // Reset controls

    leftPressed = false;

    rightPressed = false;


    // Start game

    gameRunning = true;


    // Reset player position

    player.style.left =
        "50%";


    // Reset enemy positions

    enemy1.style.top =
        "-120px";

    enemy1.style.left =
        randomPosition() + "%";


    enemy2.style.top =
        "-400px";

    enemy2.style.left =
        randomPosition() + "%";


    // Hide game over screen

    gameOverScreen.style.display =
        "none";


    // Start loop

    gameLoop();

}


// ===============================
// START GAME AUTOMATICALLY
// ===============================

startGame();