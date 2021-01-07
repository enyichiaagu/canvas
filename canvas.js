const canvas = document.querySelector('canvas')
const button = document.querySelector('button')

const c = canvas.getContext('2d')

// c.fillStyle = 'yellow'
// c.fillRect(100, 100, 100, 100)

// c.fillStyle = 'blue'
// c.fillRect(400, 100, 100, 100)

// c.fillStyle = 'cyan'
// c.fillRect(300, 300, 100, 100)

// // Line

// c.beginPath()
// c.moveTo(50, 300)
// c.lineTo(300, 100)
// c.lineTo(350, 400)
// c.strokeStyle = 'red'
// c.stroke()

// // Arc / circle
// c.beginPath()
// c.arc(400, 300, 30, 0, Math.PI * 2, false)
// c.strokeStyle = 'blue'
// c.stroke()


// const colors = ['red', 'blue', 'yellow', 'brown', 'black']

// for (let i = 0; i < 1000; i++) {
//     const x = Math.floor(Math.random() * canvas.width)
//     const y = Math.floor(Math.random() * canvas.height)
//     const shade = colors[Math.round(Math.random() * colors.length)]
//     c.beginPath()
//     c.arc(x, y, 30, 0, Math.PI * 2, false)
//     c.strokeStyle = shade
//     c.stroke()
// }

const mouse = {
    x: undefined,
    y: undefined
}

const maxRadius = 40
const minRadius = 2

const colorArray = [
    'pink',
    'yellow',
    '#20aaff'
]

move = true
const interactivity = () => {
    move = !move
    button.classList.toggle('paused')
    button.textContent = !move ? 'Start Interactivity' : 'Stop Interactivity'
}


window.addEventListener('mousemove', function(event){
    mouse.x = event.x
    mouse.y = event.y
})

window.addEventListener('resize', init)

let circleArray = []

function init() {
    circleArray = []
    canvas.width = innerWidth
    canvas.height = innerHeight

    for (let i = 0; i < 800; i++) {
        let radius = Math.random() * 3 + 1
        let x = Math.random() * (innerWidth - radius * 2) + radius
        let y = Math.random() * (innerHeight - radius * 2) + radius
        let dx = ((Math.random() - 0.5) * 8)
        let dy = ((Math.random() - 0.5) * 8)
        circleArray.push(new Circle(x, y, dx, dy, radius))

    }
}

function Circle(x, y, dx, dy, radius) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    this.update = function(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
    
        this.x += this.dx
        this.y += this.dy
        
        this.draw()

        // Interactivity
        if (move) {
            if (
                mouse.x - this.x < 50 && 
                mouse.x - this.x > -50 && 
                mouse.y - this.y < 50 && 
                mouse.y - this.y > -50
                ) {
                    if (this.radius < maxRadius) this.radius += 1
            } else if (this.radius > this.minRadius) {
                this.radius -= 1
            }
        } else {
            this.radius = this.minRadius
        }
    }
}


function animate() {
    requestAnimationFrame(animate)

    c.clearRect(0, 0, innerWidth, innerHeight)

    circleArray.map(circle => circle.update())

}

init()
animate()