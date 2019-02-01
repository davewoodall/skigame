import $ from 'jquery';
import store from '@/store';
import { getSkier } from '@/mixins';
import render from '@/loop/render';

const getSkierAsset = () => {
  let skier = getSkier();
  let skierDirection = skier.direction;
  var skierAssetName;
  switch (skierDirection) {
    case 0:
      skierAssetName = 'skierCrash';
      break;
    case 1:
      skierAssetName = 'skierLeft';
      break;
    case 2:
      skierAssetName = 'skierLeftDown';
      break;
    case 3:
      skierAssetName = 'skierDown';
      break;
    case 4:
      skierAssetName = 'skierRightDown';
      break;
    case 5:
      skierAssetName = 'skierRight';
      break;
  }

  return skierAssetName;
};

const setupKeyhandler = () => {
  $(window).keydown(function(event) {
    let skier = getSkier();
    let skierDirection = skier.direction;
    let skierMapX = skier.mapX;
    let skierMapY = skier.mapY;
    let skierSpeed = skier.speed;

    switch (event.which) {
      case 37: // left
        if (skierDirection === 1) {
          skierMapX = skierMapX - skierSpeed;
          store.dispatch('skierMapX', skierMapX);
          render.placeNewObstacle(skierDirection); // _dw TDD remove argument
        } else {
          skierDirection = skierDirection - 1;
          store.dispatch('skierDirection', skierDirection);
        }
        event.preventDefault();
        break;
      case 39: // right
        if (skierDirection === 5) {
          skierMapX = skierMapX + skierSpeed;
          store.dispatch('skierMapX', skierMapX);
          render.placeNewObstacle(skierDirection);
        } else {
          skierDirection = skierDirection + 1;
          store.dispatch('skierDirection', skierDirection);
        }
        event.preventDefault();
        break;
      case 38: // up
        if (skierDirection === 1 || skierDirection === 5) {
          skierMapY = skierMapY - skierSpeed;
          store.dispatch('skierMapY', skierMapY);
          render.placeNewObstacle(6);
        }
        event.preventDefault();
        break;
      case 40: // down
        store.dispatch('skierDirection', 3);
        event.preventDefault();
        break;
    }
  });
};

export default {
  setupKeyhandler,
  getSkierAsset,
};
