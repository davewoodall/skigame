export const hotfix = skierImage => {
  if (skierImage === undefined) {
    let w = 27;
    let h = 23;
    let image = '/assets/skier_left.png';
    let skimage = new Image(w, h);
    skimage.src = image;
    skierImage = skimage;
  }
  return skierImage;
};
