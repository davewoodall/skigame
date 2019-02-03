import store from '@/store';
import _ from 'lodash';
import {
  getObstacles,
  getGameWidth,
  getGameHeight,
  getLoadedAssets,
} from '@/game/mixins';
import { placeRandomObstacle } from '@/game/mixins/placeRandomObstacle';

export const placeInitialObstacles = () => {
  var numberObstacles = Math.ceil(
    _.random(5, 7) * (getGameWidth() / 800) * (getGameHeight() / 500)
  );

  var minX = -50;
  var maxX = getGameWidth() + 50;
  var minY = getGameHeight() / 2 + -1000;
  var maxY = getGameHeight() + 50;

  for (var i = 0; i < numberObstacles; i++) {
    placeRandomObstacle(minX, maxX, minY, maxY);
  }

  let obstacles = getObstacles();
  let loadedAssets = getLoadedAssets();
  let newObstacles = _.sortBy(obstacles, function(obstacle) {
    var obstacleImage = loadedAssets[obstacle.type];
    return obstacle.y + obstacleImage.height;
  });
  store.dispatch('newObstacles', newObstacles);
};
