/* eslint-disable @typescript-eslint/no-unused-vars */
const checkValidImageFormatAndSize = async (file: any) => {
  if (file === undefined) {
    return;
  }
  if (!file.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|)$/)) {
    // eslint-disable-next-line consistent-return
    return 'Invalid file format ! Please upload .Jpg, .Png format file';
  }

  // eslint-disable-next-line prefer-const
  let _URL = window.URL || window.webkitURL;
  // eslint-disable-next-line prefer-const
  let img = new Image();
  // eslint-disable-next-line prefer-const
  let imageUrl = _URL.createObjectURL(file);
  try {
    // eslint-disable-next-line prefer-const
    let image: any = await addImageProcess(imageUrl);

    // eslint-disable-next-line consistent-return
    return { height: image.height, width: image.width };
  } catch (e) {
    console.log(e);
  }
};

function addImageProcess(src: any): Promise<any> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line prefer-const
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
export default checkValidImageFormatAndSize;
