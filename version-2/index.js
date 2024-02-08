const canvas = document.getElementById('plinkoCanvas');
const ctx = canvas.getContext('2d');
const slots = 7;
const slotWidth = canvas.width / slots;
const ballRadius = 12;
const gravity = 0.2;
const friction = 0.98;
const disappearThreshold = canvas.height - 50 - ballRadius;

function drawPlinkoBoard() {
    for (let i = 0; i < slots + 1; i++) {
        ctx.beginPath();
        ctx.arc(i * slotWidth, canvas.height - 50, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.closePath();
    }
}

function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function spin() {
    clearCanvas();
    drawPlinkoBoard();

    const randomSlot = Math.floor(Math.random() * slots);
    const ballX = (randomSlot + 0.5) * slotWidth;
    const ballY = 30;
    const trajectory = getRandomTrajectory();

    animateBall(ballX, ballY, trajectory);
}

function getRandomTrajectory() {
    return Math.random() > 0.5 ? 1 : -1;
}

function animateBall(x, y, trajectory) {
    let ballX = x;
    let ballY = y;
    let velocity = 0;
    let trajectorySpeed = 2 * trajectory;

    function frame() {
        clearCanvas();
        drawPlinkoBoard();
        drawBall(ballX, ballY);

        if (ballY + ballRadius < canvas.height) {
            velocity += gravity;
            ballY += velocity;
            ballX += trajectorySpeed;

            if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
                trajectorySpeed = -trajectorySpeed * friction;
            }

            if (ballY + ballRadius > disappearThreshold) {
                clearCanvas();
                drawPlinkoBoard();
                requestAnimationFrame(frame);
            } else {
                requestAnimationFrame(frame);
            }
        }
    }

    requestAnimationFrame(frame);
}