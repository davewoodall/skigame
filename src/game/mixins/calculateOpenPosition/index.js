import _ from 'lodash';
import { getObstacles } from '@/game/mixins';

export const calculateOpenPosition = (minX, maxX, minY, maxY) => {
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
