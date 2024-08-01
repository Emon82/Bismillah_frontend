import { useRootStore } from '@/models/root-store-provider';
import { Box, Button, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactAvatarEditor from 'react-avatar-editor';
// import { getProfile } from '@/api/profile/getProfile';
import {
  uploadVendorSliderPhoto,
  getVendorProfileInfo,
} from '@/api/vendor/vendor';

const UploadAvatarCom = (props: any) => {
  const toast = useToast();
  const { vendor } = useRootStore();
  const { auth, details } = vendor;

  const [img, setImg] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const [scale, setScale] = useState<any>('1');
  const [preview, setPreview] = useState(null);

  const fetchData = async () => {
    const result: any = await getVendorProfileInfo(vendor.auth);
    if (result.code === 200) {
      vendor.addVendorProfile(result.details);
    }
  };

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
    const res: any = await uploadVendorSliderPhoto(convertBlob, auth);
    if (res.code === 201) {
      setLoadingButton(false);
      props.onCloseFun();
      fetchData();
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
            width={180}
            height={100}
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
