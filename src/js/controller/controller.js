export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init(){
        this.view.createCanvas();
        
        this.increasGravityValue();
        this.decreaseGravityValue();
        this.increasNumberOfFigure();
        this.decreaseNumberOfFigure();
        this.addShapesWithDbclick();

        this.model.requestInterval(this.drawCirclePerSec,1000);
    }

    showMessage() {
        //this.view.render(this.model.data);
        console.log(this.view.createCanvas());
    }
    clearFigure() {
        figure.filter(i => i.type === this.type).map(i => i.tint = colors[Math.floor(Math.random() * colors.length)]);
        figure[this.num].live = false;
        this.clear();
    }
    increasNumberOfFigure() {
        [].forEach.call(document.querySelectorAll('.btnPlusNumber'), function(item) {
            item.addEventListener('click', function() {
                NumberOfShapesPesSec++;
                 document.getElementById("NumberShapesPesSec").innerHTML = NumberOfShapesPesSec;    
            });
        });
    }
    decreaseNumberOfFigure() {
        [].forEach.call(document.querySelectorAll('.btnMinusNumber'), function(item) {
            item.addEventListener('click', function() {
                if(NumberOfShapesPesSec === 0) {
                    NumberOfShapesPesSec = 0;
                } else {
                    NumberOfShapesPesSec--;
                }
                 document.getElementById("NumberShapesPesSec").innerHTML = NumberOfShapesPesSec;
            });
        });
    }
    increasGravityValue() {
        [].forEach.call(document.querySelectorAll('.btnPlusGravity'), function(item) {
            item.addEventListener('click', function() {
                 gravity++;
                 document.getElementById("GravityValue").innerHTML = gravity;
        
            });
        });
    }
    decreaseGravityValue() {
        [].forEach.call(document.querySelectorAll('.btnMinusGravity'), function(item) {
            item.addEventListener('click', function() {
                if(gravity > 1) {
                    gravity--;
                }
                 document.getElementById("GravityValue").innerHTML = gravity;
        
            });
        });
    }
    addShapesWithDbclick() {
        [].forEach.call(document.querySelectorAll('#showPixi'), function(item) {
            item.addEventListener('dblclick', function(e) {
                model.drawShapes(e.layerX, e.layerY);
            });
        });  
    }
    drawCirclePerSec() {
        let n = 1;
            while(n<=NumberOfShapesPesSec){
                model.drawShapes();
                ++n;
                let countShapesInArea = figure.filter(i => i.live === true).length;
                document.getElementById("NumberOfShapes").innerHTML = countShapesInArea;
                let countSurfaceArea = figure.filter(i => i.live === true).reduce((total, i) => total+i.areaShapes, 0);
                document.getElementById("surfaceArea").innerHTML = countSurfaceArea;
            }
    }
    randomRange(start, finish) {
      return  start + Math.floor(Math.random() * finish);
    }
}