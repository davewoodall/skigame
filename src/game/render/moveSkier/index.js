import store from '@/store';
import { placeNewObstacle } from '@/game/mixins/placeNewObstacle';
import { getSkier } from '@/game/mixins';

export const moveSkier = () => {
  let skier = getSkier();
  let skierDirection = skier.direction;
  let skierMapX = skier.mapX;
  let skierMapY = skier.mapY;
  let skierSpeed = skier.speed;
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
