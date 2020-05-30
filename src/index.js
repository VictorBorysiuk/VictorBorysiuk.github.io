import * as PIXI from 'pixi.js';

const main = () => {
    let app;
    let canvasContainer = document.getElementById("showPixi");
    let width = canvasContainer.innerWidth || 726;
    let height = canvasContainer.innerHeight || width/2;
    const colors = [0xFFFF0B, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 0x41ccc9, 0xe03375, 0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba]; //массив цветов
    let gravity = 4;
    let figuresAmount = 0; //количество созданных фигур
    const figure = []; //массив хранящий нашу фигуру
    let NumberOfShapesPesSec = 1;

    let appOptions = {  
        width: width,
        height: height,
        resolution: window.devicePixelRatio,
        roundPixels: true,
        transparent: false,
        backgroundColor: 0xdbe4c5,
        };

    window.variables = {
        app,
        width,
        height,
        appOptions,
        colors,
        gravity,
        figuresAmount,
        figure,
        NumberOfShapesPesSec        
    };
    const model = new Model();
    const view = new View();
    const controller = new Controller( model, view);

    controller.loadGame();
};

window.onload = main;
     


class Model {
  

    createCanvas() {
        
        window.variables.app = new PIXI.Application(window.variables.appOptions);
        document.getElementById("showPixi").appendChild(window.variables.app.view); //выводим его в тело страницы 
        document.getElementById("GravityValue").innerHTML = window.variables.gravity;
        document.getElementById("NumberShapesPesSec").innerHTML = window.variables.NumberOfShapesPesSec;
        PIXI.utils.skipHello();
    }

    requestInterval( fn, delay ) {
        let requestAnimFrame = (function () {
          return window.requestAnimationFrame || function (callback) {
            window.setInterval(callback, 1000);
          };
        })(),
        start = new Date().getTime(),
        handle = {};
        function loop() {
          handle.value = requestAnimFrame(loop);
          const current = new Date().getTime(),
          delta = current - start;
          if (delta >= delay) {
            fn.call();
            start = new Date().getTime();
          }
        }
        handle.value = requestAnimFrame(loop);
        return handle;
    }

    drawShapes( x=0, y=0 ) {


        
        let controller = new Controller();
        
        const rand = Math.floor(Math.random() * window.variables.colors.length);
        const inAreaX = window.variables.width - 100; 
        const shapesY = y || -100; 
        const shapesX = x || Math.floor(Math.random() * inAreaX);

        let shapes = new PIXI.Graphics(); //создаем новый графический элемент

        shapes.beginFill(window.variables.colors[rand], 1);
        const diffrendShapes = ['Triangle','Rect', 'Pentagon', 'Hexagon', 'Circle', 'Ellipse', 'Random'];
        const randShapes = controller.randomRange(0, diffrendShapes.length);//Math.floor(Math.random() * diffrendShapes.length);
        const type = diffrendShapes[randShapes];
        switch (type) {
            case 'Triangle':
                shapes.moveTo(shapesX, shapesY);
                shapes.lineTo(shapesX+100, shapesY);
                shapes.lineTo(shapesX+50, shapesY + 50);
                shapes.lineTo(shapesX, shapesY);
                shapes.closePath();
                break;
            
            case 'Rect':
                let a = controller.randomRange(30, 100);
                let b = controller.randomRange(30, 100);
                shapes.drawRect(shapesX, shapesY,  a, b); //рисуем квадрат
                break;
            case 'Pentagon':
                const pathPentagon = [shapesX+50, shapesY, shapesX+100, shapesY+50, shapesX+100, shapesY+100, shapesX, shapesY+100, shapesX, shapesY+50];
                shapes.drawPolygon(pathPentagon);
                break;
            case 'Hexagon':
                let pathHexagon = [shapesX+50, shapesY,
                                     shapesX+100, shapesY+33, 
                                     shapesX+100, shapesY+66,
                                     shapesX+50, shapesY+99,  
                                     shapesX, shapesY+66, 
                                    shapesX, shapesY+33];
                shapes.drawPolygon(pathHexagon);
                break;
            case 'Circle':
                let radius = controller.randomRange(30, 50); //радиус круга
                shapes.drawCircle(shapesX, shapesY, radius); //рисуем круг
                break;
            case 'Ellipse':
                let aEllipse = controller.randomRange(20, 30)
                let bEllipse = controller.randomRange(35, 50)
                shapes.drawEllipse(shapesX, shapesY, bEllipse,aEllipse); //рисуем овал
                break;
            default:
                shapes.drawStar(shapesX, shapesY, controller.randomRange(5, 20), controller.randomRange(5, 50));       
        }
        
        shapes.endFill();

        shapes.interactive = true; //делаем круг интерактивным
        shapes.buttonMode = true; //меняем курсор при наведении
        let pixels = window.variables.app.renderer.extract.pixels(shapes);
        shapes.areaShapes = pixels.length;
        shapes.live = true; //указываем что наш шарик жив :)
        shapes.type = type;
        window.variables.figuresAmount++;
        shapes.num = window.variables.figuresAmount; //даем нашей фигуре порядковый номер
        window.variables.figure.push(shapes); //обратиться на прямую к объекту shapes мы не можем, поэтому отправляем его в массив
        window.variables.app.stage.addChild(shapes); //выводим фигуру на холст
        shapes.on('click', controller.clearFigure); //добавляем возможность при клике на фигуру удалить её            
                
    }
}

