import { loop } from '@/game/loop';
import { setupKeyhandler } from '@/game/boot/setupKeyHandler';
import { placeInitialObstacles } from '@/game/boot/placeInitialObstacles';
import { loadAssets } from '@/game/boot/loadAssets';
import { setCanvas } from '@/game/boot/setCanvas';

const game = loop => {
  requestAnimationFrame(loop);
};

const boot = () => {
  setupKeyhandler();
  loadAssets().then(function() {
    placeInitialObstacles();
  });
  setCanvas();
  game(loop);
};

export default {
  boot,
};
