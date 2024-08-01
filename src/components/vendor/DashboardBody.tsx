import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/models/root-store-provider';
import {
  Box,
  HStack,
  Center,
  Image,
  Text,
  Grid,
  GridItem,
  Heading,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Icon,
  Link,
  Spacer,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { csBackground, golden } from '@/themes/custom.color';
import { publicVendorGallery, getVendorProfileInfo } from '@/api/vendor/vendor';
import ConvertAvatarUrl from '@/utils/convertAvatarUrl';
import { BiBox } from 'react-icons/bi';
import InputSliderImage from './inputVendorPicture';

const DashboardBody = observer(() => {
  const { vendor } = useRootStore();
  const data = vendor.profile;
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Grid>
      <GridItem colSpan={4} bg="gray.50" px="30px" borderRadius={10}>
        <Box w="130px" h="120px" my="30px">
          <Image
            maxW="100px"
            maxH="100px"
            objectFit="contain"
            src={ConvertAvatarUrl(data?.image) || ''}
            alt={data?.companyName || ''}
          />

          <Box
            size="xs"
            color={golden}
            mt="1"
            cursor="pointer"
            onClick={onOpen}
          >
            Add/ Edit Slider Picture
          </Box>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Upload Slider Picture</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <InputSliderImage onCloseFun={onClose} />
              </ModalBody>

              <ModalFooter>
                <Center>
                  <Button size="sm" colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </Center>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>

        <Heading as="h5" size="lg" fontFamily="initial" mb="5px">
          Business Details
        </Heading>

        <Text textAlign="justify">{data?.description}</Text>

        <Divider orientation="horizontal" my={5} />

        <Grid
          gridTemplateColumns={[
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
            'repeat(3, 1fr)',
          ]}
          gap={6}
        >
          <Box my={['0px', '10px', '30px', '40px']}>
            <Box mb={3}>
              <Text fontSize="xl">Business Info</Text>
            </Box>
            <Divider colorScheme="pink" borderWidth="2px" />
            <Box my="10px" textAlign="left">
              <Text>Company Name: {data?.companyName}</Text>
              <Text>Business Type: {data?.businessType}</Text>
            </Box>
          </Box>
          <Box my={['0px', '10px', '30px', '40px']}>
            <Box mb={3}>
              <Text fontSize="xl">Company Address</Text>
            </Box>
            <Divider colorScheme="pink" borderWidth="2px" />
            <Box my="10px" textAlign="left">
              <Text>State: {data?.state}</Text>
              <Text>City: {data?.city}</Text>
              <Text>Country: {data?.country}</Text>
            </Box>
          </Box>

          <Box my={['0px', '10px', '30px', '40px']}>
            <Box mb={3}>
              <Text fontSize="xl">Business Time</Text>
            </Box>
            <Divider colorScheme="pink" borderWidth="2px" />
            <Box my="10px" textAlign="left">
              <Grid
                templateColumns={[
                  'repeat(4, 1fr)',
                  'repeat(4, 1fr)',
                  'repeat(4, 1fr)',
                  'repeat(7, 1fr)',
                ]}
                // gap={1}
                flexDirection={['column', 'column', 'row', 'row']}
                // px="10px"
              >
                <Text>Days:</Text>
                {data?.businessDays.map((day: any, index: any) => (
                  <Text>
                    {day}
                    {index !== data?.businessDays?.length - 1 && ','}
                  </Text>
                ))}
              </Grid>

              <Text>
                Hours: {data?.businessHours[0]} To {data?.businessHours[1]}{' '}
              </Text>
            </Box>
          </Box>
        </Grid>
      </GridItem>
    </Grid>
  );
});

export default DashboardBody;
