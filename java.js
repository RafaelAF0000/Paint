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

function getColorHex(x, y) {
    const imageColor = render.getImageData(x, y, 1, 1)
    const color = RGBtoHex(imageColor.data[0], imageColor.data[1], imageColor.data[2])
    return color
}

function hexColorStringToRGB(hexColor) {
    const checkChar = [...hexColor]
    if(checkChar[0] == "#" && hexColor.length == 7){
        const red = checkChar[1] + checkChar[2]
        const green = checkChar[3] + checkChar[4]
        const blue = checkChar[5] + checkChar[6]
        return [parseInt(red, 16), parseInt(green, 16), parseInt(blue, 16)]
    }
    else {
        console.log("valor Inválido")
    }
}

function bucketFill(x, y, oldColor, RGB) {
    const pixelsCheckList = [x, y]; 
    const newColorData = new ImageData(new Uint8ClampedArray([
        RGB[0], RGB[1], RGB[2], 255,
        RGB[0], RGB[1], RGB[2], 255,
        RGB[0], RGB[1], RGB[2], 255,
        RGB[0], RGB[1], RGB[2], 255,
    ]), 2, 2) //Dados de um Pixel 2x2, um pixel 1x1 completa melhor, mas é mais lento

    while(pixelsCheckList.length > 0) {
        const pixelY = pixelsCheckList.pop();
        const pixelX = pixelsCheckList.pop();
        if(getColorHex(pixelX, pixelY) == oldColor) {
            render.putImageData(newColorData, pixelX, pixelY)

            pixelsCheckList.push(pixelX + 2, pixelY);
            pixelsCheckList.push(pixelX - 2, pixelY);
            pixelsCheckList.push(pixelX, pixelY + 2);
            pixelsCheckList.push(pixelX, pixelY - 2);
        }
    }
    
}

canvas.addEventListener("click", evento => {
    if(toolInfo.tool == "bucket") {
        updateMousePosition(evento, -8, -26)
        const posX = mouseInfo.posX
        const posY = mouseInfo.posY
        if(getColorHex(posX, posY) != toolInfo.color) {
            bucketFill(posX, posY, getColorHex(posX, posY), hexColorStringToRGB(toolInfo.color))
            saveNewState()
            recoverStates = []
        }
    }
    else if(toolInfo.tool == "colorPicker") {
        updateMousePosition(evento)
        const inputColor = document.getElementById("inputColor")
        inputColor.value = getColorHex(mouseInfo.posX, mouseInfo.posY)
        toolInfo.color = getColorHex(mouseInfo.posX, mouseInfo.posY)
    }
})