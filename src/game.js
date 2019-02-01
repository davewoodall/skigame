import $ from 'jquery';
import _ from 'lodash';
import config from './config';
import fns from './fns';
import store from './store';

const skiGame = () => {
  fns.setCanvas();
  var gameLoop = function() {
    fns.render();
    requestAnimationFrame(gameLoop);
  };
  fns.initGame(gameLoop);
};
export default skiGame();
