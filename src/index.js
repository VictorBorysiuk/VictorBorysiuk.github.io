import Model from './js/model/model';
import View from './js/view/view';
import Controller from './js/controller/controller';



const main = () => {
    
    const model = new Model();
    const view = new View();
    const controller = new Controller( model, view);

    controller.loadGame();
};

window.onload = main;