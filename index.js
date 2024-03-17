const canvasParent = document.getElementById('canvas')
const input1 = document.getElementById('text1');
const input3 = document.getElementById('text3');
const inputBottom = document.getElementById('textBottom');
const dividerBtn = document.getElementById("dividerBtn")
const canvas = document.querySelector('canvas');
canvas.width = 500;
canvas.height = 435;
let ctx = canvas.getContext("2d")

//classes for panel , panel details , border details , slabs as smallbox , text and buttons
class innerBox{
constructor(x,y,w,h){
this.x = x;
this.y = y;
this.w = w;
this.h = h
ctx.strokeRect(this.x,this.y,this.w,this.h)
}
innerObj(){
  return{
    x:this.x,
    y:this.y,
    w:this.w,
    h:this.h
  }
}
}
class panelDetail{
  constructor(x,y,w,h,text){
    this.x =x;
    this.y =y;
    this.w=w;
    this.h=h;
    this.text = text;
    ctx.font = "12px Arial"
    ctx.fillStyle = "white"
    ctx.fillRect(this.x,this.y,this.w,this.h)
    ctx.strokeRect(this.x, this.y , this.w , this.h)
    ctx.fillStyle = "black"
    ctx.textAlign = "center"
    ctx.fillText(text, this.x +this.w/2, this.y + this.h/2 + 5)
  }
  panelObj(){
    return{
      x:this.x,
      y:this.y,
      w:this.w,
      h:this.h,
      text:this.text,
    }
  }
}
class borderDetail{
  constructor(x,y,w,h,s){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.s=s;
    this.arr=[];
  }
  array(){
    for(let i=0;i<this.s;i++){
      this.arr.push(new smallBox(this.x,this.y,this.w,this.h/this.s))
      this.y = this.y + this.h/this.s;
    }
  }
  detailObj(){
    return{
      x:this.x,
      y:this.y,
      w:this.w,
      h:this.h,
      s:this.s,
      arr:this.arr,
    }
  }
}
class smallBox{
  constructor(x,y,w,h){
    this.x = x;
    this.y=y;
    this.w=w;
    this.h=h;
  ctx.strokeRect(this.x,this.y,this.w,this.h)
  }
  smallObj(){
    return{
      x:this.x,
      y:this.y,
      w:this.w,
      h:this.h
    }
  }
}
class Text{
  constructor(x,y,w,h,text){
    this.x =x;
    this.y =y;
    this.w=w;
    this.h=h;
    this.text = text;
    ctx.font = "12px Arial"
    ctx.strokeRect(this.x,this.y,this.w,this.h)
    ctx.textAlign = "center"
    ctx.fillText(text, this.x +this.w/3, this.y + this.h/3 + 5 )
  }
  textObj(){
    return{
      x:this.x,
      y:this.y,
      w:this.w,
      h:this.h,
      text:this.text,
    }
  }
}
class Button{
  constructor(x,y,w,h,text){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    ctx.fillStyle = "white"
    ctx.fillRect(this.x,this.y,this.w,this.h)
    ctx.strokeStyle = "black"
    ctx.strokeRect(this.x,this.y,this.w,this.h)
    ctx.font ="20px Arial"
    ctx.fillStyle ="black"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text,this.x+this.w/2,this.y+this.h/2)
  }
  btnObj(){
    return{
      x:this.x,
      y:this.y,
      w:this.w,
      h:this.h,
      text:this.text,
    }
  }
}

//panels , panel details and mainbox as boderbox , buttons and texts.
let panel = new innerBox(85,40,300,350);
let width = new panelDetail(panel.x + panel.w/2 - 15, panel.y - 25, 30, 20,Math.round(panel.w*10)/10)
let height = new panelDetail(panel.x - 84, panel.y + panel.h/2 - 15,25,20,Math.round(panel.h*10)/10)
let borderBox = new innerBox(panel.x + 20, panel.y + 20, panel.w - 40, panel.h - 40);
let mainArr = new borderDetail(borderBox.x , borderBox.y , borderBox.w, borderBox.h, Math.floor(borderBox.h/15));
mainArr.array()
let mainText = new panelDetail(borderBox.x + borderBox.w/2 - 13 , borderBox.y + borderBox.h/2 - 37, 25,25,Math.floor(mainArr.s))
let plusBtn = new Button(borderBox.x + borderBox.w/2,borderBox.y + borderBox.h/2-10,20,20,"+")
let minusBtn = new Button(borderBox.x + borderBox.w/2-25,borderBox.y + borderBox.h/2-10,20,20,"-")
let text1 = new Text(panel.x + panel.w + 5, borderBox.y + 5,50,25,Math.round((borderBox.y - panel.y)*10)/10)
inputText1();
let text3 = new Text(panel.x + panel.w + 5, borderBox.y + borderBox.h - 30,50,25,Math.round((panel.y + panel.h - borderBox.y - borderBox.h)*10)/10)
inputText3();
let textBottom = new Text(borderBox.x + borderBox.w - 55, panel.y + panel.h + 5, 50,25,Math.round((-borderBox.x - borderBox.w + panel.x + panel.w)*10)/10)
inputTextBottom();
let plusSide1 = new Button(text1.x + 38,text1.y,12,12,"+")
let minusSide1 = new Button(text1.x + 38,text1.y + 13,12,12,"-")
let plusSide3 = new Button(text3.x + 38,text3.y,12,12,"+")
let minusSide3 = new Button(text3.x + 38,text3.y + 13,12,12,"-")
let plusBottom = new Button(textBottom.x + 38,textBottom.y,12,12,"+")
let minusBottom = new Button(textBottom.x + 38,textBottom.y + 13, 12,12 ,"-")

