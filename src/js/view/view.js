import * as PIXI from 'pixi.js';

const colors = [0xFFFF0B, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 0x41ccc9, 0xe03375, 0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba]; //массив цветов
let gravity = 4;
let figuresAmount = 0; //количество созданных фигур
const figure = []; //массив хранящий нашу фигуру
let NumberOfShapesPesSec = 1;

export default class View {

    createCanvas() {
        let canvasContainer = document.getElementById("showPixi");

        const width = canvasContainer.innerWidth || 726;
        const height = canvasContainer.innerHeight || width/2;

        const appOptions = {  
        width: width,
        height: height,
        resolution: window.devicePixelRatio,
        roundPixels: true,
        transparent: false,
        backgroundColor: 0xdbe4c5,
        };
        let app;

        app = new PIXI.Application(appOptions);
        document.getElementById("showPixi").appendChild(app.view); //выводим его в тело страницы 
        document.getElementById("GravityValue").innerHTML = gravity;
        document.getElementById("NumberShapesPesSec").innerHTML = NumberOfShapesPesSec;
    }

    drawShapes(x=0,y=0) {

        let rand = Math.floor(Math.random() * colors.length);
        const inAreaX = width - 100; 
        const shapesY = y || -100; 
        const shapesX = x || Math.floor(Math.random() * inAreaX);

        const shapes = new PIXI.Graphics(); //создаем новый графический элемент

        shapes.beginFill(colors[rand], 1);
        const diffrendShapes = ['Triangle','Rect', 'Pentagon', 'Hexagon', 'Circle', 'Ellipse', 'Random'];
        const randShapes = controller.randomRange(0, diffrendShapes.length);//Math.floor(Math.random() * diffrendShapes.length);
        let type = diffrendShapes[randShapes];
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
                const pathHexagon = [shapesX+50, shapesY,
                                     shapesX+100, shapesY+33, 
                                     shapesX+100, shapesY+66,
                                     shapesX+50, shapesY+99,  
                                     shapesX, shapesY+66, 
                                    shapesX, shapesY+33];
                shapes.drawPolygon(pathHexagon);
                break;
            case 'Circle':
                const radius = controller.randomRange(30, 50); //радиус круга
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
        let pixels = app.renderer.extract.pixels(shapes);
        shapes.areaShapes = pixels.length;
        shapes.live = true; //указываем что наш шарик жив :)
        shapes.type = type;
        figuresAmount++;
        shapes.num = figuresAmount; //даем нашей фигуре порядковый номер
        figure.push(shapes); //обратиться на прямую к объекту shapes мы не можем, поэтому отправляем его в массив
        app.stage.addChild(shapes); //выводим фигуру на холст
        shapes.on('click', controller.clearFigure); //добавляем возможность при клике на фигуру удалить её            
                
    }

    loadGame() {

        app.ticker.add(function() { //постоянное обновление холста
            
            for (let i = 0; i < figuresAmount; i++) {
                figure[i].position.y += gravity; 
                if (figure[i].position.y > (height+110) && figure[i].live == true) {
                    figure[i].clear();
                    figure[i].live = false;
                    let countShapesInArea = figure.filter(i => i.live === true).length;
                    let countSurfaceArea = figure.filter(i => i.live === true).reduce((total, i) => total+i.areaShapes, 0);
                    document.getElementById("NumberOfShapes").innerHTML = countShapesInArea;
                    document.getElementById("surfaceArea").innerHTML = countSurfaceArea;
                }
            }
        });
    }

}