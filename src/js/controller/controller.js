export default class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;
        
    }
    
    loadGame() {

    this.view.createCanvas();

    this.view.increasGravityValue();
    this.view.decreaseGravityValue();
    this.view.increasNumberOfFigure();
    this.view.decreaseNumberOfFigure();
    this.view.addShapesWithDbclick();
    
    this.view.requestInterval(() => {this.view.drawCirclePerSec},1000);

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

    
}