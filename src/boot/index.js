import $ from 'jquery';
import _ from 'lodash';
import store from '@/store';
import constants from '@/constants';
import { setCanvas } from '@/ui/window';
import loop from '@/loop/';
import render from '@/loop/render';
import input from '@/loop/input';

const loadAssets = () => {
  var assetPromises = [];
  let loadedAssets = store.getters['loadedAssets'];

  _.each(constants.assets, function(asset, assetName) {
    var assetImage = new Image();
    var assetDeferred = new $.Deferred();

    assetImage.onload = function() {
      assetImage.width /= 2;
      assetImage.height /= 2;
      store.dispatch('loadedAssets', [assetName, assetImage]);
      assetDeferred.resolve();
    };
    assetImage.src = asset;

    assetPromises.push(assetDeferred.promise());
  });
  return $.when.apply($, assetPromises);
};

const initialize = gameLoop => {
  input.setupKeyhandler();
  loadAssets().then(function() {
    render.placeInitialObstacles();
    requestAnimationFrame(gameLoop);
  });
};

const boot = () => {
  setCanvas();
  initialize(loop.loop);
};

export default {
  boot,
};
