import { getSkier } from '../../mixins/index';

export const getSkierAsset = () => {
  let skier = getSkier();
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

export default {
  getSkierAsset,
};