//draws line outside the panel used for measurements
ctx.beginPath();
ctx.lineTo(panel.x - 80,panel.y)
ctx.lineTo(panel.x - 60,panel.y)
ctx.moveTo(panel.x - 70,panel.y + 1)
ctx.lineTo(panel.x -70, panel.y + panel.h/2 - 20)
ctx.moveTo(panel.x - 70,panel.y + panel.h/2 + 20)
ctx.lineTo(panel.x - 70, panel.y + panel.h-1)
ctx.moveTo(panel.x - 80, panel.y + panel.h)
ctx.lineTo(panel.x - 60,panel.y + panel.h)
ctx.moveTo(panel.x,panel.y - 25)
ctx.lineTo(panel.x,panel.y - 5)
ctx.moveTo(panel.x + 1,panel.y - 15)
ctx.lineTo(panel.x + panel.w/2 - 20,panel.y - 15)
ctx.moveTo(panel.x + panel.w/2 + 20,panel.y - 15)
ctx.lineTo(panel.x + panel.w - 1 ,panel.y - 15)
ctx.moveTo(panel.x + panel.w, panel.y - 25)
ctx.lineTo(panel.x + panel.w, panel.y - 5)
ctx.moveTo(panel.x + panel.w + 5,panel.y)
ctx.lineTo(panel.x + panel.w + 55, panel.y)
ctx.moveTo(panel.x + panel.w + 5, borderBox.y)
ctx.lineTo(panel.x + panel.w + 55, borderBox.y)
ctx.moveTo(panel.x + panel.w + 5, borderBox.y + borderBox.h)
ctx.lineTo(panel.x + panel.w + 55, borderBox.y + borderBox.h)
ctx.moveTo(panel.x + panel.w + 5, panel.y + panel.h)
ctx.lineTo(panel.x + panel.w + 55,panel.y + panel.h)
ctx.moveTo(borderBox.x + borderBox.w , panel.y + panel.h + 5);
ctx.lineTo(borderBox.x + borderBox.w , panel.y + panel.h + 40);
ctx.moveTo(panel.x + panel.w, panel.y + panel.h + 5);
ctx.lineTo(panel.x + panel.w, panel.y + panel.h + 40)
ctx.stroke()

//functions used
function isInsideButton(mouseX,mouseY,btn){
  return mouseX > btn.x && mouseY > btn.y && mouseX < btn.x + btn.w && mouseY < btn.y + btn.h ;
}

function mainBox(){
  borderBox = new innerBox(borderBox.x,borderBox.y,borderBox.w,borderBox.h)
  mainArr = new borderDetail(borderBox.x , borderBox.y , borderBox.w , borderBox.h,Math.floor(borderBox.h/15))
}

function upperBox(){
borderBox1 = new innerBox(borderBox1.x,borderBox1.y,borderBox1.w,borderBox1.h)
upperArr = new borderDetail(borderBox1.x , borderBox1.y , borderBox1.w , borderBox1.h,Math.floor(borderBox1.h/15))
}

function lowerBox(){
borderBox2 = new innerBox(borderBox2.x,borderBox2.y,borderBox2.w,borderBox2.h)
lowerArr = new borderDetail(borderBox2.x , borderBox2.y , borderBox2.w , borderBox2.h,Math.floor(borderBox2.h/15))
}

function mainBtn(){
mainArr.array()
mainText = new panelDetail(borderBox.x + borderBox.w/2 - 13 , borderBox.y + borderBox.h/2 - 37, 25,25,Math.floor(mainArr.s))
plusBtn = new Button(borderBox.x + borderBox.w/2, borderBox.y + borderBox.h/2 -10,20,20,"+");
minusBtn = new Button(borderBox.x + borderBox.w/2-25,borderBox.y + borderBox.h/2-10,20,20,"-");
}

function upperBtn(){
upperArr.array()
upperText = new panelDetail(borderBox1.x + borderBox1.w/2 - 13 , borderBox1.y + borderBox1.h/2 - 37, 25,25,Math.floor(upperArr.s))
plusBtn1 = new Button(borderBox1.x + borderBox1.w/2, borderBox1.y + borderBox1.h/2 -10,20,20,"+");
minusBtn1 = new Button(borderBox1.x + borderBox1.w/2-25,borderBox1.y + borderBox1.h/2-10,20,20,"-");
}

function lowerBtn(){
lowerArr.array()
lowerText = new panelDetail(borderBox2.x + borderBox2.w/2 - 13 , borderBox2.y + borderBox2.h/2 - 37, 25,25,Math.floor(lowerArr.s))
plusBtn2 = new Button(borderBox2.x + borderBox2.w/2, borderBox2.y + borderBox2.h/2 -10,20,20,"+");
minusBtn2 = new Button(borderBox2.x + borderBox2.w/2-25,borderBox2.y + borderBox2.h/2-10,20,20,"-");
}

