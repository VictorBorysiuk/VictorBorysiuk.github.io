/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const width = 800;\r\nconst height = 450;\r\n\r\nconst appOptions = {  \r\n  width: width,\r\n  height: height,\r\n  resolution: window.devicePixelRatio,\r\n  roundPixels: true,\r\n  transparent: false,\r\n  backgroundColor: 0xdbe4c5,\r\n};\r\n\r\nlet app; \r\nconst colors = [0xFFFF0B, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 0x41ccc9, 0xe03375, 0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba]; //массив цветов\r\nlet gravity = 4;\r\nlet figuresAmount = 0; //количество созданных фигур\r\nconst figure = []; //массив хранящий нашу фигуру\r\nlet NumberOfShapesPesSec = 1;\r\n\r\ndocument.getElementById(\"GravityValue\").innerHTML = gravity;\r\ndocument.getElementById(\"NumberShapesPesSec\").innerHTML = NumberOfShapesPesSec;\r\n\r\n\r\nconst model = {\r\n    createCanvas: function() {\r\n        app = new PIXI.Application(appOptions); //создае холст\r\n        document.getElementById(\"showPixi\").appendChild(app.view); //выводим его в тело страницы \r\n    },\r\n\r\n    requestInterval: function (fn, delay) {\r\n        let requestAnimFrame = (function () {\r\n          return window.requestAnimationFrame || function (callback) {\r\n            window.setInterval(callback, 1000);\r\n          };\r\n        })(),\r\n        start = new Date().getTime(),\r\n        handle = {};\r\n        function loop() {\r\n          handle.value = requestAnimFrame(loop);\r\n          let current = new Date().getTime(),\r\n          delta = current - start;\r\n          if (delta >= delay) {\r\n            fn.call();\r\n            start = new Date().getTime();\r\n          }\r\n        }\r\n        handle.value = requestAnimFrame(loop);\r\n        return handle;\r\n    },\r\n\r\n    drawShapes: function(x=0,y=0) {\r\n        let areaShapes = 0;\r\n        \r\n        rand = Math.floor(Math.random() * colors.length);\r\n        const inAreaX = width - 100; \r\n        const shapesY = y || -100; \r\n        const shapesX = x || Math.floor(Math.random() * inAreaX);\r\n\r\n        const shapes = new PIXI.Graphics(); //создаем новый графический элемент\r\n\r\n        shapes.beginFill(colors[rand], 1);\r\n        const diffrendShapes = ['Triangle','Rect', 'Pentagon', 'Hexagon', 'Circle', 'Ellipse', 'Random'];\r\n        const randShapes = controller.randomRange(0, diffrendShapes.length);//Math.floor(Math.random() * diffrendShapes.length);\r\n        let type = diffrendShapes[randShapes];\r\n        switch (type) {\r\n            case 'Triangle':\r\n                shapes.moveTo(shapesX, shapesY);\r\n                shapes.lineTo(shapesX+100, shapesY);\r\n                shapes.lineTo(shapesX+50, shapesY + 50);\r\n                shapes.lineTo(shapesX, shapesY);\r\n                shapes.closePath();\r\n                break;\r\n            \r\n            case 'Rect':\r\n                let a = controller.randomRange(30, 100);\r\n                let b = controller.randomRange(30, 100);\r\n                shapes.drawRect(shapesX, shapesY,  a, b); //рисуем квадрат\r\n                break;\r\n            case 'Pentagon':\r\n                const pathPentagon = [shapesX+50, shapesY, shapesX+100, shapesY+50, shapesX+100, shapesY+100, shapesX, shapesY+100, shapesX, shapesY+50];\r\n                shapes.drawPolygon(pathPentagon);\r\n                break;\r\n            case 'Hexagon':\r\n                const pathHexagon = [shapesX+50, shapesY,\r\n                                     shapesX+100, shapesY+33, \r\n                                     shapesX+100, shapesY+66,\r\n                                     shapesX+50, shapesY+99,  \r\n                                     shapesX, shapesY+66, \r\n                                    shapesX, shapesY+33];\r\n                shapes.drawPolygon(pathHexagon);\r\n                break;\r\n            case 'Circle':\r\n                const radius = controller.randomRange(30, 50); //радиус круга\r\n                shapes.drawCircle(shapesX, shapesY, radius); //рисуем круг\r\n                break;\r\n            case 'Ellipse':\r\n                let aEllipse = controller.randomRange(20, 30)\r\n                let bEllipse = controller.randomRange(35, 50)\r\n                shapes.drawEllipse(shapesX, shapesY, bEllipse,aEllipse); //рисуем овал\r\n                break;\r\n            default:\r\n                shapes.drawStar(shapesX, shapesY, controller.randomRange(5, 20), controller.randomRange(5, 50));       \r\n        }\r\n        \r\n        shapes.endFill();\r\n\r\n        shapes.interactive = true; //делаем круг интерактивным\r\n        shapes.buttonMode = true; //меняем курсор при наведении\r\n        pixels = app.renderer.extract.pixels(shapes);\r\n        shapes.areaShapes = pixels.length;\r\n        shapes.live = true; //указываем что наш шарик жив :)\r\n        shapes.type = type;\r\n        figuresAmount++;\r\n        shapes.num = figuresAmount; //даем нашей фигуре порядковый номер\r\n        figure.push(shapes); //обратиться на прямую к объекту shapes мы не можем, поэтому отправляем его в массив\r\n        app.stage.addChild(shapes); //выводим фигуру на холст\r\n        shapes.on('click', controller.clearFigure); //добавляем возможность при клике на фигуру удалить её            \r\n                \r\n    }\r\n}\r\nconst view = {\r\n    loadGame: function() {\r\n        model.createCanvas();\r\n\r\n        controller.increasGravityValue();\r\n        controller.decreaseGravityValue();\r\n        controller.increasNumberOfFigure();\r\n        controller.decreaseNumberOfFigure();\r\n        controller.addShapesWithDbclick();\r\n\r\n        model.requestInterval(controller.drawCirclePerSec,1000);\r\n\r\n        app.ticker.add(function() { //постоянное обновление холста\r\n            \r\n            for (let i = 0; i < figuresAmount; i++) {\r\n                figure[i].position.y += gravity; \r\n                if (figure[i].position.y > (height+110) && figure[i].live == true) {\r\n                    figure[i].clear();\r\n                    figure[i].live = false;\r\n                    let countShapesInArea = figure.filter(i => i.live === true).length;\r\n                    let countSurfaceArea = figure.filter(i => i.live === true).reduce((total, i) => total+i.areaShapes, 0);\r\n                    document.getElementById(\"NumberOfShapes\").innerHTML = countShapesInArea;\r\n                    document.getElementById(\"surfaceArea\").innerHTML = countSurfaceArea;\r\n                }\r\n            }\r\n        });\r\n    }\r\n}\r\n\r\n\r\nconst controller = {\r\n    clearFigure: function() {\r\n        figure.filter(i => i.type === this.type).map(i => i.tint = colors[Math.floor(Math.random() * colors.length)]);\r\n        figure[this.num].live = false;\r\n        this.clear();\r\n    },\r\n    increasNumberOfFigure: function() {\r\n        [].forEach.call(document.querySelectorAll('.btnPlusNumber'), function(item) {\r\n            item.addEventListener('click', function() {\r\n                NumberOfShapesPesSec++;\r\n                 document.getElementById(\"NumberShapesPesSec\").innerHTML = NumberOfShapesPesSec;    \r\n            });\r\n        });\r\n    },\r\n    decreaseNumberOfFigure: function() {\r\n        [].forEach.call(document.querySelectorAll('.btnMinusNumber'), function(item) {\r\n            item.addEventListener('click', function() {\r\n                if(NumberOfShapesPesSec === 0) {\r\n                    NumberOfShapesPesSec = 0;\r\n                } else {\r\n                    NumberOfShapesPesSec--;\r\n                }\r\n                 document.getElementById(\"NumberShapesPesSec\").innerHTML = NumberOfShapesPesSec;\r\n            });\r\n        });\r\n    },\r\n    increasGravityValue: function() {\r\n        [].forEach.call(document.querySelectorAll('.btnPlusGravity'), function(item) {\r\n            item.addEventListener('click', function() {\r\n                 gravity++;\r\n                 document.getElementById(\"GravityValue\").innerHTML = gravity;\r\n        \r\n            });\r\n        });\r\n    },\r\n    decreaseGravityValue: function() {\r\n        [].forEach.call(document.querySelectorAll('.btnMinusGravity'), function(item) {\r\n            item.addEventListener('click', function() {\r\n                if(gravity > 1) {\r\n                    gravity--;\r\n                }\r\n                 document.getElementById(\"GravityValue\").innerHTML = gravity;\r\n        \r\n            });\r\n        });\r\n    },\r\n    addShapesWithDbclick: function() {\r\n        [].forEach.call(document.querySelectorAll('#showPixi'), function(item) {\r\n            item.addEventListener('dblclick', function(e) {\r\n                model.drawShapes(e.layerX, e.layerY);\r\n            });\r\n        });  \r\n    },\r\n    drawCirclePerSec: function() {\r\n        let n = 1;\r\n            while(n<=NumberOfShapesPesSec){\r\n                model.drawShapes();\r\n                ++n;\r\n                let countShapesInArea = figure.filter(i => i.live === true).length;\r\n                document.getElementById(\"NumberOfShapes\").innerHTML = countShapesInArea;\r\n                let countSurfaceArea = figure.filter(i => i.live === true).reduce((total, i) => total+i.areaShapes, 0);\r\n                document.getElementById(\"surfaceArea\").innerHTML = countSurfaceArea;\r\n            }\r\n    },\r\n    randomRange: function(start, finish) {\r\n      return  start + Math.floor(Math.random() * finish);\r\n    }\r\n}\r\n\r\n\r\nview.loadGame();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });