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
import { uploadGalleryImage } from '@/api/profile/profile';

function InputPhoto() {
  const toast = useToast();
  const { user } = useRootStore();
  const { auth, selectProfileId, loadSelectedProfile } = user;
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
    const res: any = await uploadGalleryImage(images, selectProfileId, auth);
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
                  {/* image upload area */}

                  {/* image all remove */}
                  {/* <Box>
                  <Button
                    mt="5px"
                    ml="12px"
                    colorScheme="red"
                    size="xs"
                    onClick={onImageRemoveAll}
                  >
                    Remove all images
                  </Button>
                </Box> */}
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

      {/* footer box */}
      <Box my="40px" ml={['50px', '60px', '60px', '100px']}>
        <Grid
          templateColumns={[
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            'repeat(4, 1fr)',
            'repeat(4, 1fr)',
          ]}
          flexDirection={['column', 'column', 'row', 'row']}
        >
          <Box w="80px" h="120px">
            <Center>
              <Icon as={AiOutlineCheckCircle} color="green.500" w="5" h="5" />
            </Center>
            <Image
              w="80px"
              h="80px"
              src="https://pbs.twimg.com/profile_images/770394499/female_400x400.png"
              border="1px solid black"
              alt=""
            />
            <Text fontSize="10px" align="center">
              Close Up
            </Text>
          </Box>

          <Box w="80px" h="120px">
            <Center>
              <Icon as={AiOutlineCheckCircle} color="green.500" w="5" h="5" />
            </Center>
            <Image
              w="80px"
              h="80px"
              src="https://previews.123rf.com/images/jemastock/jemastock1710/jemastock171013529/88543741-woman-full-body-avatar-icon-image-vector-illustration-design.jpg"
              border="1px solid black"
              alt=""
            />
            <Text fontSize="10px" align="center">
              Close Up
            </Text>
          </Box>

          <Box w="80px" h="120px">
            <Center>
              <Icon as={AiOutlineCloseCircle} color="red.500" w="5" h="5" />
            </Center>
            <Image
              w="80px"
              h="80px"
              src="https://i.pinimg.com/originals/6d/3f/ba/6d3fba914cf7aa53f7a9d4a159ea2016.jpg"
              border="1px solid black"
              alt=""
            />
            <Text fontSize="10px" align="center">
              Blur
            </Text>
          </Box>

          <Box w="80px" h="120px">
            <Center>
              <Icon as={AiOutlineCloseCircle} color="red.500" w="5" h="5" />
            </Center>
            <Image
              w="80px"
              h="80px"
              src="https://image.freepik.com/free-vector/group-business-men-women-suits-office-style-cloth-professional-multi-ethnic-group-businesspeople-cartoon-characters-isolated_255343-129.jpg"
              border="1px solid black"
              alt=""
            />
            <Text fontSize="10px" align="center">
              Group
            </Text>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}

export default InputPhoto;
