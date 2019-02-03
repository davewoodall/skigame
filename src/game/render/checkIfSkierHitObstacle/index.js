import _ from 'lodash';
import store from '@/store';
import { getSkier, getObstacles } from '@/game/mixins';
import { getSkierAsset } from '@/game/mixins/getSkierAsset';
import { manageScore } from '@/game/render/score';
import { hotfix } from '@/game/mixins/hotfix';

const intersectRect = (r1, r2) => {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
};

export const checkIfSkierHitObstacle = () => {
  let skier = getSkier();
  let skierMapX = skier.mapX;
  let skierMapY = skier.mapY;
  let gameWidth = store.getters['game'].width;
  let gameHeight = store.getters['game'].height;
  let loadedAssets = store.getters['loadedAssets'];
  var skierAssetName = getSkierAsset();

  var skierImage = loadedAssets[skierAssetName];
  skierImage = hotfix(skierImage);

  var skierRect = {
    left: skierMapX + gameWidth / 2,
    right: skierMapX + skierImage.width + gameWidth / 2,
    top: skierMapY + skierImage.height - 5 + gameHeight / 2,
    bottom: skierMapY + skierImage.height + gameHeight / 2,
  };

  let obstacles = getObstacles();
  var obstacleRect;
  var collision = _.find(obstacles, function(obstacle) {
    var obstacleImage = loadedAssets[obstacle.type];
    obstacleRect = {
      left: obstacle.x,
      right: obstacle.x + obstacleImage.width,
      top: obstacle.y + obstacleImage.height - 5,
      bottom: obstacle.y + obstacleImage.height,
    };
    return intersectRect(skierRect, obstacleRect);
  });
  if (collision) {
    manageScore();
    store.dispatch('skierDirection', 0);
  }
};
