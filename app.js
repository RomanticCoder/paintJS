const canvas = document.getElementById("jsCanvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const ctx = canvas.getContext("2d");
const jsRange = document.querySelector("#jsRange");
ctx.lineWidth = jsRange.value;
ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width, canvas.height);
ctx.fillStyle= "black";
ctx.strokeStyle = "black";

const imageBtn = document.getElementById("imageBtn");
const imageUl = document.getElementById("controls__images");
const color_container = document.querySelector(".controls__basic_color");

const jsSaveBtn = document.querySelector("#jsSaveBtn");
const jsPaintBtn = document.querySelector("#jsPaintBtn");
const jsFillBtn = document.querySelector("#jsFillBtn");
const jsClearBtn = document.querySelector("#jsClearBtn");

const jsRectBtn = document.querySelector("#jsRectBtn");
const jsCircleBtn = document.querySelector("#jsCircleBtn");

const currentColor = document.querySelector("#jsCurrentColor");
const buttons = document.querySelectorAll(".controlBtn");

const colors = ["#1c1c1c","#ffffff","#f73939","#f57242","#ffed4d","#43b025","#20d6c7","#2a6a80","#552a80","#f987ff"];
const SHOWING = "showing";


function handleImageBtnClick(event){
const i = imageUl.getElementsByClassName("controls__image");
 Array.from(i).forEach((item)=>{
     item.classList.toggle(SHOWING);
 })
}

let drawing = false;
let painting = true;
let filling = false;
let rectangle = false;
let circle = false;

let beginX;
let beginY;


if(imageBtn){
imageBtn.addEventListener("click", handleImageBtnClick);    

}
currentColor.style.backgroundColor = ctx.strokeStyle;

function handleColorClick(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
    currentColor.style.backgroundColor = ctx.strokeStyle;

}

if(colors){
Array.from(colors).forEach((color)=>{
    const color_div = document.createElement("div");
    color_div.className = "controls__color";
    color_div.style.backgroundColor = color;
    color_container.appendChild(color_div);
    color_div.addEventListener("click",handleColorClick);
})
}

function startDrawing(event){
    drawing = true;
    beginX = event.offsetX;
    beginY = event.offsetY;
    if(rectangle === true){
        ctx.beginPath();
    }else if(circle === true){
        ctx.beginPath();
    }
}

function stopDrawing(event){
    drawing = false;
    const x = event.offsetX;
    const y = event.offsetY;
    if(rectangle === true){
        ctx.fillRect(beginX, beginY, x-beginX, y-beginY);
    }else if(circle === true){
        console.log(x -beginX);
        ctx.arc((x+beginX)/2, (y+beginY)/2, Math.abs(x - beginX) /2, 0, 2 * Math.PI);
        ctx.fill();

        //ctx.arc(200 , 200, 100, 0, 2 * Math.PI, false);
    }
}


function handleMouseMove(event){
    let x = event.offsetX;
    let y = event.offsetY;
    if(painting){
        if(!drawing){
            ctx.beginPath();    
            ctx.moveTo(x, y);
        }else{
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
    
}

function handleMouseClick(event){
    if(filling){
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
    }
}

function handleButtonsClick(event){
    Array.from(buttons).forEach((button)=>{
        //console.log(button);
        button.classList.remove("clicked");
        //console.log(button.classList.contains("clicked"));
    })
    //console.log(event.target.classList.contains("clicked"));
    let targetBtn = event.target;
    if(!event.target.classList.contains("controlBtn")){
        targetBtn = event.target.parentNode;
    }
    targetBtn.classList.toggle("clicked");
    painting = false;
    filling=false;
    rectangle = false;
    circle=false;

}

function handlePaintBtnClick(event){
    handleButtonsClick(event);
    if(!painting){
        painting =true;
    }else{
        painting =false;
    }

}

function handleFillBtnClick(event){

    handleButtonsClick(event);
    if(!filling){
        filling =true;
    }else{
        filling =false;
    }
}

function handleClearBtnClick(event){
    handleButtonsClick(event);
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

function handleRectBtnClick(event){
    handleButtonsClick(event);
    if(!rectangle){
        rectangle = true;
    }else{
        rectangle = false;
    }

}

function handleCircleBtnClick(event){
    handleButtonsClick(event);
    if(!circle){
        circle = true;
    }else{
        circle = false;
    }
}

function handleRangeChange(event){
    ctx.lineWidth = jsRange.value;
}

function handleCanvasSave(event){
    const imageURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href=imageURL;
    a.download = "🖼️painting";
    a.click();
}

function handleRightClick(event){
    event.preventDefault();
}

jsSaveBtn.addEventListener("click",handleCanvasSave);
jsPaintBtn.addEventListener("click",handlePaintBtnClick);
jsFillBtn.addEventListener("click",handleFillBtnClick);
jsClearBtn.addEventListener("click",handleClearBtnClick);
jsRange.addEventListener("change",handleRangeChange);

jsRectBtn.addEventListener("click",handleRectBtnClick);
jsCircleBtn.addEventListener("click",handleCircleBtnClick);

canvas.addEventListener("mousemove",handleMouseMove);
canvas.addEventListener("mousedown",startDrawing);
canvas.addEventListener("mouseup",stopDrawing);
canvas.addEventListener("mouseleave",stopDrawing);
canvas.addEventListener("click",handleMouseClick);
canvas.addEventListener("contextmenu",handleRightClick);