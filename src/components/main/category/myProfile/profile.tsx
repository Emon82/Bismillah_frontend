import { useRootStore } from '@/models/root-store-provider';
import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Center,
  Grid,
  GridItem,
  Image,
  Text,
  Avatar,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Icon,
} from '@chakra-ui/react';
import { BsFillEyeFill } from 'react-icons/bs';
import { golden } from '@/themes/custom.color';
import { baseUrl } from '../../../../constants/api';
import InputProfilePic from './inputProfilePic';

const Profile = observer(() => {
  const { getProfileData } = useRootStore();
  // convert data to url

  const avatarUrl = `${baseUrl}/${
    getProfileData?.avatar?.host
  }/${getProfileData?.avatar?.path.join('/')}/${getProfileData?.avatar?.id}/${
    getProfileData?.avatar?.name
  }`;

  // iso date to convert age
  const getAge = (isoDate: any) => {
    const date = new Date(isoDate);
    const diff_ms = Date.now() - date.getTime();
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Grid
        p="8"
        borderWidth="1px"
        boxShadow="md"
        // rounded="md"
        bg="white"
        borderBottom="5px solid #C1BEBD"
      >
        <Grid
          templateColumns={['repeat(3, 1fr)', 'repeat(5, 1fr)']}
          gap={1}
          direction={['column', 'row']}
        >
          <GridItem rowSpan={2} colSpan={1}>
            <Box w="130px" h="120px">
              <Avatar
                width="100%"
                height="100%"
                mt="10px"
                name={getProfileData?.firstName}
                src={`${avatarUrl}`}
                // src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
              />
              <Box
                size="xs"
                color={golden}
                w="100%"
                mt="1"
                cursor="pointer"
                onClick={onOpen}
              >
                Add/ EditPhotos
              </Box>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Upload your Profile Pictute</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <InputProfilePic />
                  </ModalBody>

                  <ModalFooter>
                    <Center>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        mr={3}
                        onClick={onClose}
                      >
                        Close
                      </Button>
                    </Center>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </GridItem>
          <GridItem colSpan={2}>
            <Text
              fontSize={['15px', '16px', '18px', '20px']}
              style={{ fontWeight: 'bold' }}
            >
              {getProfileData?.firstName}
            </Text>
            <Text color="ButtonShadow">
              Profile created for {getProfileData?.relationship}
            </Text>
            <Text fontFamily="sans-serif">
              {' '}
              {getAge(getProfileData?.birthDate)} Years,{' '}
              {getProfileData?.height} (cm){' '}
            </Text>
            <Text>Not Specified, {getProfileData?.country}</Text>
            <Text textAlign="justify">{` ${getProfileData?.profession}`}</Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Box my="20px">
              <Text align="center">How your profile looks to others</Text>
              {/* <Center>
                <Button align="center" mt="5px">
                  <Icon as={BsFillEyeFill} color="green.500" w={6} h={6} />
                  Profile Preview
                </Button>
              </Center> */}
            </Box>
          </GridItem>
        </Grid>
      </Grid>
    </div>
  );
});

export default Profile;
