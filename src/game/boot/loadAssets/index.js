import $ from 'jquery';
import _ from 'lodash';
import store from '@/store';
import constants from '@/game/constants';

export const loadAssets = () => {
  var assetPromises = [];

  _.each(constants.assets, function(asset, assetName) {
    var assetImage = new Image();
    var assetDeferred = new $.Deferred();

    assetImage.onload = function() {
      assetImage.width /= 2;
      assetImage.height /= 2;
      store.dispatch('loadedAssets', [assetName, assetImage]);
      assetDeferred.resolve();
    };
    assetImage.src = constants.assetPath + asset;

    assetPromises.push(assetDeferred.promise());
  });
  return $.when.apply($, assetPromises);
};
