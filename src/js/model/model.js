export default class Model {
   constructor() {
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
   }
}