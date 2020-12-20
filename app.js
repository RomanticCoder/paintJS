const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const range = document.getElementById("jsRange");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.strokeStyle = "black";
ctx.fillStyle = "white";
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fill();    
ctx.lineWidth = range.value;

let painting = false;
let filling = false;
let rectangle = false;
function stopPainting(event){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
        // ctx.closePath(); -> fix the starting point
    }
}

function handleColorClick(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
}

function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}

function onMouseClick(event){
    //fill 일때
    //if(jsMode.classList.)
    if(filling === true){
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();    
    }
}

function handleModeClick(event){
    if(filling === true){
        filling = false;
        jsMode.innerHTML = "fill";
    }else{
        filling = true;
        jsMode.innerHTML = "paint";
    }    
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL('image/png', 1.0);
    const link =document.createElement("a");
    link.href = image;
    link.download = "image🎨" ;
    link.click();

    //downloadImage(dataURL, 'my-canvas.jpeg');

}
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",onMouseClick);
    canvas.addEventListener("contextmenu",handleCM);
  }

// const colors = document.getElementById("jsColors");
// colors.addEventListener("click",handleColorClick);

const jscolors = document.getElementsByClassName("controls__color");
Array.from(jscolors).forEach(color=>{
    color.addEventListener("click",handleColorClick);
})

if(range){
    range.addEventListener("change",handleRangeChange)
}

const jsMode = document.getElementById("jsMode");
jsMode.addEventListener("click",handleModeClick);

const saveBtn = document.getElementById("jsSave");

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}