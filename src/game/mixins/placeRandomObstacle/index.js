import _ from 'lodash';
import { calculateOpenPosition } from '@/game/mixins/calculateOpenPosition';
import constants from '@/game/constants';
import store from '@/store';

export const placeRandomObstacle = (minX, maxX, minY, maxY) => {
  let obstacleTypes = constants.obstacleTypes;
  var obstacleIndex = _.random(0, obstacleTypes.length - 1);

  var position = calculateOpenPosition(minX, maxX, minY, maxY);

  let data = {
    type: obstacleTypes[obstacleIndex],
    x: position.x,
    y: position.y,
  };
  store.dispatch('pushObstalce', data);
};
