// import { useRootStore } from '@/models/root-store-provider';
// import { Button, Center, Box, useToast } from '@chakra-ui/react';
// import React, { useState, useCallback, useRef, useEffect } from 'react';
// import ReactCrop from 'react-image-crop';
// import { uploadAvatar } from '../../../../api/profile/avatar';
// import 'react-image-crop/dist/ReactCrop.css';

// const UploadAvatarCom = () => {
//   const toast = useToast();

//   const { user, selectProfileId } = useRootStore();

//   const [upImg, setUpImg] = useState<any>();
//   const imgRef = useRef(null);
//   const previewCanvasRef = useRef(null);
//   const [crop, setCrop] = useState<any>({
//     unit: '%',
//     width: 30,
//     aspect: 16 / 16,
//   });
//   const [completedCrop, setCompletedCrop] = useState<any>(null);

//   const onSelectFile = (e: any) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader: any = new FileReader();
//       reader.addEventListener('load', () => setUpImg(reader.result));
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const onLoad = useCallback((img) => {
//     imgRef.current = img;
//   }, []);

//   useEffect(() => {
//     if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
//       return;
//     }

//     const image: any = imgRef.current;
//     const canvas: any = previewCanvasRef.current;
//     const c: any = completedCrop;

//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     const ctx = canvas.getContext('2d');
//     const pixelRatio = window.devicePixelRatio;

//     canvas.width = c.width * pixelRatio;
//     canvas.height = c.height * pixelRatio;

//     ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
//     ctx.imageSmoothingQuality = 'high';

//     ctx.drawImage(
//       image,
//       c.x * scaleX,
//       c.y * scaleY,
//       c.width * scaleX,
//       c.height * scaleY,
//       0,
//       0,
//       c.width,
//       c.height,
//     );
//   }, [completedCrop]);

//   const avatarUploadHandler = async (canvas: any, c : any) => {
//     if (!c || !previewCanvasRef.current) {
//       return;
//     }

//     //  const blobData = previewCanvasRef.current.toBlob(
//     //     (blob: any) => {
//     //       img = blob

//     //     },
//     //     'image/png',
//     //     1,
//     //   );

//     const dataUrl = canvas.toDataURL();

//         const arr = dataUrl.split(',');

//         const mime = arr[0].match(/:(.*?);/)[1];

//         const bstr = atob(arr[1]);
//         let n = bstr.length;
//         const u8arr = new Uint8Array(n);
//         // eslint-disable-next-line no-plusplus
//         while(n--){
//         u8arr[n] = bstr.charCodeAt(n);
//     }
//         const convertBlob = new Blob([u8arr], {type:mime});
//         // console.log(dataUrl)
//         console.log(convertBlob)

//     try {
//       const res: any = await uploadAvatar(convertBlob, selectProfileId, user.auth);
//       toast({
//         title: 'Success',
//         description: res.message,
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//         position: 'top-right',
//       });
//     } catch (error) {
//       toast({
//         title: 'Send failed',
//         description: error.message,
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//         position: 'top-right',
//       });
//     }
//   };

//   return (
//     <div className="App">
//       <div>
//         <input type="file" accept="image/*" onChange={onSelectFile} />
//       </div>
//       <ReactCrop
//         src={upImg}
//         onImageLoaded={onLoad}
//         crop={crop}
//         onChange={(c) => setCrop(c)}
//         onComplete={(c) => setCompletedCrop(c)}
//       />
//       <Box>
//         <Center>
//           <canvas
//             ref={previewCanvasRef}
//             // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
//             style={{
//               width: Math.round(completedCrop?.width ?? 0),
//               height: Math.round(completedCrop?.height ?? 0),
//             }}
//           />
//         </Center>
//       </Box>
//       <Center>
//         <Button
//           m="3"
//           colorScheme="blue"
//           type="button"
//           size="sm"
//           disabled={!completedCrop?.width || !completedCrop?.height}
//           onClick={() => avatarUploadHandler(previewCanvasRef.current, completedCrop)}

//           //  console.log(previewCanvasRef.current, completedCrop)
//           //   generateDownload(previewCanvasRef.current, completedCrop)
//         >
//           Upload Picture
//         </Button>
//       </Center>
//     </div>
//   );
// };

// export default UploadAvatarCom;

/// alternative solution

import { useRootStore } from '@/models/root-store-provider';
import { Box, Button, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactAvatarEditor from 'react-avatar-editor';
// import { getProfile } from '@/api/profile/getProfile';
import { uploadAvatar } from '@/api/profile/avatar';

const UploadAvatarCom = () => {
  const toast = useToast();
  const { user } = useRootStore();
  const { auth, selectProfileId, loadSelectedProfile } = user;

  // const fetchData = async () => {
  //   const result: any = await getProfile(auth);
  //   if (result.code ===) {
  //     addProfile(result);
  //   }
  // };

  const [img, setImg] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const [scale, setScale] = useState<any>('1');
  const [preview, setPreview] = useState(null);

  const handleNewImage = (e: any) => {
    setImg(e.target.files[0]);
  };
  let editor: any;

  const handleSave = async () => {
    setLoadingButton(true);
    const dataUrl = editor.getImage().toDataURL();
    setPreview(dataUrl);

    const arr = dataUrl.split(',');

    const mime = arr[0].match(/:(.*?);/)[1];

    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const convertBlob = new Blob([u8arr], { type: mime });
    const res: any = await uploadAvatar(convertBlob, selectProfileId, auth);
    if (res.code === 201) {
      loadSelectedProfile(selectProfileId);
      setLoadingButton(false);
      return toast({
        title: 'Success',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    return toast({
      title: 'Send failed',
      description: res.message,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const handleScale = (e: any) => {
    const s = parseFloat(e.target.value);
    setScale(s);
  };
  const setEditorRef = (e: any) => {
    if (e) {
      editor = e;
    }
  };
  return (
    <div>
      <Box>
        <Box pl={['50px', '50px', '50px', '100px']}>
          <ReactAvatarEditor
            ref={setEditorRef}
            scale={parseFloat(scale)}
            width={150}
            height={150}
            rotate={0}
            border={25}
            image={img}
            className="editor-canvas"
          />
        </Box>
        <br />
        <Box textAlign="center">
          New File:
          <input name="newImage" type="file" onChange={handleNewImage} />
          <br />
          Zoom:
          <input
            name="scale"
            type="range"
            onChange={handleScale}
            min="0.1"
            max="2"
            step="0.01"
            defaultValue="1"
          />
          <br />
          <br />
          {loadingButton ? (
            <Button
              isLoading
              loadingText="Submitting"
              colorScheme="teal"
              variant="outline"
            >
              Submit
            </Button>
          ) : (
            <Button onClick={handleSave} colorScheme="teal" variant="outline">
              Upload
            </Button>
          )}
        </Box>
        {/* <input type="button" value="Submit" /> */}
      </Box>
    </div>
  );
};

export default UploadAvatarCom;
