const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const extraObjects = [];

// Kelas untuk partikel utama (molekul/bintang kecil)
class Particle {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = "#64ffda";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Kelas untuk objek tambahan (bintang, buku, sel, planet)
class ExtraObject {
    constructor(type, x, y, size, speedX, speedY) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        if (this.type === "bintang") {
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === "buku") {
            ctx.fillStyle = "#ffcc00";
            ctx.fillRect(this.x, this.y, this.size * 2, this.size);
            ctx.fillStyle = "#000";
            ctx.fillRect(this.x + 2, this.y + 2, this.size * 2 - 4, this.size - 4);
        } else if (this.type === "sel") {
            ctx.fillStyle = "#ff4081";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(this.x + this.size / 3, this.y - this.size / 3, this.size / 3, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === "planet") {
            ctx.fillStyle = "#3498db";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size + 5, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}

// Inisialisasi partikel
function initParticles() {
    for (let i = 0; i < 50; i++) {
        let size = Math.random() * 3 + 2;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() - 0.5) * 2;
        let speedY = (Math.random() - 0.5) * 2;
        particles.push(new Particle(x, y, size, speedX, speedY));
    }
}

// Inisialisasi objek tambahan
function initExtraObjects() {
    const types = ["bintang", "buku", "sel", "planet"];
    for (let i = 0; i < 20; i++) {
        let type = types[Math.floor(Math.random() * types.length)];
        let size = Math.random() * 5 + 5;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() - 0.5) * 1.5;
        let speedY = (Math.random() - 0.5) * 1.5;
        extraObjects.push(new ExtraObject(type, x, y, size, speedX, speedY));
    }
}

// Fungsi animasi
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    extraObjects.forEach((object) => {
        object.update();
        object.draw();
    });

    requestAnimationFrame(animate);
}

// Memulai animasi
initParticles();
initExtraObjects();
animate();

// Membuat animasi tetap berjalan saat layar diresize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.length = 0;
    extraObjects.length = 0;
    initParticles();
    initExtraObjects();
});