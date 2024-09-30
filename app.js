const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
});

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    console.log("resize");
    init();
});

function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.dx = (Math.random() - 0.5);
    this.dy = (Math.random() - 0.5);

    if (this.x < radius) this.x = radius;
    if (this.y < radius) this.y = radius;
    if (this.x + radius >= canvas.width) this.x -= radius;
    if (this.y + radius >= canvas.height) this.y -= radius;

    this.a = Math.floor(Math.random() * 3);
    this.b = Math.floor(Math.random() * 3);

    if (this.a % 2) this.dx *= -1;
    if (this.b % 2) this.dy *= -1;

    this.radius = radius;
    this.r = Math.floor(Math.random() * 255);
    this.g = Math.floor(Math.random() * 255);
    this.b = Math.floor(Math.random() * 255);

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
        c.fill();
    }
    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + radius >= canvas.width || this.x <= radius) {
            this.dx *= -1;
        }
        if (this.y + radius >= canvas.height || this.y <= radius) {
            this.dy *= -1;
        }

        // Interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < 50) this.radius += 2; // Limit the maximum radius
        } else if (this.radius > 30) {
            this.radius -= 2; // Shrink back to the original size
        }

        this.draw();
    }
}

let circleArray;
function init() {
    console.log("init function called");
    circleArray = [];
    for (let i = 0; i < 200; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let radius = 30;
        circleArray.push(new Circle(x, y, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
console.log(11)
init();  // Ensure init is called before animate
animate();