function upperSide(){
text1 = new Text(panel.x + panel.w + 5, text1.y,50,25,Math.round(text1.text*10)/10)
inputText1()
plusSide1 = new Button(text1.x + 38,text1.y,12,12,"+")
minusSide1 = new Button(text1.x + 38,text1.y + 13,12,12,"-")
}

function midSide(){
text2 = new Text(text2.x,text2.y, 50, 25,Math.round(text2.text*10)/10)
inputText2()
plusSide2 = new Button(text2.x + 38,text2.y,12,12,"+")
minusSide2 = new Button(text2.x + 38,text2.y + 13,12,12,"-")

text4 = new Text(text4.x,text4.y,50,25,Math.round(text4.text*10)/10)
inputText4()
plusSide4 = new Button(text4.x + 38,text4.y,12,12,"+")
minusSide4 = new Button(text4.x + 38,text4.y + 13,12,12,"-")
}

function lowerSide(){
text3 = new Text(text3.x, text3.y,50,25,Math.round(text3.text*10)/10)
inputText3()
plusSide3 = new Button(text3.x + 38,text3.y,12,12,"+")
minusSide3 = new Button(text3.x + 38,text3.y + 13,12,12,"-")
}

function bottomSide(){
textBottom = new Text(textBottom.x,textBottom.y,50,25,Math.round(textBottom.text*10)/10)
inputTextBottom()
plusBottom = new Button(textBottom.x + 38,textBottom.y,12,12,"+")
minusBottom = new Button(textBottom.x + 38,textBottom.y + 13,12,12,"-")
}

function drawUpper(){
ctx.beginPath()
ctx.moveTo(panel.x + panel.w + 5,panel.y)
ctx.lineTo(panel.x + panel.w + 55, panel.y)
ctx.moveTo(panel.x + panel.w + 5, borderBox.y)
ctx.lineTo(panel.x + panel.w + 55, borderBox.y)
ctx.stroke()
}

function drawUpper1(){
ctx.beginPath()
ctx.moveTo(panel.x + panel.w + 5,panel.y)
ctx.lineTo(panel.x + panel.w + 55, panel.y)
ctx.moveTo(panel.x + panel.w + 5, borderBox1.y)
ctx.lineTo(panel.x + panel.w + 55, borderBox1.y)
ctx.stroke()
}

function drawMid(){
ctx.beginPath()
ctx.moveTo(panel.x + panel.w + 60,borderBox1.y + borderBox1.h)
ctx.lineTo(panel.x + panel.w + 110,borderBox1.y + borderBox1.h)
ctx.moveTo(panel.x + panel.w + 60, borderBox2.y)
ctx.lineTo(panel.x + panel.w + 110, borderBox2.y)
ctx.moveTo(panel.x -55,y2-8)
ctx.lineTo(panel.x - 35,y2 - 8)
ctx.moveTo(panel.x -45,y2-7)
ctx.lineTo(panel.x - 45, y2 - 1)
ctx.moveTo(panel.x - 45, y2 + 26)
ctx.lineTo(panel.x - 45, panel.y + panel.h - 1)
ctx.moveTo(panel.x -55, panel.y + panel.h)
ctx.lineTo(panel.x - 35, panel.y + panel.h)
ctx.stroke() 
}

function drawLower(){
ctx.beginPath()
ctx.moveTo(panel.x + panel.w + 5,panel.y + panel.h)
ctx.lineTo(panel.x + panel.w + 55, panel.y + panel.h)
ctx.moveTo(panel.x + panel.w + 5, borderBox.y + borderBox.h)
ctx.lineTo(panel.x + panel.w + 55, borderBox.y + borderBox.h)
ctx.stroke()
}

function drawLower1(){
ctx.beginPath()
ctx.moveTo(panel.x + panel.w + 5,panel.y + panel.h)
ctx.lineTo(panel.x + panel.w + 55, panel.y + panel.h)
ctx.moveTo(panel.x + panel.w + 5, borderBox2.y + borderBox2.h)
ctx.lineTo(panel.x + panel.w + 55, borderBox2.y + borderBox2.h)
ctx.stroke()
}

function drawBottom(){
  ctx.beginPath()
  ctx.moveTo(borderBox.x + borderBox.w , panel.y + panel.h + 5);
  ctx.lineTo(borderBox.x + borderBox.w , panel.y + panel.h + 40);
  ctx.moveTo(panel.x + panel.w, panel.y + panel.h + 5);
  ctx.lineTo(panel.x + panel.w, panel.y + panel.h + 40)
  ctx.stroke()
}

function drawBottom1(){
ctx.beginPath()
ctx.moveTo(borderBox1.x + borderBox1.w , panel.y + panel.h + 5);
ctx.lineTo(borderBox1.x + borderBox1.w , panel.y + panel.h + 40);
ctx.moveTo(panel.x + panel.w, panel.y + panel.h + 5);
ctx.lineTo(panel.x + panel.w, panel.y + panel.h + 40)
ctx.stroke()
}

function inputText1(){
  input1.value = Math.round(text1.text*10)/10;
// input1.value=20;
  input1.style.left = Math.floor(text1.x).toString() + "px"
  input1.style.top = Math.floor(text1.y).toString() + "px"
}

function inputText2(){
  input2.value = Math.round(text2.text*10)/10;
  input2.style.left = Math.floor(text2.x).toString() + "px"
  input2.style.top = Math.floor(text2.y).toString() + "px"
}

