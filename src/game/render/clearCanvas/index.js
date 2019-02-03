import { getCtx, getGameWidth, getGameHeight } from '@/game/mixins';

export const clearCanvas = () => {
  let ctx = getCtx();
  ctx.clearRect(0, 0, getGameWidth(), getGameHeight());
};
