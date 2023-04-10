const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const columns = canvas.width / 20;

let drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

function drawMatrixRain() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0f0";
  ctx.font = "20px Courier New";

  for (let i = 0; i < drops.length; i++) {
    const char = characters[Math.floor(Math.random() * characters.length)];
    ctx.fillText(char, i * 20, drops[i] * 20);
    if (drops[i] * 20 > canvas.height || Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrixRain, 50);
