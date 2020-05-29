export default class Model {
   constructor() {
      
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
        let current = new Date().getTime(),
        delta = current - start;
        if (delta >= delay) {
          fn.call();
          start = new Date().getTime();
        }
      }
      handle.value = requestAnimFrame(loop);
      return handle;
  }
  
}
