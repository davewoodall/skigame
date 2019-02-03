import { getSkierAsset } from '@/game/mixins/getSkierAsset';
import {
  getGameWidth,
  getGameHeight,
  getCtx,
  getLoadedAssets,
} from '@/game/mixins';
import { hotfix } from '@/game/mixins/hotfix';

export const drawSkier = () => {
  let ctx = getCtx();
  let gameWidth = getGameWidth();
  let gameHeight = getGameHeight();
  let loadedAssets = getLoadedAssets();
  var skierAssetName = getSkierAsset();
  var skierImage = loadedAssets[skierAssetName];
  skierImage = hotfix(skierImage);
  var x = (gameWidth - skierImage.width) / 2;
  var y = (gameHeight - skierImage.height) / 2;
  ctx.drawImage(skierImage, x, y, skierImage.width, skierImage.height);
};
