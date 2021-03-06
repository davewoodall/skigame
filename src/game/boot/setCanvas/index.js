import $ from 'jquery';
import store from '@/store';

const getWindowInnerHeight = () => {
  return window.innerHeight;
};

const windowDevicePixelRatio = () => {
  return window.devicePixelRatio;
};

const getWindowInnerWidth = () => {
  return window.innerWidth;
};

export const setCanvas = () => {
  let gameWidth = getWindowInnerWidth();
  store.dispatch('gameWidth', getWindowInnerWidth());

  let gameHeight = getWindowInnerHeight();
  store.dispatch('gameHeight', getWindowInnerHeight());

  let canvas = $('<canvas></canvas>')
    .attr('width', gameWidth * windowDevicePixelRatio())
    .attr('height', gameHeight * windowDevicePixelRatio())
    .css({
      width: gameWidth + 'px',
      height: gameHeight + 'px',
    });
  $('#game').append(canvas);

  let ctx = canvas[0].getContext('2d');
  store.dispatch('ctx', ctx);
};