function inputText3(){
  input3.value = Math.round(text3.text*10)/10;
  input3.style.left = Math.floor(text3.x).toString() + "px"
  input3.style.top = Math.floor(text3.y).toString() + "px"
}

function inputText4(){
  input4.value = Math.round(text4.text*10)/10;
  input4.style.left = Math.floor(text4.x).toString() + "px"
  input4.style.top = Math.floor(text4.y).toString() + "px"
}

function inputTextBottom(){
  inputBottom.value = Math.round(textBottom.text*10)/10;
  inputBottom.style.left = Math.floor(textBottom.x).toString() + "px"
  inputBottom.style.top = Math.floor(textBottom.y).toString() + "px"
}

// global variables
let y1;
let y2;
let upperText;
let lowerText;
let plusBtn1;
let minusBtn1;
let borderBox1;
let upperArr;
let borderBox2;
let lowerArr;
let plusBtn2;
let minusBtn2;
let plusSide2;
let minusSide2;
let plusSide4;
let minusSide4;
let text2;
let text4;
let input2=  document.createElement("input");
let  input4 = document.createElement("input");
let dividerAns = false;
dividerBtn.addEventListener("click",()=>{
  dividerAns = true;
})

//event listener of canvas.

canvas.addEventListener('click',function(event){
  var mouseX = event.clientX - canvas.getBoundingClientRect().left;
  var mouseY = event.clientY - canvas.getBoundingClientRect().top;
  if(dividerAns == true){
    for(let item of mainArr.arr){
      if(isInsideButton(mouseX,mouseY,item.smallObj())){
        y1 = item.y;
        y2 = y1 + 15;
        // input2 = document.createElement("input")
        input2.type = "number";
       
        input4.type = "number";
        canvasParent.append(input2)
        canvasParent.append(input4)

        dividerAns = false;
        ctx.clearRect(borderBox.x-1,borderBox.y-1,borderBox.w+2,borderBox.h+2)
        borderBox1 = new innerBox(borderBox.x,borderBox.y,borderBox.w,y1-borderBox.y)
        upperArr = new borderDetail(borderBox1.x , borderBox1.y, borderBox1.w, borderBox1.h,Math.floor(borderBox1.h/15))
        upperArr.array()
        upperText = new panelDetail(borderBox1.x + borderBox1.w/2 - 13 , borderBox1.y + borderBox1.h/2 - 37, 25,25,Math.floor(upperArr.s))
        plusBtn1 = new Button(borderBox1.x + borderBox1.w/2, borderBox1.y + borderBox1.h/2 -10,20,20,"+");
        minusBtn1 = new Button(borderBox1.x + borderBox1.w/2-25,borderBox1.y + borderBox1.h/2-10,20,20,"-");

        borderBox2 = new innerBox(borderBox.x,y2,borderBox.w,borderBox.h+borderBox.y-y2);
        lowerArr = new borderDetail(borderBox2.x, borderBox2.y, borderBox2.w, borderBox2.h,Math.floor(borderBox2.h/15))
        lowerArr.array()
        lowerText = new panelDetail(borderBox2.x + borderBox2.w/2 - 13 , borderBox2.y + borderBox2.h/2 - 37, 25,25,Math.floor(lowerArr.s))
        plusBtn2 = new Button(borderBox2.x + borderBox2.w/2, borderBox2.y + borderBox2.h/2 -10,20,20,"+");
        minusBtn2 = new Button(borderBox2.x + borderBox2.w/2-25,borderBox2.y + borderBox2.h/2-10,20,20,"-");

        ctx.clearRect(panel.x + panel.w + 59,panel.y - 1,52,panel.h + 2)
        ctx.clearRect(panel.x - 56,panel.y - 1,52,panel.h + 2)
        ctx.beginPath()
        ctx.lineTo(panel.x + panel.w + 60,y1)
        ctx.lineTo(panel.x + panel.w + 110, y1)
        ctx.moveTo(panel.x + panel.w + 60, y2)
        ctx.lineTo(panel.x + panel.w + 110,y2)
        ctx.moveTo(panel.x -55,y2 - 8)
        ctx.lineTo(panel.x - 35,y2 - 8)
        ctx.moveTo(panel.x - 45,y2-7)
        ctx.lineTo(panel.x - 45, y2 - 1)
        ctx.moveTo(panel.x - 45, y2 + 26)
        ctx.lineTo(panel.x - 45, panel.y + panel.h - 1)
        ctx.moveTo(panel.x - 55, panel.y + panel.h)
        ctx.lineTo(panel.x - 35, panel.y + panel.h)
        ctx.stroke()
        text2 = new Text(panel.x + panel.w + 60, y2 + 5, 50, 25,Math.round((borderBox2.y - borderBox1.y - borderBox1.h)*10)/10)
        inputText2()
        text4 = new Text(panel.x- 55,y2,50,25,Math.round((panel.y + panel.h - y2 + 8)*10)/10)
        inputText4()
        plusSide2 = new Button(text2.x + 38,text2.y, 12,12,"+" )
        minusSide2 = new Button(text2.x + 38, text2.y + 13, 12 , 12,"-")
        plusSide4 = new Button(text4.x + 38,text4.y, 12,12, "+")
        minusSide4 = new Button(text4.x + 38,text4.y + 13, 12 ,12,"-")
        
      }
    }
  }

  if(isInsideButton(mouseX,mouseY,minusBtn.btnObj())){
    ctx.clearRect(borderBox.x - 1,borderBox.y-1,borderBox.w+2,borderBox.h+2);
    mainArr.s-=1;
    mainArr.y=borderBox.y;
    mainBtn();
  }

  if(isInsideButton(mouseX,mouseY ,plusBtn.btnObj())){
    ctx.clearRect(borderBox.x-1,borderBox.y-1,borderBox.w+2,borderBox.h+2);
    mainArr.s+=1;
    mainArr.y=borderBox.y;
    mainBtn()
  }
  
  if(plusSide1 && plusSide1.btnObj){
    plusSide1.btnObj()
    if(isInsideButton(mouseX,mouseY,plusSide1.btnObj())){
      if(borderBox1){
        ctx.clearRect(borderBox1.x-1,borderBox1.y-1,borderBox1.w+2,borderBox1.h+2)
        ctx.clearRect(panel.x + panel.w + 4, 39,52,borderBox1.y - panel.y + 2 + 45)
        borderBox1.y+=1;
        borderBox1.h-=1;
        text1.text+=1;
        text1.y+=1;
        drawUpper1();
        upperBox();
        upperBtn();
        upperSide();

      }else if(borderBox){
        ctx.clearRect(borderBox.x-1,borderBox.y-1,borderBox.w+2,borderBox.h+2)
      ctx.clearRect(panel.x + panel.w + 4, 39,52,borderBox.y - panel.y + 2 + 45)
      borderBox.y+=1;
      borderBox.h-=1;
      text1.text+=1;
      text1.y+=1;
      drawUpper();
      mainBox();
      mainBtn();
      upperSide();
      }
    }
  }
  
  if(minusSide1 && minusSide1.btnObj){
    minusSide1.btnObj()
    if(isInsideButton(mouseX,mouseY,minusSide1.btnObj())){
      if(borderBox1){
        ctx.clearRect(borderBox1.x-1,borderBox1.y-1,borderBox1.w+2,borderBox1.h+2)
        ctx.clearRect(panel.x + panel.w + 4, 39,52,borderBox1.y - panel.y + 2 + 45)
        borderBox1.y-=1;
        borderBox1.h+=1;
        text1.text-=1;
        text1.y-=1;
        drawUpper1();
        upperBox();
        upperBtn();
        upperSide();

      }else if(borderBox){
        ctx.clearRect(borderBox.x-1,borderBox.y-1,borderBox.w+2,borderBox.h+2)
      ctx.clearRect(panel.x + panel.w + 4, 39,52,borderBox.y - panel.y + 2 + 45)
      borderBox.y-=1;
      borderBox.h+=1;
      text1.text-=1;
      text1.y-=1;
      drawUpper();
      mainBox();
      mainBtn();
      upperSide();
      }
    }
  }

  if(plusSide3 && plusSide3.btnObj){
    plusSide3.btnObj()
    if(isInsideButton(mouseX,mouseY,plusSide3.btnObj())){
      if(borderBox2){
        ctx.clearRect(borderBox2.x-1,borderBox2.y-1,borderBox2.w+2,borderBox2.h+2)
        ctx.clearRect(panel.x + panel.w + 4,borderBox2.y + borderBox2.h - 31,52,borderBox2.y - panel.y + 2 + 45)
        borderBox2.h-=1;
        text3.text+=1;
        text3.y-=1;
        drawLower1();
        lowerBox();
        lowerBtn();
        lowerSide();

      }else if(borderBox){
        ctx.clearRect(borderBox.x-1,borderBox.y-1,borderBox.w+2,borderBox.h+2)
      ctx.clearRect(panel.x + panel.w + 4,borderBox.y + borderBox.h - 31,52,borderBox.y - panel.y + 2 + 45)
      borderBox.h-=1;
      text3.text+=1;
      text3.y-=1;
      drawLower();
      mainBox();
      mainBtn()
      lowerSide();
      }
    }
  }

  if(minusSide3 && minusSide3.btnObj){
    minusSide3.btnObj()
    if(isInsideButton(mouseX,mouseY,minusSide3.btnObj())){
      if(borderBox2){
        ctx.clearRect(borderBox2.x-1,borderBox2.y-1,borderBox2.w+2,borderBox2.h+2)
        ctx.clearRect(panel.x + panel.w + 4,borderBox2.y + borderBox2.h - 31,52,borderBox2.y - panel.y + 2 + 45)
        borderBox2.h+=1;
        text3.text-=1;
        text3.y+=1;
        drawLower1();
        lowerBox();
        lowerBtn();
        lowerSide();

      }else if(borderBox){
        ctx.clearRect(borderBox.x-1,borderBox.y-1,borderBox.w+2,borderBox.h+2)
      ctx.clearRect(panel.x + panel.w + 4,borderBox.y + borderBox.h - 31,52,borderBox.y - panel.y + 2 + 45)
      borderBox.h+=1;
      text3.text-=1;
      text3.y+=1;
      drawLower();
      mainBox();
      mainBtn();
      lowerSide();
      }
    }
  }
  
  if(plusBottom && plusBottom.btnObj){
    plusBottom.btnObj()
    if(isInsideButton(mouseX,mouseY,plusBottom.btnObj())){
      if(borderBox1 && borderBox2){
        ctx.clearRect(borderBox1.x-1,borderBox1.y-1,borderBox1.w+2,borderBox1.h+2)
        ctx.clearRect(borderBox2.x-1,borderBox2.y-1,borderBox2.w+2,borderBox2.h+2)
      ctx.clearRect(panel.x,panel.y + panel.h + 1,panel.w + 2,45)
      borderBox1.x+=1;
      borderBox2.x+=1;
      borderBox1.w-=2;
      borderBox2.w-=2;
      textBottom.text+=1;
      textBottom.x-=1;
      drawBottom1();
      upperBox();
      upperBtn();
      lowerBox();
      lowerBtn();
      bottomSide();

      }else if(borderBox){
        ctx.clearRect(borderBox.x-1,borderBox.y-1,borderBox.w+2,borderBox.h+2)
        ctx.clearRect(panel.x,panel.y + panel.h + 1,panel.w + 2,45)
        borderBox.x+=1;
        borderBox.w-=2;
        textBottom.text+=1;
        textBottom.x-=1;
        drawBottom();
        mainBox();
        mainBtn();
        bottomSide();
  
        }
    }
  }

  if(minusBottom && minusBottom.btnObj){
    minusBottom.btnObj()
    if(isInsideButton(mouseX,mouseY,minusBottom.btnObj())){
      if(borderBox1 && borderBox2){
          ctx.clearRect(borderBox1.x-1,borderBox1.y-1,borderBox1.w+2,borderBox1.h+2)
          ctx.clearRect(borderBox2.x-1,borderBox2.y-1,borderBox2.w+2,borderBox2.h+2)
        ctx.clearRect(panel.x,panel.y + panel.h + 1,panel.w + 2,45)
        borderBox1.x-=1;
        borderBox2.x-=1;
        borderBox1.w+=2;
        borderBox2.w+=2;
        textBottom.text-=1;
        textBottom.x+=1;
        drawBottom1();
        upperBox();
        upperBtn();
        lowerBox();
        lowerBtn();
        bottomSide();

        }else if(borderBox){
          ctx.clearRect(borderBox.x-1,borderBox.y-1,borderBox.w+2,borderBox.h+2)
          ctx.clearRect(panel.x,panel.y + panel.h + 1,panel.w + 2,45)
          borderBox.x-=1;
          borderBox.w+=2;
          textBottom.text-=1;
          textBottom.x+=1;
          drawBottom();
         mainBox();
         mainBtn();
         bottomSide();
        
          }
    }
  }

  if(plusSide2 && plusSide2.btnObj){
    plusSide2.btnObj()
    if(isInsideButton(mouseX,mouseY,plusSide2.btnObj())){
      ctx.clearRect(borderBox1.x-1,borderBox1.y-1,borderBox1.w+2,borderBox1.h+2)
      ctx.clearRect(borderBox2.x-1,borderBox2.y-1,borderBox2.w+2,borderBox2.h+2)
      ctx.clearRect(panel.x + panel.w + 59,borderBox1.y + borderBox1.h - 1, 52, borderBox2.y - borderBox1.y - borderBox1.h + 32)
      ctx.clearRect(panel.x -56,y2 - 9,52,text4.text + 2)
      y1-=0.5;
      y2+=0.5;
      borderBox1.h-=0.5;
      borderBox2.y+=0.5;
      borderBox2.h-=0.5;
      text2.text+=1;
      text2.y+=0.5;
      text4.text-=0.5;
      text4.y+=0.5;
      drawMid();
     upperBox();
     upperBtn();
     lowerBox();
     lowerBtn();
     midSide();

    }
  }

  if(minusSide2 && minusSide2.btnObj){
    minusSide2.btnObj()
    if(isInsideButton(mouseX,mouseY,minusSide2.btnObj())){
      ctx.clearRect(borderBox1.x-1,borderBox1.y-1,borderBox1.w+2,borderBox1.h+2)
      ctx.clearRect(borderBox2.x-1,borderBox2.y-1,borderBox2.w+2,borderBox2.h+2)
      ctx.clearRect(panel.x + panel.w + 59,borderBox1.y + borderBox1.h - 1, 52, borderBox2.y - borderBox1.y - borderBox1.h + 32)
      ctx.clearRect(panel.x -56,y2 - 9,52,text4.text + 2)
      y1+=0.5;
      y2-=0.5;
      borderBox1.h+=0.5;
      borderBox2.y-=0.5;
      borderBox2.h+=0.5;
      text2.text-=1;
      text2.y-=0.5;
      text4.text+=0.5;
      text4.y-=0.5;
      drawMid();
     upperBox();
     upperBtn()
     lowerBox();
     lowerBtn()
     midSide();
      
    }
  }
  
  if(plusSide4 && plusSide4.btnObj){
    plusSide4.btnObj()
    if(isInsideButton(mouseX,mouseY,plusSide4.btnObj())){
      ctx.clearRect(borderBox1.x-1,borderBox1.y-1,borderBox1.w+2,borderBox1.h+2)
      ctx.clearRect(borderBox2.x-1,borderBox2.y-1,borderBox2.w+2,borderBox2.h+2)
      ctx.clearRect(panel.x + panel.w + 59,borderBox1.y + borderBox1.h - 1, 52, borderBox2.y - borderBox1.y - borderBox1.h + 32)
      ctx.clearRect(panel.x -56,y2 - 9,52,text4.text + 2)
      y1+=1;
      y2-=1;
      borderBox1.h-=1;
      borderBox2.y-=1;
      borderBox2.h+=1;
      text2.y-=1;
      text4.text+=1;
      text4.y-=1;
      drawMid();
     upperBox();
     upperBtn()
     lowerBox();
     lowerBtn()
     midSide();

    }
  }

  if(minusSide4 && minusSide4.btnObj){
    minusSide4.btnObj()
    if(isInsideButton(mouseX,mouseY,minusSide4.btnObj())){
      ctx.clearRect(borderBox1.x-1,borderBox1.y-1,borderBox1.w+2,borderBox1.h+2)
      ctx.clearRect(borderBox2.x-1,borderBox2.y-1,borderBox2.w+2,borderBox2.h+2)
      ctx.clearRect(panel.x + panel.w + 59,borderBox1.y + borderBox1.h - 1, 52, borderBox2.y - borderBox1.y - borderBox1.h + 32)
      ctx.clearRect(panel.x -56,y2 - 9,52,text4.text + 2)
      y1-=1;
      y2+=1;
      console.log(y1)
      borderBox1.h+=1;
      borderBox2.y+=1;
      borderBox2.h-=1;
      text2.y+=1;
      text4.text-=1;
      text4.y+=1;
      drawMid();
     upperBox();
     upperBtn()
     lowerBox();
     lowerBtn()
     midSide();

    }
  }

  if(plusBtn1 && plusBtn1.btnObj){
    plusBtn1.btnObj()
    if(isInsideButton(mouseX,mouseY,plusBtn1.btnObj())){
      ctx.clearRect(borderBox1.x - 1,borderBox1.y -1,borderBox1.w+2,borderBox1.h+2);
      upperArr.s+=1;
      upperArr.y=borderBox1.y;
      upperBtn()
    }
  }

  if(minusBtn1 && minusBtn1.btnObj){
    minusBtn1.btnObj()
    if(isInsideButton(mouseX,mouseY,minusBtn1.btnObj())){
      ctx.clearRect(borderBox1.x - 1,borderBox1.y-1,borderBox1.w+2,borderBox1.h+2);
      upperArr.s-=1;
      upperArr.y=borderBox1.y;
      upperBtn()
    }
  }

  if(plusBtn2 && plusBtn2.btnObj){
    plusBtn2.btnObj()
    if(isInsideButton(mouseX,mouseY,plusBtn2.btnObj())){
      ctx.clearRect(borderBox2.x-1,borderBox2.y-1,borderBox2.w+2,borderBox2.h+2);
      lowerArr.s+=1;
      lowerArr.y=borderBox2.y;
      lowerBtn()
    }
  }

  if(minusBtn2 && minusBtn2.btnObj){
    minusBtn2.btnObj()
    if(isInsideButton(mouseX,mouseY,minusBtn2.btnObj())){
      ctx.clearRect(borderBox2.x-1,borderBox2.y-1,borderBox2.w+2,borderBox2.h+2);
      lowerArr.s-=1;
      lowerArr.y=borderBox2.y;
      lowerBtn();
    }
  }
 
})




