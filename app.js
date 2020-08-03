const canvas = document.querySelector('canvas');
const generateButton = document.querySelector('.generate-random-tree');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let curve = 10;
let curve2 = 10;


function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {

    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = color2;
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    if (angle > 0) {
        ctx.bezierCurveTo(curve, -len / 2, curve2, -len / 2, 0, -len);
    } else {
        ctx.bezierCurveTo(curve, -len / 2, curve2, -len / 2, 0, -len);
    }
    ctx.stroke();

    if (len < 4) {
        ctx.beginPath();
        ctx.arc(0, -len, 10, 0, Math.PI / 2)
        ctx.fill();
        ctx.restore();
        return;
    }



    drawTree(0, -len, len * 0.75, angle + curve, branchWidth * 0.6);
    drawTree(0, -len, len * 0.75, angle - curve, branchWidth * 0.6);

    ctx.restore();
}

drawTree(canvas.width / 2, canvas.height - 80, 240, 0, 20, 'black', 'pink');

function generateRandomTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let centerPointX = canvas.width / 2;
    let len = Math.floor((Math.random() * 20) + 100);
    let angle = 0;
    let branchWidth = (Math.random() * 70) + 1;
    let color1 = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';
    let color2 = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';
    drawTree(centerPointX, canvas.height - 80, len, angle, branchWidth, color1, color2)

    curve = (Math.random() * 20) + 2;
    curve2 = (Math.random() * 50) + 2;


}


generateButton.addEventListener('click', generateRandomTree)