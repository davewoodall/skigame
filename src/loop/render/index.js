import _ from 'lodash';
import store from '@/store';
import input from '@/loop/input';
import process from '@/loop/process';
import constants from '@/constants';
import {
  getSkier,
  getObstacles,
  getGameWidth,
  getGameHeight,
  getSkierMapX,
  getSkierMapY,
  getCtx,
} from '@/mixins';
import { clearCanvas } from '@/ui/window';

const placeRandomObstacle = (minX, maxX, minY, maxY) => {
  let obstacleTypes = constants.obstacleTypes;
  var obstacleIndex = _.random(0, obstacleTypes.length - 1);

  var position = process.calculateOpenPosition(minX, maxX, minY, maxY);

  let data = {
    type: obstacleTypes[obstacleIndex],
    x: position.x,
    y: position.y,
  };
  store.dispatch('pushObstalce', data);
};

const placeNewObstacle = direction => {
  var shouldPlaceObstacle = _.random(1, 8);
  if (shouldPlaceObstacle !== 8) {
    return;
  }

  var leftEdge = getSkierMapX();
  var rightEdge = getSkierMapX() + store.getters['game'].width;
  var topEdge = getSkierMapY();
  var bottomEdge = getSkierMapY() + store.getters['game'].height;

  switch (direction) {
    case 1: // left
      placeRandomObstacle(leftEdge - 50, leftEdge, topEdge, bottomEdge);
      break;
    case 2: // left down
      placeRandomObstacle(leftEdge - 50, leftEdge, topEdge, bottomEdge);
      placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
      break;
    case 3: // down
      placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
      break;
    case 4: // right down
      placeRandomObstacle(rightEdge, rightEdge + 50, topEdge, bottomEdge);
      placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
      break;
    case 5: // right
      placeRandomObstacle(rightEdge, rightEdge + 50, topEdge, bottomEdge);
      break;
    case 6: // up
      placeRandomObstacle(leftEdge, rightEdge, topEdge - 50, topEdge);
      break;
  }
};

const placeInitialObstacles = () => {
  var numberObstacles = Math.ceil(
    _.random(5, 7) * (getGameWidth() / 800) * (getGameHeight() / 500)
  );

  var minX = -50;
  var maxX = getGameWidth() + 50;
  var minY = getGameHeight() / 2 + 100;
  var maxY = getGameHeight() + 50;

  for (var i = 0; i < numberObstacles; i++) {
    placeRandomObstacle(minX, maxX, minY, maxY);
  }

  let obstacles = getObstacles();
  let loadedAssets = store.getters['loadedAssets'];
  let newObstacles = _.sortBy(obstacles, function(obstacle) {
    var obstacleImage = loadedAssets[obstacle.type];
    return obstacle.y + obstacleImage.height;
  });
  store.dispatch('newObstacles', newObstacles);
};

const drawSkier = () => {
  let ctx = store.getters['ctx'];
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

  var x = (gameWidth - skierImage.width) / 2;
  var y = (gameHeight - skierImage.height) / 2;
  ctx.drawImage(skierImage, x, y, skierImage.width, skierImage.height);
};

const drawObstacles = () => {
  let skier = getSkier();
  let ctx = store.getters['ctx'];
  let skierMapX = skier.mapX;
  let skierMapY = skier.mapY;
  let gameWidth = store.getters['game'].width;
  let gameHeight = store.getters['game'].height;
  let newObstacles = [];
  let obstacles = getObstacles();
  let loadedAssets = store.getters['loadedAssets'];
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

const moveSkier = () => {
  let skier = getSkier();
  let skierDirection = skier.direction;
  let skierMapX = skier.mapX;
  let skierMapY = skier.mapY;
  let skierSpeed = skier.speed;
  let dataX;
  let dataY;
  switch (skierDirection) {
    case 2:
      skierMapX = skierMapX - Math.round(skierSpeed / 1.4142);
      store.dispatch('skierMapX', skierMapX);

      skierMapY = skierMapY + Math.round(skierSpeed / 1.4142);
      store.dispatch('skierMapY', skierMapY);

      placeNewObstacle(skierDirection);
      break;
    case 3:
      skierMapY = skierMapY + skierSpeed;
      store.dispatch('skierMapY', skierMapY);

      placeNewObstacle(skierDirection);
      break;
    case 4:
      skierMapX = skierMapX + skierSpeed / 1.4142;
      store.dispatch('skierMapX', skierMapX);

      skierMapY = skierMapY + skierSpeed / 1.4142;
      store.dispatch('skierMapY', skierMapY);

      placeNewObstacle(skierDirection);
      break;
  }
};

const supportRetina = ctx => {
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
};

const render = () => {
  const ctx = getCtx();
  ctx.save();
  supportRetina(ctx);
  clearCanvas();
  moveSkier();
  process.checkIfSkierHitObstacle();
  drawSkier();
  drawObstacles();
  ctx.restore();
};

export default {
  placeInitialObstacles,
  placeNewObstacle,
  drawSkier,
  drawObstacles,
  render,
};
