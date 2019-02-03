import store from '@/store';
import _ from 'lodash';

import {
  getSkier,
  getGameWidth,
  getObstacles,
  getGameHeight,
  getCtx,
  getLoadedAssets,
} from '@/game/mixins';

export const drawObstacles = () => {
  let skier = getSkier();
  let ctx = getCtx();
  let skierMapX = skier.mapX;
  let skierMapY = skier.mapY;
  let gameWidth = getGameWidth();
  let gameHeight = getGameHeight();
  let newObstacles = [];
  let obstacles = getObstacles();
  let loadedAssets = getLoadedAssets();
  _.each(obstacles, function(obstacle) {
    let obstacleImage = loadedAssets[obstacle.type];
    let x = obstacle.x - skierMapX - obstacleImage.width / 2;
    let y = obstacle.y - skierMapY - obstacleImage.height / 2;

    if (x < -100 || x > gameWidth + 50 || y < -100 || y > gameHeight + 50) {
      return;
    }

    ctx.drawImage(
      obstacleImage,
      x,
      y,
      obstacleImage.width,
      obstacleImage.height
    );

    newObstacles.push(obstacle);
  });
  store.dispatch('newObstacles', newObstacles);
};