//----------------------------------------------------------my approach for input 1----------------
let Id1=null;
let Id2=null;
 input1.addEventListener("input",(e)=>{
    let inputValue;
    if(Id1!=null && Id2!=null){
        clearInterval(d1);
        clearInterval(Id2);
    }
     id1= setTimeout(()=>{
      inputValue= e.target.value;
   },2000)
   Id2=setTimeout(()=>{
    if(borderBox1){
        ctx.clearRect(borderBox1.x - 1, borderBox1.y -1 , borderBox1.w + 2, borderBox1.h + 2);
        ctx.clearRect(panel.x + panel.w + 4, 39,52,borderBox1.y - panel.y + 2 + 45);
        const newValue = inputValue - text1.text;
         borderBox.y+=newValue;
         borderBox.h-=newValue;
         text1.text = inputValue;
         text1.y+=newValue;
         drawUpper1()
         upperBox()
         upperBtn()
         upperSide()
      
       }else if(borderBox){
        ctx.clearRect(borderBox.x - 1, borderBox.y -1 , borderBox.w + 2, borderBox.h + 2);
        ctx.clearRect(panel.x + panel.w + 4, 39,52,borderBox.y - panel.y + 2 + 45);
        const newValue = inputValue - text1.text;
         borderBox.y+=newValue;
         borderBox.h-=newValue;
         text1.text = inputValue;
         text1.y+=newValue;
         drawUpper()
         mainBox()
         mainBtn()
         upperSide()
       }
   },2001)
 })
 //-----------------------------------------------------------------------------------