class View {
    
}

class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;
        
    }
    
    loadGame() {
        console.log(this.model);
        this.model.createCanvas();
        
        console.log(this.model.__proto__.drawShapes);
       
        
        
        this.increasGravityValue();
        this.decreaseGravityValue();
        this.increasNumberOfFigure();
        this.decreaseNumberOfFigure();
        this.addShapesWithDbclick();

        //this.model.requestInterval(this.model.drawShapes,1000);
        this.model.requestInterval(this.drawCirclePerSec,1000);

        window.variables.app.ticker.add(function() { //постоянное обновление холста
            
            for (let i = 0; i <window.variables.figuresAmount; i++) {
                window.variables.figure[i].position.y += window.variables.gravity; 
                
                if ( window.variables.figure[i].position.y > (window.variables.height+110) && window.variables.figure[i].live == true) {
                    let countForDel = window.variables.app.stage.children.filter(i => i.position.y > (window.variables.height+110)).length;
                    window.variables.app.stage.children.splice(0, countForDel);                    
                    window.variables.figure[i].live = false;
                    window.variables.figure[i].clear();
                    let countShapesInArea = window.variables.figure.filter(i => i.live === true).length;
                    let countSurfaceArea = window.variables.figure.filter(i => i.live === true).reduce((total, i) => total+i.areaShapes, 0);
                    document.getElementById("NumberOfShapes").innerHTML = countShapesInArea;
                    document.getElementById("surfaceArea").innerHTML = countSurfaceArea; 
                    
                }
            }
        });
    }

    drawCirclePerSec() {
        let model = new Model();
        let n = 1;
            while(n<=window.variables.NumberOfShapesPesSec){

                model.drawShapes();
                ++n;
                let countShapesInArea = window.variables.figure.filter(i => i.live === true).length;
                document.getElementById("NumberOfShapes").innerHTML = countShapesInArea;
                let countSurfaceArea = window.variables.figure.filter(i => i.live === true).reduce((total, i) => total+i.areaShapes, 0);
                document.getElementById("surfaceArea").innerHTML = countSurfaceArea;
            }
    }

    clearFigure() {
       
        window.variables.figure[this.num].live = false;
        window.variables.figure.filter(i => i.type === this.type).map(i => i.tint = window.variables.colors[Math.floor(Math.random() * window.variables.colors.length)]);
        window.variables.figure[this.num].clear();
    }
    increasNumberOfFigure() {
        [].forEach.call(document.querySelectorAll('.btnPlusNumber'), function(item) {
            item.addEventListener('click', function() {
                window.variables.NumberOfShapesPesSec++;
                 document.getElementById("NumberShapesPesSec").innerHTML = window.variables.NumberOfShapesPesSec;    
            });
        });
    }
    decreaseNumberOfFigure() {
        [].forEach.call(document.querySelectorAll('.btnMinusNumber'), function(item) {
            item.addEventListener('click', function() {
                if(window.variables.NumberOfShapesPesSec === 0) {
                    window.variables.NumberOfShapesPesSec = 0;
                } else {
                    window.variables.NumberOfShapesPesSec--;
                }
                 document.getElementById("NumberShapesPesSec").innerHTML = window.variables.NumberOfShapesPesSec;
            });
        });
    }
    increasGravityValue() {
        [].forEach.call(document.querySelectorAll('.btnPlusGravity'), function(item) {
            item.addEventListener('click', function() {
                window.variables.gravity++;
                 document.getElementById("GravityValue").innerHTML = window.variables.gravity;
        
            });
        });
    }
    decreaseGravityValue() {
        [].forEach.call(document.querySelectorAll('.btnMinusGravity'), function(item) {
            item.addEventListener('click', function() {
                if(window.variables.gravity > 1) {
                    window.variables.gravity--;
                }
                 document.getElementById("GravityValue").innerHTML = window.variables.gravity;
        
            });
        });
    }
    addShapesWithDbclick() {
        
        [].forEach.call(document.querySelectorAll('#showPixi'), function(item) {
            item.addEventListener('dblclick', function(e) {
                window.variables.drawShapes(e.layerX, e.layerY);
            });
        });  
    }

    randomRange(start, finish) {
      return  start + Math.floor(Math.random() * finish);
    }
}



