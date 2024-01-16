const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const globalAlpha = 0.5;
const cursor = {
    x: innerWidth / 2,
    y: innerHeight / 2 
};

function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
    this.x = x;
    this.y = y;
    this.particleTrailWidth = particleTrailWidth;
    this.strokeColor = strokeColor;
    this.rotateSpeed = rotateSpeed;
    this.theta = Math.random() * Math.PI * 2;
    this.t = Math.random() * 150;
    this.rotate = () => {
        const ls = {
            x: this.x,
            y: this.y
        };
        this.theta += this.rotateSpeed;
        this.x = cursor.x + Math.cos(this.theta) * this.t;
        this.y = cursor.y + Math.sin(this.theta) * this.t;
        context.beginPath();
        context.lineWidth = this.particleTrailWidth;
        context.strokeStyle = this.strokeColor;
        context.moveTo(ls.x, ls.y);
        context.lineTo(this.x, this.y);
        context.stroke();
    };
}
let particlesArray = [];
function generateParticles(amount) {
    for (let i = 0; i < amount; i++) {
        particlesArray[i] = new Particle(innerWidth / 2, innerHeight / 2, 4, generateColor(), 0.02);
    }
}
function generateColor() {
    let hexSet = "0123456789ABCDEF";
    let finalHexString = "#";
    for (let i = 0; i < 6; i++) {
        finalHexString += hexSet[Math.ceil(Math.random() * 15)];
    }
    return finalHexString;
}
generateParticles(101);
function anim() {
    requestAnimationFrame(anim);
    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => particle.rotate());
}
function setSize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
}
addEventListener("mousemove", (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
});
addEventListener("resize", () => setSize());
addEventListener("touchmove", (e) => {
    e.preventDefault();
    cursor.x = e.touches[0].clientX;
    cursor.y = e.touches[0].clientY;
}, {passive: false}),
setSize()
anim();