import React from 'react';
import { useRootStore } from '@/models/root-store-provider';
import {
  Box,
  Center,
  Image,
  Text,
  Grid,
  Button,
  Icon,
  Flex,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { uploadGalleryImageVendor } from '@/api/vendor/vendor';

function InputPhoto() {
  const toast = useToast();
  const { vendor } = useRootStore();
  const { auth, details } = vendor;
  const [loadingButton, setLoadingButton] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined,
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  const handleUpload = async () => {
    setLoadingButton(true);
    if (!images.length) {
      setLoadingButton(false);
      return toast({
        title: 'Failed',
        description: 'Please Select Image',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    const res: any = await uploadGalleryImageVendor(images, details?.id, auth);
    if (res.code === 201) {
      setLoadingButton(false);
      setImages([]);
      return toast({
        title: 'Success',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    setLoadingButton(false);
    return toast({
      title: 'Send failed',
      description: res.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };
  return (
    <Grid>
      {/* header */}
      <Box h="20">
        <Center>
          <Text fontSize={['14px', '15px', '18px', '20px']}>
            Get more responses by uploading up to 25 photos on your profile.
          </Text>
        </Center>
      </Box>

      {/* image box */}
      <Box>
        <Center>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <Box>
                <Center>
                  <Grid
                    templateColumns={[
                      'repeat(1, 1fr)',
                      'repeat(2, 1fr)',
                      'repeat(5, 1fr)',
                      'repeat(5, 1fr)',
                    ]}
                    gap={4}
                    flexDirection={['column', 'column', 'row', 'row']}
                  >
                    <Box
                      h={['0px', '0px', '150px', '150px']}
                      w={['0px', '0px', '150px', '150px']}
                    />
                    <Box
                      h={['0px', '0px', '150px', '150px']}
                      w={['0px', '0px', '150px', '150px']}
                    />

                    <Box
                      border="1px solid black"
                      h="150px"
                      w="150px"
                      style={isDragging ? { color: 'red' } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      <Text align="center" pt="50px">
                        Click or Drop here
                      </Text>
                    </Box>
                    <Box
                      h={['0px', '0px', '150px', '150px']}
                      w={['0px', '0px', '150px', '150px']}
                    />
                    <Box
                      h={['0px', '0px', '150px', '150px']}
                      w={['0px', '0px', '150px', '150px']}
                    />

                    {imageList.map((image, index) => (
                      <Box border="1px solid black" h="150px" w="150px">
                        <Box>
                          <Image
                            src={image.dataURL}
                            h="150px"
                            w="150px"
                            alt=""
                          />
                        </Box>
                        <Box mt="-5" pl="2">
                          <Center>
                            <Button
                              colorScheme="red"
                              size="xs"
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </Button>
                          </Center>
                        </Box>
                      </Box>
                    ))}
                  </Grid>
                </Center>
              </Box>
            )}
          </ImageUploading>
        </Center>
      </Box>

      <Box m="5" textAlign="center">
        {loadingButton ? (
          <Button
            size="md"
            isLoading
            loadingText="Submitting"
            colorScheme="teal"
            variant="outline"
          >
            Submit Image
          </Button>
        ) : (
          <Button
            size="md"
            onClick={() => handleUpload()}
            colorScheme="teal"
            variant="outline"
          >
            Submit Image
          </Button>
        )}
      </Box>
    </Grid>
  );
}

export default InputPhoto;