//-------------------my approach for input3-------------------------------

let id1=null;
let id2=null;
input3.addEventListener("input",(e)=>{
    let inputValue;
    if(id1!=null && id2!=null){
        clearInterval(id1);
        clearInterval(id2);
    }
     id1= setTimeout(()=>{
      inputValue= e.target.value;
      console.log(inputValue)
   },2000)
   
id2=setInterval(()=>{
    if(borderBox2){
        ctx.clearRect(borderBox2.x-1,borderBox2.y-1,borderBox2.w+2,borderBox2.h+2)
        ctx.clearRect(panel.x + panel.w + 4,borderBox2.y + borderBox2.h - 31,52,borderBox2.y - panel.y + 2 + 45)
        const newValue = inputValue - text3.text;
        borderBox2.h-=newValue;
        text3.text = inputValue;
        text3.y-=newValue;
        drawLower1();
        lowerBox();
        lowerBtn();
        lowerSide();
      }else if(borderBox){
        ctx.clearRect(borderBox.x-1,borderBox.y-1,borderBox.w+2,borderBox.h+2)
      ctx.clearRect(panel.x + panel.w + 4,borderBox.y + borderBox.h - 31,52,borderBox.y - panel.y + 2 + 45)
      const newValue = inputValue - text3.text;
      borderBox.h-=newValue;
      text3.text = inputValue;
      text3.y-=newValue;
      drawLower();
      mainBox();
      mainBtn()
      lowerSide();
      }
},2001)
})
//---------------------------------my aproach-------------------------------------
let idd1=null;
let idd2=null;
input2.addEventListener("input",(e)=>{
    let inputValue;
    if(idd1!=null && idd2!=null){
        clearInterval(idd1);
        clearInterval(idd2);
    }
     id1= setTimeout(()=>{
      inputValue= e.target.value;
      console.log(inputValue)
   },2000)
   
idd2=setInterval(()=>{
    ctx.clearRect(borderBox1.x-1,borderBox1.y-1,borderBox1.w+2,borderBox1.h+2)
    ctx.clearRect(borderBox2.x-1,borderBox2.y-1,borderBox2.w+2,borderBox2.h+2)
    ctx.clearRect(panel.x + panel.w + 59,borderBox1.y + borderBox1.h - 1, 52, borderBox2.y - borderBox1.y - borderBox1.h + 32)
    ctx.clearRect(panel.x -56,y2 - 9,52,text4.text + 2)
    const newValue = inputValue - text2.text;
    y1-=newValue/2;
    y2+=newValue/2;
    borderBox1.h-=newValue/2;
    borderBox2.y+=newValue/2;
    borderBox2.h-=newValue/2;
    text2.text = inputValue;
    text2.y+=newValue/2;
    text4.text-=newValue/2;
    text4.y+=newValue/2;
    drawMid();
   upperBox();
   upperBtn();
   lowerBox();
   lowerBtn();
   midSide();
},2001)
})

