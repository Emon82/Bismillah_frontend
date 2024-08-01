import React from 'react';
import {
  Box,
  Image,
  Text,
  Grid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import ConvertAvatarUrl from '@/utils/convertAvatarUrl';

const GalleryView = (props: any) => {
  const { galleryImage } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const convertArray = galleryImage.map((item: any) => ({
    original: ConvertAvatarUrl(item),
  }));

  return (
    <div>
      {!galleryImage.length ? (
        <Box textAlign="center" minH="300px" lineHeight="auto">
          <Text fontSize={['14px', '15px', '18px', '20px']}>
            There are no photo
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
            {galleryImage.map((item: any, index: number) => (
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
        </>
      )}
    </div>
  );
};

export default GalleryView;
