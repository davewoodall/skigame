import { getCtx } from '@/game/mixins';
import { supportRetina } from '@/game/render/supportRetina';
import { clearCanvas } from '@/game/render/clearCanvas';
import { moveSkier } from '@/game/render/moveSkier';
import { keepScore } from '@/game/render/score';
import { checkIfSkierHitObstacle } from '@/game/render/checkIfSkierHitObstacle';
import { drawSkier } from '@/game/render/drawSkier';
import { drawObstacles } from '@/game/render/drawObstacles';

const render = () => {
  const ctx = getCtx();
  ctx.save();
  supportRetina(ctx);
  clearCanvas();
  moveSkier();
  keepScore();
  checkIfSkierHitObstacle();
  drawSkier();
  drawObstacles();
  ctx.restore();
};

export default {
  render,
};