//--------------------------------my approach for input4-----------------------
let iD1=null;
let iD2= null;
console.log(input4,input2)
input4.addEventListener('input',(e)=>{
    let inputValue;
    if(iD1!=null && iD2!=null){
        clearInterval(iD1);
        clearInterval(iD2);
    }
     iD1= setTimeout(()=>{
      inputValue= e.target.value;
      console.log(inputValue)
   },2000)

  iD2=setTimeout(()=>{
    ctx.clearRect(borderBox1.x-1,borderBox1.y-1,borderBox1.w+2,borderBox1.h+2)
    ctx.clearRect(borderBox2.x-1,borderBox2.y-1,borderBox2.w+2,borderBox2.h+2)
    ctx.clearRect(panel.x + panel.w + 59,borderBox1.y + borderBox1.h - 1, 52, borderBox2.y - borderBox1.y - borderBox1.h + 32)
    ctx.clearRect(panel.x -56,y2 - 9,52,text4.text + 2)
    const newValue = inputValue - text4.text;
    y1+=newValue;
    y2-=newValue;
    borderBox1.h-=newValue;
    borderBox2.y-=newValue;
    borderBox2.h+=newValue;
    text2.y-=newValue;
    text4.text = inputValue;
    text4.y-=newValue;
    drawMid();
   upperBox();
   upperBtn()
   lowerBox();
   lowerBtn()
   midSide();
  },2001)
  
       
})
//------------------------------------------my approach for botton-------------
let iid1=null;
let iid2=null;
inputBottom.addEventListener("input",(e)=>{
    let inputValue;
    if(iid1!=null && iid2!=null){
        clearInterval(iid1);
        clearInterval(iid2);
    }
     iid1= setTimeout(()=>{
      inputValue= e.target.value;
      console.log(inputValue)
   },2000)
   iid2=setInterval(()=>{
    if(borderBox1 && borderBox2){
        ctx.clearRect(borderBox1.x-1,borderBox1.y-1,borderBox1.w+2,borderBox1.h+2)
        ctx.clearRect(borderBox2.x-1,borderBox2.y-1,borderBox2.w+2,borderBox2.h+2)
      ctx.clearRect(panel.x,panel.y + panel.h + 1,panel.w + 2,45)
      const newValue = inputValue - textBottom.text;
      borderBox1.x+=newValue;
      borderBox2.x+=newValue;
      borderBox1.w-=newValue*2;
      borderBox2.w-=newValue*2;
      textBottom.text = inputValue;
      textBottom.x-= newValue;
      drawBottom1();
      upperBox();
      upperBtn();
      lowerBox();
      lowerBtn();
      bottomSide();
      }else if(borderBox){
        ctx.clearRect(borderBox.x-1,borderBox.y-1,borderBox.w+2,borderBox.h+2)
        ctx.clearRect(panel.x,panel.y + panel.h + 1,panel.w + 2,45)
        const newValue = inputValue - textBottom.text;
        borderBox.x+=newValue;
        borderBox.w-=newValue*2;
        textBottom.text = inputValue;
        textBottom.x-=newValue;
        drawBottom();
        mainBox();
        mainBtn();
        bottomSide();
      }
},2001)
  
})

