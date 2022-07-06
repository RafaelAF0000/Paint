const canvas = document.getElementById("quadro")
const render = canvas.getContext("2d")

const mouseInfo = {
    isPressed: false,
    posX: 0,
    posY: 0 
}

const toolInfo = {
    toolType: "round",
    color: "#000000",
    size: 4,
    background: "#ffffff",
    tool: "pencil"
}

function changeBackground(color) {
    render.fillStyle = color
    render.fillRect(0, 0, canvas.width, canvas.height); //background Branco padrão
}

changeBackground(toolInfo.background)

function updateMousePosition(eventoInfo, adjustPointerX = 0, adjustPointerY = 0){
    const canvasPosition = canvas.getBoundingClientRect()
    mouseInfo.posX = (eventoInfo.clientX - canvasPosition.left) - adjustPointerX
    mouseInfo.posY = (eventoInfo.clientY - canvasPosition.top) - adjustPointerY
    //subtração para corrigir imperfeições do ponteiro
    
    console.log(`X: ${mouseInfo.posX}, Y: ${mouseInfo.posY}`)
}

function draw(eventoInfo){
    if(toolInfo.tool == "pencil"){
        updateMousePosition(eventoInfo)
    
        render.lineCap = toolInfo.toolType
        render.lineWidth = toolInfo.size
        render.strokeStyle = toolInfo.color
        
        render.lineTo(mouseInfo.posX, mouseInfo.posY) 
        render.stroke()
    }
}

canvas.addEventListener("mousedown", evento => {
    mouseInfo.isPressed = true
    draw(evento) // também desenhar quando clicar
})

canvas.addEventListener("mouseup", evento => {
    mouseInfo.isPressed = false
    render.beginPath() // reiniciar/encerrar path
})

canvas.addEventListener("mouseleave", evento => {
    mouseInfo.isPressed = false
    render.beginPath() //reiniciar path e cancelar o mouse
})

canvas.addEventListener("mousemove", evento => {
    if(mouseInfo.isPressed){
        draw(evento)
    }
})

