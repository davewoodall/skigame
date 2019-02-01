import $ from 'jquery';
import _ from 'lodash';
import store from './store';
import config from './config';

const skierDirection = () => {
  return store.getters['skier'].direction;
};
const skierMapX = () => {
  return store.getters['skier'].mapX;
};
const skierMapY = () => {
  return store.getters['skier'].mapY;
};
const skierSpeed = () => {
  return store.getters['skier'].speed;
};

const gameWidth = () => {
  return store.getters['game'].width;
};

const gameHeight = () => {
  return store.getters['game'].height;
};

const getWindowInnerHeight = () => {
  return window.innerHeight;
};

const windowDevicePixelRatio = () => {
  return window.devicePixelRatio;
};

const getWindowInnerWidth = () => {
  return window.innerWidth;
};

const setCanvas = () => {
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
  $('body').append(canvas);

  let ctx = canvas[0].getContext('2d');
  store.dispatch('ctx', ctx);
};

const clearCanvas = () => {
  let ctx = store.getters['ctx'];
  ctx.clearRect(0, 0, gameWidth(), gameHeight());
};

const calculateOpenPosition = (minX, maxX, minY, maxY) => {
  let obstacles = store.getters['obstacles'];
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

const placeRandomObstacle = (minX, maxX, minY, maxY) => {
  placeRandomObstacleGuts(minX, maxX, minY, maxY);
};

const placeRandomObstacleGuts = (minX, maxX, minY, maxY) => {
  let obstacleTypes = config.obstacleTypes;
  var obstacleIndex = _.random(0, obstacleTypes.length - 1);

  var position = calculateOpenPosition(minX, maxX, minY, maxY);

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
  var leftEdge = store.getters['skier'].mapX;
  var rightEdge = store.getters['skier'].mapX + store.getters['game'].width;
  var topEdge = store.getters['skier'].mapY;
  var bottomEdge = store.getters['skier'].mapY + store.getters['game'].height;

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

const moveSkier = () => {
  let skier = store.getters['skier'];
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

const placeInitialObstacles = () => {
  var numberObstacles = Math.ceil(
    _.random(5, 7) * (gameWidth / 800) * (gameHeight / 500)
  );

  var minX = -50;
  var maxX = gameWidth + 50;
  var minY = gameHeight / 2 + 100;
  var maxY = gameHeight + 50;

  for (var i = 0; i < numberObstacles; i++) {
    placeRandomObstacle(minX, maxX, minY, maxY);
  }

  let obstacles = store.getters['obstacles'];
  let loadedAssets = store.getters['loadedAssets'];
  let newObstacles = _.sortBy(obstacles, function(obstacle) {
    var obstacleImage = loadedAssets[obstacle.type];
    return obstacle.y + obstacleImage.height;
  });
  store.dispatch('newObstacles', newObstacles);
};

const loadAssets = () => {
  var assetPromises = [];
  let loadedAssets = store.getters['loadedAssets'];

  _.each(config.assets, function(asset, assetName) {
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

const intersectRect = (r1, r2) => {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
};

const drawSkier = () => {
  let ctx = store.getters['ctx'];
  let gameWidth = store.getters['game'].width;
  let gameHeight = store.getters['game'].height;
  let loadedAssets = store.getters['loadedAssets'];
  var skierAssetName = getSkierAsset();
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

const getSkierAsset = () => {
  let skier = store.getters['skier'];
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

const drawObstacles = () => {
  let skier = store.getters['skier'];
  let ctx = store.getters['ctx'];
  let skierMapX = skier.mapX;
  let skierMapY = skier.mapY;
  let gameWidth = store.getters['game'].width;
  let gameHeight = store.getters['game'].height;
  let newObstacles = [];
  let obstacles = store.getters['obstacles'];
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

const checkIfSkierHitObstacle = () => {
  let skier = store.getters['skier'];
  let skierDirection = skier.direction;
  let skierMapX = skier.mapX;
  let skierMapY = skier.mapY;
  let gameWidth = store.getters['game'].width;
  let gameHeight = store.getters['game'].height;
  let loadedAssets = store.getters['loadedAssets'];
  var skierAssetName = getSkierAsset();

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

  let obstacles = store.getters['obstacles'];
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

const setupKeyhandler = () => {
  $(window).keydown(function(event) {
    let skier = store.getters['skier'];
    let skierDirection = skier.direction;
    let skierMapX = skier.mapX;
    let skierMapY = skier.mapY;
    let skierSpeed = skier.speed;

    switch (event.which) {
      case 37: // left
        if (skierDirection === 1) {
          skierMapX = skierMapX - skierSpeed;
          store.dispatch('skierMapX', skierMapX);
          placeNewObstacle(skierDirection);
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
          placeNewObstacle(skierDirection);
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
          placeNewObstacle(6);
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

var initGame = function(gameLoop) {
  setupKeyhandler();
  loadAssets().then(function() {
    placeInitialObstacles();
    requestAnimationFrame(gameLoop);
  });
};

const render = () => {
  let ctx = store.getters['ctx'];
  let score = store.getters['time'];
  let update = (score += 1);
  store.dispatch('tick', update);
  ctx.save();

  // Retina support
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  clearCanvas();
  moveSkier();
  checkIfSkierHitObstacle();
  drawSkier();
  drawObstacles();
  ctx.restore();
};

export default {
  skierDirection,
  skierMapX,
  skierMapY,
  skierSpeed,
  gameWidth,
  gameHeight,
  getWindowInnerHeight,
  windowDevicePixelRatio,
  getWindowInnerWidth,
  setCanvas,
  clearCanvas,
  calculateOpenPosition,
  placeRandomObstacleGuts,
  placeNewObstacle,
  placeInitialObstacles,
  moveSkier,
  loadAssets,
  intersectRect,
  drawSkier,
  getSkierAsset,
  drawObstacles,
  checkIfSkierHitObstacle,
  setupKeyhandler,
  initGame,
  render,
};
