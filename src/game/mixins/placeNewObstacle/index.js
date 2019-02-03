import _ from 'lodash';
import store from '@/store';
import { placeRandomObstacle } from '@/game/mixins/placeRandomObstacle';
import { getSkierMapX, getSkierMapY } from '@/game/mixins';

export const placeNewObstacle = direction => {
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
