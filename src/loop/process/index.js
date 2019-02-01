import _ from 'lodash';
import store from '@/store';
import { getSkier, getObstacles } from '@/mixins';
import input from '@/loop/input';

const intersectRect = (r1, r2) => {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
};

const calculateOpenPosition = (minX, maxX, minY, maxY) => {
  let obstacles = getObstacles();
  var x = _.random(minX, maxX);
  var y = _.random(minY, maxY);
  var foundCollision = _.find(obstacles, function(obstacle) {
    return (
      x > obstacle.x - 50 &&
      x < obstacle.x + 50 &&
      y > obstacle.y - 50 &&
      y < obstacle.y + 50
    );
  });

  if (foundCollision) {
    return calculateOpenPosition(minX, maxX, minY, maxY);
  } else {
    return {
      x: x,
      y: y,
    };
  }
};

const checkIfSkierHitObstacle = () => {
  let skier = getSkier();
  let skierDirection = skier.direction;
  let skierMapX = skier.mapX;
  let skierMapY = skier.mapY;
  let gameWidth = store.getters['game'].width;
  let gameHeight = store.getters['game'].height;
  let loadedAssets = store.getters['loadedAssets'];
  var skierAssetName = input.getSkierAsset();

  var skierImage = loadedAssets[skierAssetName];

  // Hot Fix - issue with Left Turn Collsion Bug
  if (skierImage === undefined) {
    let w = 27;
    let h = 23;
    let image = '/assets/skier_left.png';
    let skimage = new Image(w, h);
    skimage.src = image;
    skierImage = skimage;
  }

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
    store.dispatch('skierDirection', 0);
  }
};

export default {
  calculateOpenPosition,
  checkIfSkierHitObstacle,
};
