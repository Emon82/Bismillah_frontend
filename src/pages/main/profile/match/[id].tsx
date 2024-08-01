import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import GalleryViewe from '@/components/main/category/myProfile/photo/GalleryForViewer';
import Footer from '@/components/footer';

import { useRootStore } from '@/models/root-store-provider';
import { golden, csBackground } from '@/themes/custom.color';

import {
  Box,
  Divider,
  Grid,
  GridItem,
  Text,
  Center,
  Image,
  HStack,
  Icon,
  Badge,
  Thead,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
  Button,
  Stack,
  Avatar,
  Flex,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FaPenNib, FaRegAddressCard } from 'react-icons/fa';
import { TiDocumentText } from 'react-icons/ti';
import {
  BsLockFill,
  BsChatSquareDotsFill,
  BsFillPeopleFill,
  BsFillChatSquareDotsFill,
} from 'react-icons/bs';
import { GiLifeBar, GiCancel, GiOpenBook } from 'react-icons/gi';
import { GrGallery } from 'react-icons/gr';
import UpgraeModal from '@/utils/UpgraeModal';
import DashboardHeader from '../../../../components/dashboardHeader';

import {
  getProfiledetails,
  showGalleryImage,
  getPreferenceMatch,
} from '../../../../api/profile/profile';
import convertBirthDateToAge from '../../../../utils/convertDateToAge';
import ConvertAvatarUrl from '../../../../utils/convertAvatarUrl';
import {
  sendConnectionInput,
  getOutGoingRequest,
  deleteReqInput,
} from '../../../../api/connection/connection';

