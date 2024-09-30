const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

let mouseX
let mouseY

canvas.height = window.innerHeight
canvas.width = window.innerWidth


const maxRadius = 35

canvas.onmousemove = function (e) {
    mouseX = e.clientX
    mouseY = e.clientY
}

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init();
})

function Circle(xCoordinate, yCoordinate, radius) {
    const randomNumber = Math.floor(Math.random() * 5)
    const randomTrueOrFalse = Math.floor(Math.random() * 2)

    this.xCoordinate = xCoordinate
    this.yCoordinate = yCoordinate
    this.radius = radius
    this.color = colorArray[randomNumber]

    if (randomTrueOrFalse === 1) {
        this.xVelocity = -Math.random()
    } else {
        this.xVelocity = Math.random()
    }

    if (randomTrueOrFalse === 1) {
        this.yVelocity = -Math.random()
    } else {
        this.yVelocity = Math.random()
    }

    this.update = function () {
        this.xCoordinate += this.xVelocity
        const xDistance = mouseX - this.xCoordinate
        const yDistance = mouseY - this.yCoordinate
        const originalRadius = radius
        this.yCoordinate += this.yVelocity

        // Movement Functions
        if (
            this.xCoordinate + this.radius > canvas.width ||
            this.xCoordinate - this.radius < 0
        ) {
            this.xVelocity = -this.xVelocity
        }
        if (
            this.yCoordinate + this.radius > canvas.height ||
            this.yCoordinate - this.radius < 0
        ) {
            this.yVelocity = -this.yVelocity
        }

        // Radius Decrease Functions
        if (
            xDistance < 50 &&
            xDistance > -50 &&
            this.radius < maxRadius &&
            yDistance < 50 &&
            yDistance > -50
        ) {
            this.radius += 2
        } else if (
            (xDistance >= 50 && originalRadius < this.radius) ||
            (xDistance <= -50 && originalRadius < this.radius) ||
            (yDistance >= 50 && originalRadius < this.radius) ||
            (yDistance <= -50 && originalRadius < this.radius)
        ) {
            this.radius -= 2
        }

        this.draw()
    }

    this.draw = function () {
        c.beginPath()
        c.arc(
            this.xCoordinate,
            this.yCoordinate,
            Math.abs(this.radius),
            0,
            Math.PI * 2
        )
        c.fillStyle = this.color
        c.fill()
    }
}

const colorArray = ['#ff1d58', '#f75990', '#fff685', '#00DDFF', '#0049B7']
let circleArray
const circleCount = 1200
function init() {
    circleArray = []
    for (let i = 0; i < circleCount; i++) {
        const randomXCoordinate = Math.random() * canvas.width
        const randomYCoordinate = Math.random() * canvas.height
        const randomRadius = Math.random() * 5
        circleArray.push(
            new Circle(randomXCoordinate, randomYCoordinate, randomRadius)
        )
    }

}

function updateAll() {
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
    window.requestAnimationFrame(updateAll)
}

init();
updateAll()
