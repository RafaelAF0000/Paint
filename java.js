function updateCursor(){
    switch(toolInfo.tool) {
    case "pencil":
        canvas.style.cursor = "url('/cursor.png'), auto"
    break
    case "bucket":
        canvas.style.cursor = "url('/balde.png'), auto"
    break
    case "colorPicker":
        canvas.style.cursor = "url('/contaGotas.png'), auto"
    break
    }
}

updateCursor()
//

function colorToHex(color) {
    let hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}
  
function RGBtoHex(red, green, blue) {
    return  `#${colorToHex(red)}${colorToHex(green)}${colorToHex(blue)}`;
}

//Botão Download

const downloadButton = document.getElementById("downloadButton")

downloadButton.addEventListener("click", evento => {
    canvas.toBlob(blob => {
        const imageUrl = URL.createObjectURL(blob)
        const doDownload = document.getElementById("doDownload")
        doDownload.href = imageUrl
        doDownload.download = "obra_de_arte.png"
        doDownload.click()
    })
})

//

const limparButton = document.getElementById("limparButton")

limparButton.addEventListener("click", evento => {
    changeBackground("#ffffff")
})

//

const labelTamanho = document.getElementById("labelTamanho")
const inputTamanho = document.getElementById("tamanho")

inputTamanho.addEventListener("input", evento => {
    labelTamanho.innerText = `Tamanho ${inputTamanho.value}`
    toolInfo.size = inputTamanho.value
})

//

const inputColor = document.getElementById("inputColor")

inputColor.addEventListener("input", evento => {
    toolInfo.color = inputColor.value
})

//

const selectTool = document.getElementById("selectTool")

selectTool.addEventListener("input", evento => {
    toolInfo.tool = selectTool.value
    updateCursor()
})


//

function getColor(x, y) {
    const imageColor = render.getImageData(x, y, 1, 1)
    const color = RGBtoHex(imageColor.data[0], imageColor.data[1], imageColor.data[2])
    return color
}

function bucketFill(x, y, oldColor) {
    if(getColor(x, y) == oldColor) {
        render.fillRect(x, y, 1, 1)
        
        bucketFill(x - 1, y, oldColor)
        bucketFill(x + 1, y, oldColor)
        bucketFill(x, y - 1, oldColor)
        bucketFill(x, y + 1, oldColor)
    }
}

canvas.addEventListener("click", evento => {
    if(toolInfo.tool == "bucket") {
        updateMousePosition(evento)
        const posX = mouseInfo.posX
        const posY = mouseInfo.posY
        render.fillStyle = toolInfo.color
        bucketFill(posX, posY, getColor(posX, posY))
    }
    else if(toolInfo.tool == "colorPicker") {
        updateMousePosition(evento)
        const inputColor = document.getElementById("inputColor")
        inputColor.value = getColor(mouseInfo.posX, mouseInfo.posY)
        toolInfo.color = getColor(mouseInfo.posX, mouseInfo.posY)
    }
})