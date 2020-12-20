const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const saveBtn = document.getElementById("jsSave");
const jsMode = document.getElementById("jsMode");
const jsRect = document.getElementById("jsRect");
const range = document.getElementById("jsRange");
const currentColor = document.getElementById("controls__current_color");
const jscolors = document.getElementsByClassName("controls__color");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.strokeStyle = "black";
ctx.fillStyle = "white";
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fill();    
ctx.lineWidth = range.value;
ctx.fillStyle = "black";
let painting = false;
let filling = false;
let rectangle = false;

let beginX = 0;
let beginY = 0;
function stopPainting(event){
    painting = false;
    console.log("stopped");
    if(rectangle === true){
        const x = event.offsetX;
        const y = event.offsetY;
        ctx.strokeRect(beginX, beginY, x-beginX, y-beginY);
        console.log("stopped, x:"+beginX +" y:"+ beginY+" x:"+x+" y:"+y);

    }
}

function startPainting(event){
    painting = true;
    if(rectangle === true){
        beginX = event.offsetX;
        beginY = event.offsetY;
    }
    console.log("started"+ beginX + beginY);

}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!rectangle){
        if(!painting){
            console.log("p:"+painting);
            ctx.beginPath();
            ctx.moveTo(x,y);
        }
        else{
            console.log("p:"+painting);
            ctx.lineTo(x,y);
            ctx.stroke();
            // ctx.closePath(); -> fix the starting point
        }
    }
}

function handleColorClick(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
    currentColor.style.backgroundColor = event.target.style.backgroundColor;
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

function handleRectClick(event){
    if(rectangle === true){
        rectangle = false;
        jsRect.style.backgroundColor = "white";

    }else{
        rectangle = true;
        jsRect.style.backgroundColor = "gray";
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

Array.from(jscolors).forEach(color=>{
    color.addEventListener("click",handleColorClick);
})

if(range){
    range.addEventListener("change",handleRangeChange)
}

jsMode.addEventListener("click",handleModeClick);

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}

if(jsRect){
    jsRect.addEventListener("click", handleRectClick);
}