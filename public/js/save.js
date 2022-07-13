const canvasStates = [render.getImageData(0, 0, canvas.width, canvas.height)]
const botaoRetornar = document.getElementById("botaoRetornar")
const botaoReverter = document.getElementById("botaoReverter")
let recoverStates = []

function saveNewState() {
    const imageData = render.getImageData(0, 0, canvas.width, canvas.height)
    canvasStates.push(imageData)
}

canvas.addEventListener("mouseup", evento => {
    if(toolInfo.tool == "pencil") {
        saveNewState()
        recoverStates = []
        //Nota: o SaveState não funciona muito bem com o balde pois ele salva antes do balde
        //Terminar de executar, assim é necessário consertar o balde primeiro >_<
    }
})

botaoRetornar.addEventListener("click", evento => {
    if(canvasStates.length > 1) {
        recoverStates.push(canvasStates[(canvasStates.length - 1)])
        canvasStates.pop()
        const lastImageData = canvasStates[(canvasStates.length - 1)]
        render.putImageData(lastImageData, 0, 0)
    }
})

botaoReverter.addEventListener("click", evento => {
    if(recoverStates.length > 0) {
        render.putImageData(recoverStates[(recoverStates.length - 1)], 0, 0)
        canvasStates.push(recoverStates[(recoverStates.length - 1)])
        recoverStates.pop()
    }
})



function showDisabledButton() {
    if(recoverStates.length == 0) {
        botaoReverter.style.opacity = 0.5
    }
    else {
        botaoReverter.style.opacity = 1
    }

    if(canvasStates.length == 1) {
        botaoRetornar.style.opacity = 0.5
    }
    else {
        botaoRetornar.style.opacity = 1
    }

}

setInterval(showDisabledButton, 100)