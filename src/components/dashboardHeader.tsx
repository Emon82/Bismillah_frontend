import { useRouter } from 'next/router';
import { golden, bgGray } from '@/themes/custom.color';
import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  useToast,
  Menu,
  Spacer,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Avatar,
  // Badge,
  // Popover,
  // PopoverTrigger,
  // PopoverContent,
  // PopoverHeader,
  // PopoverArrow,
  // PopoverCloseButton,
  // PopoverBody,
  // PopoverFooter,
  // Center,
  Stack,
  useDisclosure,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/models/root-store-provider';
// import Notification from '@/components/main/notification';
// import ProfileSwitch from './main/Auth/ProfileSwitch';
import { getAllProfile } from '../api/auth/auth';
import { getProfiledetails, setDefaultProfile } from '../api/profile/profile';
import ConvertAvatarUrl from '../utils/convertAvatarUrl';

const DashboardHeader = observer(() => {
  const toast = useToast();
  const router = useRouter();
  const { user, getProfileData } = useRootStore();
  const avatarUrl = ConvertAvatarUrl(getProfileData?.avatar);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalOpen, setModalOpen] = useState(false);
  const [allPro, setAllPro] = useState<any>([]);
  const [selectedId, setSelectId] = useState<any>();

  const fetchData = async () => {
    const allProfile: any = await getAllProfile(user.auth);
    if (allProfile.code === 200) {
      setAllPro(allProfile.details);
    }
  };

  useEffect(() => {
    // if token than api call
    if (modalOpen) {
      fetchData();
    }
  }, [modalOpen]);

  const profileSwitchHandler = async () => {
    try {
      const result: any = await getProfiledetails(user.auth, selectedId);
      const result2: any = await setDefaultProfile(user.auth, selectedId);

      if (result.code === 200) {
        user.addProfile(result.details);
        // await user.refresh();
        setModalOpen(false);
        setSelectId(null);
        router.push('/main');
        toast({
          title: 'Profile switch success',
          description: 'Profile Switch',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Switch Failed',
        description: 'Unable to process request',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleLogout = () => {
    user.logOut();
    toast({
      title: 'Log out Successful',
      description: 'Log out success',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
    return router.push('/');
  };
  const mxValues = ['10px', '50px', '100px', '150px'];
const maxWValues = ['100px', '120px', '130px', '150px'];

  return (
    <Box>
      <Box mx={mxValues}>
        <HStack justifyContent="space-between">
          <Box>
            <Image
              maxW={maxWValues}
              maxH={['50px', '60px', '80px', '45px']}
              objectFit="contain"
              ml={4}
              src="/logo/BM2.png"
              alt="Segun Adebayo"
              onClick={() => router.push('/')}
            />
          </Box>
          <HStack>
            {/* <Button>Upgrade</Button> */}

            {/* <Text fontSize={['12px', '15px', '16px', '16px']} mr={5}>
              Help
            </Text> */}
          </HStack>
        </HStack>
      </Box>
      <Box bg={golden} px={4}>
        <Flex h="70px" alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: !isOpen ? 'none' : 'inherit' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            alignItems="center"
            mx={['10px', '50px', '100px', '150px']}
          >
            <HStack
              as="nav"
              spacing={8}
              display={{ base: 'none', md: 'flex' }}
              color="white"
            >
              <Button
                colorScheme="white"
                variant="link"
                onClick={() => router.push('/main')}
              >
                Dashboard
              </Button>
              <Button
                colorScheme="white"
                variant="link"
                onClick={() => router.push('/main/profile/match')}
              >
                <Text style={{ fontFamily: 'sans-serif' }}>Matches</Text>
              </Button>
              <Button
                colorScheme="white"
                variant="link"
                onClick={() => router.push('/main/profile/connection')}
              >
                <Text style={{ fontFamily: 'sans-serif' }}> Connection</Text>
              </Button>

              <Button
                colorScheme="white"
                variant="link"
                onClick={() => router.push('/main/search')}
              >
                Search
              </Button>

              <Button
                colorScheme="white"
                variant="link"
                onClick={() => router.push('/main/inbox')}
              >
                Inbox
              </Button>
            </HStack>
          </HStack>
          <Text mr={['10px', '15px', '20px', '50px']}>
            <Menu>
              <MenuButton>
                <Avatar
                  size="sm"
                  name={getProfileData?.firstName}
                  src={avatarUrl || ''}
                  // src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
                />
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <MenuItem onClick={() => router.push('/main/profile')}>
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={() => router.push('/main/profile/photo')}>
                    Gallery
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Setting">
                  <MenuItem onClick={() => router.push('/main/setting')}>
                    Account Setting
                  </MenuItem>
                  <MenuItem
                    onClick={() => router.push('/main/setting/preference')}
                  >
                    Preference Setting
                  </MenuItem>

                  <MenuItem onClick={() => setModalOpen(!modalOpen)}>
                    Switch Profile
                  </MenuItem>
                  <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Text>
        </Flex>

        {isOpen ? (
          <Box pb={4}>
            <Stack as="nav" spacing={4} color="white">
              <Button
                colorScheme="white"
                variant="link"
                onClick={() => router.push('/main')}
              >
                Dashboard
              </Button>

              <Button
                colorScheme="white"
                variant="link"
                onClick={() => router.push('/main/profile/match')}
              >
                Matches
              </Button>
              <Button
                colorScheme="white"
                variant="link"
                onClick={() => router.push('/main/profile/connection')}
              >
                Connection
              </Button>
              <Button
                colorScheme="white"
                variant="link"
                onClick={() => router.push('/main/search')}
              >
                Search
              </Button>
              {/* <Button
                colorScheme="white"
                variant="link"
                onClick={() => router.push('/main/profile/create')}
              >
                Create Profile
              </Button> */}
              <Button
                colorScheme="white"
                variant="link"
                onClick={() => router.push('/main/inbox')}
              >
                Inbox
              </Button>
              {/* <Button colorScheme="white" variant="link">
                More
              </Button> */}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Switch Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center">
              <div>
                {allPro.map((profile: any) => (
                  <Box
                    px="3"
                    height="70px"
                    w="100%"
                    mb="2"
                    boxShadow="md"
                    bg={profile.id === selectedId ? golden : bgGray}
                    _hover={{
                      // borderWidth: '1px',
                      boxShadow: 'dark-lg',
                      // rounded: 'md',
                    }}
                  >
                    <Box
                      display="flex"
                      mt="3"
                      onClick={() => setSelectId(profile.id)}
                    >
                      <Avatar
                        size="md"
                        mt="10px"
                        name={profile.firstName}
                        src={ConvertAvatarUrl(profile.avatar) || ''}
                        // src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
                      />
                      <Spacer />
                      <Box mt="10px">
                        <Text textAlign="center">{`${profile.firstName} ${profile.lastName}`}</Text>
                        <Text fontSize="14px">{profile.relationship} </Text>
                      </Box>
                      <Spacer />
                      <Spacer />
                    </Box>
                  </Box>
                ))}
              </div>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              size="md"
              onClick={() => router.push('/main/profile/create')}
            >
              Create new Profile
            </Button>
            <Button
              colorScheme="blue"
              disabled={!selectedId}
              size="md"
              onClick={() => profileSwitchHandler()}
            >
              Switch
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
});

export default DashboardHeader;
