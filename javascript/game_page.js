let score=0;
function startGame(){

const sweetsImg = ['images/cupcake.png', 'images/donut.png', 'images/gingerbread.png', 'images/muffin.png', 'images/bomb.png'];
const slicedSweetsImg = ['images/cupcake_part1.png', 'images/cupcake_part2.png', 'images/donut_part1.png', 'images/donut_part2.png', 
'images/gingerbread_part1.png', 'images/gingerbread_part2.png', 'images/muffin_part1.png', 'images/muffin_part2.png']
let candy=[];
let lives=3;
let timer=null;

let canvas={
    width:null,
    height:null,
    canvasField: null,
    createCanvas: function(){
        this.canvasField = document.getElementById("field");
        return this.canvasField.getContext("2d");
    },
    canvasSize: function(){
        let screen=document.documentElement.clientWidth;
        if (screen<=915){
            this.width=560;
            this.height=360;
        }else {
            this.width=650;
            this.height=400;
        }
        this.canvasField.width = this.width;
        this.canvasField.height = this.height;    
    },
}

let ctx = canvas.createCanvas();
canvas.canvasSize();

window.addEventListener("resize",size)
function size (){
    let screen=document.documentElement.clientWidth;
    if (canvas.width !== 560 && screen<=915){
        canvas.canvasSize();
    } else if (canvas.width !== 650 && screen > 915){
        canvas.canvasSize();
    }
}
 

let background={
    posX:0,
    posY:0,
    width:canvas.width,
    height:canvas.height,
    src:'images/BG_game.png',
}

function drawImage(posX,posY,width,height,src){
    let image=new Image();
    image.onload = function(){
        ctx.drawImage(image,posX,posY,width,height);
    };
    image.src=src;
    return true;
}

drawImage(background.posX,background.posY,background.width,background.height,background.src);

let sword={
    posX:null,
    posY:null,
    width:85,
    height:85,
    src:'images/Knife.png',
    update : function(x,y) {
        this.posX=x-this.width/2;
        this.posY=y-this.height/2+5;
    }
}

function drawText(str,x,y,size, color){
    let theString = str;
    ctx.font = `${size}px 'Marmelad',sans-serif`;
    ctx.fillStyle = color;
    ctx.fillText(theString, x, y);
}

let mouse = {};

canvas.canvasField.addEventListener("mousemove", mouseMoveHandler);



function mouseMoveHandler(event){
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
}

class Sweets{
    constructor (x,y,speed,sweet,slicedSweet1,slicedSweet2){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.xSpeed = randomXSpeed(x);
        this.ySpeed = Math.random()*((-5.4)-(-8.4))+(-8.4);
        this.sweet = sweet;
        this.sliced = false;
        this.slicedSweet1 = slicedSweet1;
        this.slicedSweet2 = slicedSweet2;
        this.gravity = 0.1;
        this.width = 50;
        this.height = 50;
        this.visible = true;
    }

    drawSweet(){
        if(this.sliced && this.sweet != 'images/bomb.png'){ 
            drawImage(this.x-10,this.y,this.width,this.height/2,this.slicedSweet1);
            drawImage(this.x+10,this.y+50,this.width,this.height/2,this.slicedSweet2);
        }else{
            drawImage(this.x,this.y,this.width,this.height,this.sweet);
        }
    }

    update(){
        if(this.sliced && this.sweet != 'images/bomb.png'){ 
            this.x -= this.xSpeed ;
            this.y += this.ySpeed;
            this.ySpeed += this.gravity*5;
        }else{
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.ySpeed += this.gravity;
        }

        if(this.y > canvas.height){
            this.visible = false;
        }
    }
}

function randomSweet(){
    let x = Math.floor(Math.random()*(canvas.width-0+1))+0;
    let y = canvas.height;
    let speed = Math.random()*(5-3)+3;
    let idx = Math.floor(Math.random()*(sweetsImg.length-1-0+1))+0;
    let sweet = sweetsImg[idx];
    let slicedSweet1 = slicedSweetsImg[2*idx];
    let slicedSweet2 = slicedSweetsImg[2*idx + 1];
    return new Sweets(x,y,speed,sweet,slicedSweet1,slicedSweet2);
}

function randomXSpeed(x){
    if( x > canvas.width/2 ){
        return Math.random()*((-0.5)-(-2.8))+(-2.8); // Если предмет появиться справа,то двигаться он будет налево
    }else{
        return Math.random()*(2.8-0.5)+(0.5); // Если предмет появиться слева,то двигаться он будет направо
    }
};

function drawLives(posX,posY,x,width,color){
    if (document.documentElement.clientWidth<=915){
        ctx.save();
        ctx.scale(.861,.9);
    }
    ctx.translate(posX,posY);
    ctx.rotate((Math.PI / 180) * 45);
    ctx.fillStyle = color; 
    ctx.lineWidth = 2;
    ctx.shadowColor = "#FF7283";
    ctx.shadowOffsetX = 0.5;
    ctx.shadowOffsetY = -1;
    ctx.shadowBlur = 0.5;
    ctx.fillRect(x,-4,width,8);

    ctx.shadowColor = "rgba(0,0,0,0)";

    ctx.rotate((Math.PI / 180) * 90); 
    ctx.fillRect(x,-4,width,8);

    ctx.shadowColor = "rgba(0,0,0,0)";
    ctx.resetTransform();
}

function game(){
    drawImage(background.posX,background.posY,background.width,background.height,background.src);

    if (candy.length %2 ==0){
        if (Math.random()>0.98){
            candy.push(randomSweet());
        }


    } else{
        switch(score){
            case score>=50 && score<100:
                if (Math.random()>0.97){
                    candy.push(randomSweet())
                } 
            break

            case score>=100 && score<200:
                if (Math.random()>0.96){
                    candy.push(randomSweet())
                } 
            break

            case score>=200:
                if (Math.random()>0.95){
                    candy.push(randomSweet())
                } 
            break

            default:
                if (Math.random()>0.99){
                    candy.push(randomSweet())
                }
            break

        }

    }

    for(var i=candy.length-1; i>=0; i--){
        candy[i].update();
        candy[i].drawSweet();
        if(!candy[i].visible){
            if(!candy[i].sliced && candy[i].sweet != 'images/bomb.png'){ 
                lives--;
                audio[1].play();
            }
            if (lives < 1 ) {
                requestAnimationFrame(gameOver);
                return
            };
            candy.splice(i,1);
        }else{
            if(candy[i].sliced && candy[i].sweet == 'images/bomb.png'){
                requestAnimationFrame(gameOver);
                audio[0].play();
                return
            }

            if(checkSlice(candy[i]) && candy[i].sweet != 'images/bomb.png'){ 
                candy[i].update();
                candy[i].drawSweet();
                score++;
                audio[2].play();

                if(score % 100 ==0 && lives<3){
                    lives+=1;
                }
            }

        }
    }

    sword.update(mouse.x,mouse.y);

    drawImage(sword.posX,sword.posY,sword.width,sword.height,sword.src);
    drawImage(36,8,45,45,'images/cupcake_record.png');
    drawText(score,91,46,35,"#FFE600");
 

    switch(lives){
        case 3:
            drawLives(533,20,-10,20,"white");
            drawLives(563,21,-12,24,"white");
            drawLives(596,22,-14,28,"white");
            break;
        
        case 2:
            drawLives(533,20,-10,20,"#FF7283");
            drawLives(563,21,-12,24,"white");
            drawLives(596,22,-14,28,"white");
            break;
        
        case 1:
            drawLives(533,20,-10,20,"#FF7283");
            drawLives(563,21,-12,24,"#FF7283");
            drawLives(596,22,-14,28,"white");
            break;  
            
        case 0:
            drawLives(533,20,-10,20,"#FF7283");
            drawLives(563,21,-12,24,"#FF7283");
            drawLives(596,22,-14,28,"#FF7283");
            break; 
    }
    requestAnimationFrame(game);
}

function checkSlice (candy){
    if(candy.sliced){
        return false;
    }
    let sliced = (mouse.x > candy.x) && (mouse.x < (candy.x + candy.width)) && (mouse.y > candy.y) && (mouse.y < (candy.y + candy.height));
    candy.sliced = sliced;
    return sliced;
}

function start(){
    return timer=requestAnimationFrame(game);
};

const drawCountdown = function() {
    // объект настроек
    const settings = {
        bufferCanvas: null,
        bufferCtx: null,
        countTimer: null,
        counter:4,
    }

    function animate() {
        blank();      // рисуем фон
        countUpdate(); // пересчитывает значения счетчика
        countDraw();   // отрисовка 
        //как только всё отрисовлось в буфере, мы копируем все это в наш основной канвас
        ctx.drawImage(settings.bufferCanvas, 0, 0, canvas.width, canvas.height);
    }

    function blank() {
        let image=new Image();
        image.onload = function(){
            settings.bufferCtx.drawImage(image,0,0,canvas.width,canvas.height);
        };
        image.src='images/BG_game.png';
        }

    function countUpdate() {
        settings.counter --;
        if(!settings.counter){
            clearInterval(settings.countTimer);
            start();
        }
    }

    function countDraw(){
        let theString = settings.counter;

        settings.bufferCtx.font = `50px 'Marmelad',sans-serif`;
        settings.bufferCtx.fillStyle = "#FF7283";
        settings.bufferCtx.textAlign = "center";
        settings.bufferCtx.fillText(theString, canvas.width/2, canvas.height/2);
    }

    // создаем буферизирующий канвас
    settings.bufferCanvas = document.createElement("canvas");
    settings.bufferCtx = settings.bufferCanvas.getContext("2d");
    settings.bufferCtx.canvas.width = canvas.width;
    settings.bufferCtx.canvas.height = canvas.height;

    settings.countTimer=setInterval(animate,1000);
}

drawCountdown();

function gameOver(){
    cancelAnimationFrame(timer);

    drawImage(background.posX,background.posY,background.width,background.height,background.src);
    drawImage(36,8,45,45,'images/cupcake_record.png');
    drawText(score,91,46,35,"#FFE600");
    
    drawLives(533,20,-10,20,"#FF7283");
    drawLives(563,21,-12,24,"#FF7283");
    drawLives(596,22,-14,28,"#FF7283");
    
    if (document.documentElement.clientWidth<=915){
        ctx.save();
        ctx.scale(.861,.9);
        drawImage(160,60,80,60,'images/stars.png');
        drawImage(10,295,110,60,'images/unicorn2.png');
    }else{
        drawImage(180,60,100,80,'images/stars.png');
        drawImage(10,320,130,80,'images/unicorn2.png');
    }
    ctx.fillStyle = "#F272A1";
    ctx.beginPath();
    ctx.moveTo(230, 100);
    ctx.quadraticCurveTo(320, 60, 360, 110);
    ctx.quadraticCurveTo(400, 160, 415, 180);
    ctx.quadraticCurveTo(480, 270, 350, 300);
    ctx.quadraticCurveTo(150, 340, 190, 190);
    ctx.quadraticCurveTo(198, 120, 230, 100);
    ctx.fill();

    drawText("Try again or", 220, 140, 16,"#FFE600");
    drawText("Save your score", 270, 160, 16,"#FFE600");
    drawText("GAME OVER", 200, 220, 38,"white");


    drawText("I'm full, but",40,315,12,"#340404");
    drawText("not much",97,330,12,"#340404");   

    ctx.restore();

    requestAnimationFrame(gameOver);
}
}