const keyFront = ['16px', '12px', '13x', '15px'];
const valueFront = ['14px', '12px', '13x', '12px'];
const font = ['12px', '12px', '13x', '13px'];
const Details = observer(() => {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  const { user } = useRootStore();
  const userId: any = id;

  const { outGoingRequest, addOutGoingRequest, selectProfileId } = user;
  const [data, setProfileDetails] = useState<any>({});
  const [youAndHerMatch, setYouAndHerMatch] = useState<any>([]);
  const [galleryImage, setGalleryImage] = useState<any>([]);

  const fetchData = async () => {
    const result: any = await getProfiledetails(user.auth, userId);
    if (result.code === 200) {
      setProfileDetails(result.details);
    }
  };

  const fetchYouAndHerMatch = async () => {
    const result: any = await getPreferenceMatch(user.auth, userId);
    console.log(result);
    if (result.code === 200) {
      setYouAndHerMatch(result.details);
    }
  };

  const fetchGalleryImage = async () => {
    const result: any = await showGalleryImage(user.auth, userId);
    console.log(result);
    if (result.code === 200) {
      if (result.details?.gallery.length) {
        setGalleryImage(result.details?.gallery);
      }
    }
  };

  const maleAvatarUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu6Ctmi9RnwNgfO3csS0a7WBR23PFvJTjL7Q&usqp=CAU';
  const femaleAbvatarUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpiAvkk5ghcWyvOo7rY_OHEck0iLCl-IgZog&usqp=CAU';

  const fetchOutGoingReq = async () => {
    const getOutgoingResult: any = await getOutGoingRequest(
      selectProfileId,
      user.auth,
    );

    // outgoing req set in mobx state
    if (getOutgoingResult.code === 200) {
      // return only id
      const receiverId = getOutgoingResult.details.sendReq.map(
        (d: any) => d.receiverId,
      );
      addOutGoingRequest(receiverId);
    }
  };

  // send connect request handle
  const sendConnectReqHandle = async (receiverId: string) => {
    const res: any = await sendConnectionInput(
      { receiverId, senderId: selectProfileId },
      user.auth,
    );
    if (res.code === 200) {
      toast({
        title: 'Success',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      fetchOutGoingReq();
    } else {
      toast({
        title: 'Send failed',
        description: res.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  // cancel connect request handle
  const cancelConnectReqHandle = async (receiverId: string) => {
    const res: any = await deleteReqInput(
      { receiverId, senderId: selectProfileId },
      user.auth,
    );
    if (res.code === 200) {
      toast({
        title: 'Success',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      fetchOutGoingReq();
    } else {
      toast({
        title: 'Send failed',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    if (user.auth) {
      fetchData();
      fetchYouAndHerMatch();
      fetchGalleryImage();
      fetchOutGoingReq();
    }
  }, []);

  return (
    <div>
      <Box bg={csBackground}>
        <DashboardHeader />
        <Box>
          <Box bg="gray.50" mx={['0px', '50px', '100px', '200px']} mb={2}>
            <Grid
              templateColumns={[
                'repeat(6, 1fr)',
                'repeat(6, 1fr)',
                'repeat(12, 1fr)',
              ]}
              borderWidth="1px"
              boxShadow="md"
              p={2}
              rounded="md"
              bg="white"
            >
              <GridItem colSpan={[1, 3]}>
                <Center>
                  <Avatar
                    h={['80px', '90px', '100px', '120px']}
                    w={['80px', '90px', '100px', '120px']}
                    mt="10px"
                    name={data?.firstName}
                    src={ConvertAvatarUrl(data.avatar) || ''}
                  />
                </Center>
                <Divider my={2} borderWidth="1px" />
                {/* <Center>
                  <Text fontSize={['10px', '10px', '10px', '12px']}>
                    <Icon
                      as={BsFillChatDotsFill}
                      color={golden}
                      w={3}
                      h={3}
                      mr="2px"
                    />{' '}
                    Request a Photo
                  </Text>
                </Center> */}
              </GridItem>

              <GridItem
                colSpan={[4, 7]}
                //  bg="white"
                // cursor="pointer"
              >
                <Box mx={3}>
                  <HStack my={1}>
                    <Text
                      color={golden}
                      ml="5px"
                      pt="2px"
                      style={{ fontWeight: 'bold' }}
                      fontSize={['18px', '18px', '18px', '19px']}
                    >
                      {data.firstName}
                    </Text>

                    <Text color="green.500">
                      ({convertBirthDateToAge(data.birthDate)} Years)
                    </Text>
                    <Icon
                      as={AiOutlineCheckCircle}
                      color="green.500"
                      w={4}
                      h={4}
                    />
                  </HStack>
                  <HStack justifyContent="space-around" my={2}>
                    <Box display="flex">
                      <Text>
                        <Icon
                          as={BsFillChatSquareDotsFill}
                          color="green.500"
                          w={4}
                          h={4}
                          mr="3px"
                        />
                      </Text>

                      <Text>Online now</Text>
                    </Box>
                    <Box display="flex">
                      <Icon
                        as={BsFillPeopleFill}
                        color="#F810DF"
                        w={5}
                        h={5}
                        mr="3px"
                      />
                    </Box>
                  </HStack>

                  <Divider borderWidth="1px" />

                  <HStack justifyContent="space-around">
                    <Box fontSize="12px">
                      <Text mt={2}>
                        {convertBirthDateToAge(data.birthDate)}years ,
                        {data.height} (cm)
                      </Text>
                      <Text mt={2}>{data.religion}</Text>
                      <Text mt={2}>{data.motherToung}</Text>
                    </Box>
                    <Box fontSize="12px">
                      <Text mt={2}>{data.maritalStatus}</Text>
                      <Text mt={2}>{data.country}</Text>
                      <Text mt={2}>Not Specified</Text>
                    </Box>
                  </HStack>
                  <HStack justifyContent="space-around">
                    <Text
                      fontSize={['10px', '10px', '10px', '12px']}
                      mt={2}
                      textAlign="justify"
                    >
                      {data.bio}
                    </Text>
                  </HStack>
                </Box>
              </GridItem>
              {/* </Link> */}
              <GridItem colSpan={[1, 2]} alignSelf="center">
                <Stack direction="column" spacing={1}>
                  <Text>
                    {outGoingRequest.includes(data.id) ? (
                      <Button
                        leftIcon={<GiCancel />}
                        size="sm"
                        colorScheme="red"
                        variant="solid"
                        onClick={() => cancelConnectReqHandle(data.id)}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        leftIcon={<BsFillPeopleFill />}
                        size="sm"
                        colorScheme="green"
                        variant="solid"
                        onClick={() => sendConnectReqHandle(data.id)}
                      >
                        Connect
                      </Button>
                    )}
                  </Text>

                  <Text>
                    {user.details?.scopes.includes('PREMIUM') ? (
                      <Button
                        leftIcon={<BsChatSquareDotsFill />}
                        colorScheme="teal"
                        size="sm"
                        variant="solid"
                      >
                        Message
                      </Button>
                    ) : (
                      <UpgraeModal />
                    )}
                  </Text>
                </Stack>
              </GridItem>
            </Grid>

            <Grid p="5">
              {/* What she id Looking For */}
              <Box>
                <Box color={golden}>
                  What {data.gender === 'Female' ? 'She' : 'He'} Is Looking For
                </Box>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>
                        {/* <Center> */}
                        <Box
                          height={[10, 20, 50, 100]}
                          width={[10, 20, 50, 100]}
                        >
                          <Image
                            height="100%"
                            width="100%"
                            border="2px dotted blue"
                            src={
                              data.gender === 'Female'
                                ? femaleAbvatarUrl
                                : maleAvatarUrl
                            }
                            alt="marriage"
                            borderRadius="50%"
                          />
                        </Box>
                        {/* </Center> */}
                      </Th>
                      <Th>
                        <Center>
                          <Badge
                            borderRadius="full"
                            colorScheme="teal"
                            py="3"
                            px="4"
                          >
                            <Text fontSize={[5, 10, 15, 17]}>
                              You match of{' '}
                              {data.gender === 'Female' ? 'His' : 'Her'}{' '}
                              Preferences
                            </Text>
                          </Badge>
                        </Center>
                      </Th>
                      <Th>
                        <Center>
                          <Box
                            height={[10, 20, 50, 100]}
                            width={[10, 20, 50, 100]}
                          >
                            <Image
                              height="100%"
                              width="100%"
                              border="2px dotted blue"
                              src={
                                data.gender === 'Male'
                                  ? femaleAbvatarUrl
                                  : maleAvatarUrl
                              }
                              alt="marriage"
                              borderRadius="50%"
                            />
                          </Box>
                        </Center>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>
                        <Text fontSize={[10, 15, 15, 17]} color="#FF3399">
                          {data.gender === 'Female' ? 'Her' : 'His'} Preferences
                        </Text>
                      </Td>
                      <Td />
                      <Td>
                        <Center>
                          <Text
                            fontSize={[10, 15, 15, 17]}
                            color="#FF3399"
                            pl="3"
                          >
                            You match
                          </Text>
                        </Center>
                      </Td>
                    </Tr>

                    {!youAndHerMatch.length ? (
                      <Tr>
                        <Td>
                          <Text fontSize={keyFront}>
                            Your Preferences Not Found
                          </Text>
                        </Td>
                      </Tr>
                    ) : (
                      <>
                        {youAndHerMatch.map((item: any, index: any) => (
                          <Tr>
                            <Td>
                              <Text fontSize={keyFront}>{item}</Text>
                              {/* <Text fontSize={valueFront}>21 to 26</Text> */}
                            </Td>
                            <Td />
                            <Th>
                              <Center>
                                <Icon
                                  as={AiOutlineCheckCircle}
                                  color="green.500"
                                  w={[5, 7]}
                                  h={[5, 7]}
                                />
                              </Center>
                            </Th>
                          </Tr>
                        ))}
                      </>
                    )}

                    {/* <Tr>
                      <Td>
                        <Text ml="auto" fontSize={keyFront}>
                          Height
                        </Text>
                        <Text fontSize={valueFront}>5.5</Text>
                      </Td>
                      <Td />
                      <Th>
                        <Center>
                          <Icon
                            as={AiOutlineCheckCircle}
                            color="green.500"
                            w={[5, 7]}
                            h={[5, 7]}
                          />
                        </Center>
                      </Th>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize={keyFront}>Marital Status</Text>
                        <Text fontSize={valueFront}>Never Married</Text>
                      </Td>
                      <Td />
                      <Th>
                        <Center>
                          <Icon
                            as={AiOutlineCheckCircle}
                            color="green.500"
                            w={[5, 7]}
                            h={[5, 7]}
                          />
                        </Center>
                      </Th>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize={keyFront}>Religion / Community</Text>
                        <Text fontSize={valueFront}>Muslim</Text>
                      </Td>
                      <Td />
                      <Th>
                        <Center>
                          <Icon
                            as={AiOutlineCheckCircle}
                            color="green.500"
                            w={[5, 7]}
                            h={[5, 7]}
                          />
                        </Center>
                      </Th>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize={keyFront}>Mother Tongue</Text>
                        <Text fontSize={valueFront}>Bengali</Text>
                      </Td>
                      <Td />
                      <Th>
                        <Center>
                          <Icon
                            as={AiOutlineCheckCircle}
                            color="green.500"
                            w={[5, 7]}
                            h={[5, 7]}
                          />
                        </Center>
                      </Th>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize={keyFront}>Country Living in</Text>
                        <Text fontSize={valueFront}>Bangladesh</Text>
                      </Td>
                      <Td />
                      <Th>
                        <Center>
                          <Icon
                            as={AiOutlineCheckCircle}
                            color="green.500"
                            w={[5, 7]}
                            h={[5, 7]}
                          />
                        </Center>
                      </Th>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize={keyFront}>Annual Income</Text>
                        <Text fontSize={valueFront}>Upto 250,000</Text>
                      </Td>
                      <Td />
                      <Th>
                        <Center>
                          <Icon
                            as={AiOutlineCheckCircle}
                            color="green.500"
                            w={[5, 7]}
                            h={[5, 7]}
                          />
                        </Center>
                      </Th>
                    </Tr> */}
                  </Tbody>
                </Table>
              </Box>
            </Grid>

            <Text
              fontSize="2xl"
              color={golden}
              style={{ fontWeight: 'bold' }}
              py="8px"
              pl="15px"
            >
              Personal Information
            </Text>
            <Grid
              p="2"
              borderWidth="1px"
              boxShadow="md"
              bg="white"
              borderBottom="5px solid #C1BEBD"
            >
              <Box>
                <Flex py="2px">
                  <Box display="flex">
                    <Box
                      h="7"
                      w="7"
                      textAlign="center"
                      border="1px"
                      borderColor={golden}
                      borderRadius="50%"
                    >
                      <Icon as={FaPenNib} color={golden} p="1px" />
                    </Box>
                    <Text
                      color={golden}
                      ml="5px"
                      pt="2px"
                      fontSize={['18px', '18px', '18px', '19px']}
                    >
                      In My Own Words
                    </Text>
                  </Box>
                  <Spacer />
                </Flex>
                <Divider colorScheme="golden" borderWidth="1px" mt="2px" />
                <Text
                  fontSize="15px"
                  fontFamily="sans-serif"
                  color="#393636"
                  pt="10px"
                  textAlign="justify"
                >
                  {data?.bio}
                </Text>
              </Box>
            </Grid>

            {/* basic */}
            <Grid
              p="3"
              borderWidth="1px"
              boxShadow="md"
              //  rounded="md"
              bg="white"
              borderBottom="5px solid #C1BEBD"
            >
              <Flex py="2px">
                <Box display="flex">
                  <Box
                    h="7"
                    w="7"
                    textAlign="center"
                    border="1px"
                    borderColor={golden}
                    borderRadius="50%"
                  >
                    <Icon as={TiDocumentText} color={golden} p="1px" />
                  </Box>
                  <Text
                    color={golden}
                    ml="5px"
                    pt="2px"
                    fontSize={['18px', '18px', '18px', '19px']}
                  >
                    Basic
                  </Text>
                </Box>
                <Spacer />
              </Flex>
              <Divider colorScheme="golden" borderWidth="1px" mt="2px" />
              <Grid
                gridTemplateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
                direction={['column', 'row']}
                p="1"
              >
                <GridItem px={['5px', '12px', '80px', '100px']}>
                  <Flex>
                    <Box minW="50%">
                      <Text fontSize={font}>Name</Text>
                      <Text fontSize={font}>Gender</Text>
                      <Text fontSize={font}>Age</Text>
                    </Box>
                    <Spacer />
                    <Box minW="50%">
                      <Text fontSize={font}>: {data?.firstName}</Text>
                      <Text fontSize={font}>: {data?.gender}</Text>
                      <Text fontSize={font}>
                        : {convertBirthDateToAge(data.birthDate)}
                      </Text>
                    </Box>
                  </Flex>
                </GridItem>
                <GridItem px={['5px', '12px', '80px', '100px']}>
                  <Flex>
                    <Box minW="50%">
                      <Text fontSize={font}>Religion</Text>
                      <Text fontSize={font}>Marital Status</Text>
                      <Text fontSize={font}>Phone no</Text>
                    </Box>
                    <Spacer />
                    <Box minW="50%">
                      <Text fontSize={font}>: {data?.religion}</Text>
                      <Text fontSize={font}>: {data?.maritalStatus}</Text>
                      <Text fontSize={font}>
                        :
                        {user.details?.scopes.includes('PREMIUM') ? (
                          data?.contact
                        ) : (
                          <Icon as={BsLockFill} color="red.500" ml="10px" />
                        )}
                      </Text>
                    </Box>
                  </Flex>
                </GridItem>
              </Grid>
            </Grid>

            <Grid
              p="3"
              borderWidth="1px"
              boxShadow="md"
              //  rounded="md"
              bg="white"
              borderBottom="5px solid #C1BEBD"
            >
              <Grid>
                <Flex py="2px">
                  <Box display="flex">
                    <Box
                      h="7"
                      w="7"
                      textAlign="center"
                      border="1px"
                      borderColor={golden}
                      borderRadius="50%"
                    >
                      <Icon as={FaRegAddressCard} color={golden} p="1px" />
                    </Box>
                    <Text
                      color={golden}
                      ml="5px"
                      pt="2px"
                      fontSize={['18px', '18px', '18px', '19px']}
                    >
                      Address
                    </Text>
                  </Box>
                  <Spacer />
                </Flex>
                <Divider colorScheme="golden" borderWidth="1px" mt="2px" />
                <Grid
                  gridTemplateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
                  direction={['column', 'row']}
                  p="1"
                >
                  <GridItem px={['5px', '12px', '80px', '50px']}>
                    <Flex>
                      <Box minW="50%">
                        <Text fontSize={font}>Address One</Text>
                        <Text fontSize={font}>Address Two</Text>
                        <Text fontSize={font}>State</Text>
                      </Box>
                      <Spacer />
                      <Box minW="50%">
                        <Text fontSize={font}>: {data?.address}</Text>
                        <Text fontSize={font}>: {data?.addressTwo}</Text>
                        <Text fontSize={font}>: {data?.state}</Text>
                      </Box>
                    </Flex>
                  </GridItem>
                  <GridItem px={['5px', '12px', '80px', '100px']}>
                    <Flex>
                      <Box minW="50%">
                        <Text fontSize={font}>City</Text>
                        <Text fontSize={font}>Country</Text>
                      </Box>
                      <Spacer />
                      <Box minW="50%">
                        <Text fontSize={font}>: {data?.city}</Text>
                        <Text fontSize={font}>: {data?.country}</Text>
                      </Box>
                    </Flex>
                  </GridItem>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              p="3"
              borderWidth="1px"
              boxShadow="md"
              //  rounded="md"
              bg="white"
              borderBottom="5px solid #C1BEBD"
            >
              <Grid>
                <Flex py="2px">
                  <Box display="flex">
                    <Box
                      h="7"
                      w="7"
                      textAlign="center"
                      border="1px"
                      borderColor={golden}
                      borderRadius="50%"
                    >
                      <Icon as={GiOpenBook} color={golden} p="1px" />
                    </Box>
                    <Text
                      color={golden}
                      ml="5px"
                      pt="2px"
                      fontSize={['18px', '18px', '18px', '19px']}
                    >
                      Education And Career
                    </Text>
                  </Box>
                  <Spacer />
                </Flex>
                <Divider colorScheme="golden" borderWidth="1px" mt="2px" />
                <Grid
                  gridTemplateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
                  direction={['column', 'row']}
                  p="1"
                >
                  <GridItem px={['5px', '12px', '80px', '50px']}>
                    <Flex>
                      <Box minW="50%">
                        <Text fontSize={font}>Degree</Text>
                        <Text fontSize={font}>Institute Name</Text>
                        <Text fontSize={font}>Profession</Text>
                      </Box>
                      <Spacer />
                      <Box minW="50%">
                        <Text fontSize={font}>: {data?.degree}</Text>
                        <Text fontSize={font}>: {data?.institute}</Text>
                        <Text fontSize={font}>: {data?.profession}</Text>
                      </Box>
                    </Flex>
                  </GridItem>
                  <GridItem px={['5px', '12px', '80px', '20px']}>
                    <Flex>
                      <Box minW="30%">
                        <Text fontSize={font}>Designation</Text>
                        <Text fontSize={font}>Company Name</Text>
                        <Text fontSize={font}>Annual Income</Text>
                      </Box>
                      <Spacer />
                      <Box minW="50%">
                        <Text fontSize={font}>: {data?.designation}</Text>
                        <Text fontSize={font}>: {data?.companyName}</Text>
                        <Text fontSize={font}>: {data?.income}</Text>
                      </Box>
                    </Flex>
                  </GridItem>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              p="3"
              borderWidth="1px"
              boxShadow="md"
              //  rounded="md"
              bg="white"
              borderBottom="5px solid #C1BEBD"
            >
              <Grid>
                <Flex py="2px">
                  <Box display="flex">
                    <Box
                      h="7"
                      w="7"
                      textAlign="center"
                      border="1px"
                      borderColor={golden}
                      borderRadius="50%"
                    >
                      <Icon as={GiLifeBar} color={golden} p="1px" />
                    </Box>
                    <Text
                      color={golden}
                      ml="5px"
                      pt="2px"
                      fontSize={['18px', '18px', '18px', '19px']}
                    >
                      Life Style
                    </Text>
                  </Box>
                  <Spacer />
                </Flex>
                <Divider colorScheme="golden" borderWidth="1px" mt="2px" />
                <Grid
                  gridTemplateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
                  direction={['column', 'row']}
                  p="1"
                >
                  <GridItem px={['5px', '12px', '80px', '100px']}>
                    <Flex>
                      <Box minW="50%">
                        <Text fontSize={font}>Diet</Text>
                        <Text fontSize={font}>Smoke</Text>
                        <Text fontSize={font}>Drink</Text>
                        <Text fontSize={font}>Height</Text>
                      </Box>
                      <Spacer />
                      <Box minW="50%">
                        <Text fontSize={font}>: {data?.diet}</Text>
                        <Text fontSize={font}>
                          : {data?.smoke ? 'Yes' : 'No'}
                        </Text>
                        <Text fontSize={font}>
                          : {data?.drink ? 'Yes' : 'No'}
                        </Text>
                        <Text fontSize={font}>: {data?.height} (cm)</Text>
                      </Box>
                    </Flex>
                  </GridItem>
                  <GridItem px={['5px', '12px', '80px', '100px']}>
                    <Flex>
                      <Box minW="50%">
                        <Text fontSize={font}>Weight</Text>
                        <Text fontSize={font}>Body Type</Text>
                        <Text fontSize={font}>Skin Tone</Text>
                      </Box>
                      <Spacer />
                      <Box minW="50%">
                        <Text fontSize={font}>: {data?.weight} kg</Text>
                        <Text fontSize={font}>: {data?.bodyType}</Text>
                        <Text fontSize={font}>: {data?.skinTone}</Text>
                      </Box>
                    </Flex>
                  </GridItem>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              p="3"
              borderWidth="1px"
              boxShadow="md"
              //  rounded="md"
              bg="white"
              borderBottom="5px solid #C1BEBD"
            >
              <Grid>
                <Flex py="2px">
                  <Box display="flex">
                    <Box
                      h="7"
                      w="7"
                      textAlign="center"
                      border="1px"
                      borderColor={golden}
                      borderRadius="50%"
                    >
                      <Icon as={GrGallery} color={golden} p="1px" />
                    </Box>
                    <Text
                      color={golden}
                      ml="5px"
                      pt="2px"
                      fontSize={['18px', '18px', '18px', '19px']}
                    >
                      Gallery
                    </Text>
                  </Box>
                  <Spacer />
                </Flex>
                <Divider colorScheme="golden" borderWidth="1px" mt="2px" />
                <Grid p="1">
                  <GalleryViewe galleryImage={galleryImage} />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer />
      </Box>
    </div>
  );
});
export default Details;
