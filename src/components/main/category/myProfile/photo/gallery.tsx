import React, { useState } from 'react';
import { useRootStore } from '@/models/root-store-provider';
import {
  Box,
  Center,
  Image,
  Text,
  Grid,
  Button,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
} from '@chakra-ui/react';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import ConvertAvatarUrl from '@/utils/convertAvatarUrl';
import { deleteGalleryImage } from '@/api/profile/profile';

const Gallery = (props: any) => {
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const { user } = useRootStore();
  const toast = useToast();
  const { auth, selectProfileId } = user;
  const { galleryImage } = props;
  const images = galleryImage || [];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imgId, setDeleteId] = useState<any>(null);
  const convertArray = images.map((item: any) => ({
    original: ConvertAvatarUrl(item),
  }));
  const [alertDialog, setAlertDialog] = React.useState(false);
  const openAlertDialog = (id: string) => {
    setAlertDialog(true);
    setDeleteId(id);
  };

  const closeAlertDialog = () => setAlertDialog(false);

  const deleteHandler = () => {
    props.deleteImageHandle(imgId);
    closeAlertDialog();
  };
  return (
    <div>
      {!images.length ? (
        <Box textAlign="center" h="450px" lineHeight="420px">
          <Text fontSize={['14px', '15px', '18px', '20px']}>
            Get more responses by uploading up to 25 photos on your profile.
          </Text>
        </Box>
      ) : (
        <>
          <Grid
            templateColumns={[
              'repeat(1, 1fr)',
              'repeat(2, 1fr)',
              'repeat(4, 1fr)',
              'repeat(4, 1fr)',
            ]}
            flexDirection={['column', 'column', 'row', 'row']}
            minH="450px"
          >
            {images &&
              images.map((item: any, index: number) => (
                <Box
                  m="2"
                  w="200px"
                  h="200px"
                  boxSizing="border-box"
                  _hover={{
                    boxShadow: 'dark-lg',
                  }}
                >
                  <Image
                    onClick={onOpen}
                    w="100%"
                    h="200px"
                    src={ConvertAvatarUrl(item) || ''}
                    border="1px solid black"
                    alt=""
                  />
                  <Center>
                    <Button
                      p="15px"
                      colorScheme="red"
                      size="sm"
                      m="1"
                      textAlign="center"
                      onClick={() => openAlertDialog(item.id)}
                    >
                      Remove
                    </Button>
                  </Center>
                </Box>
              ))}
          </Grid>
          <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <ImageGallery items={convertArray} showThumbnails={false} />
              </ModalBody>
            </ModalContent>
          </Modal>

          <AlertDialog
            isOpen={alertDialog}
            leastDestructiveRef={cancelRef}
            onClose={closeAlertDialog}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Photo
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can not undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={() => closeAlertDialog()}>Cancel</Button>
                  <Button
                    colorScheme="red"
                    onClick={() => deleteHandler()}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      )}
    </div>
  );
};

export default Gallery;
