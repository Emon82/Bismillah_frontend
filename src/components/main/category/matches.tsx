import { useRootStore } from '@/models/root-store-provider';
import { observer } from 'mobx-react-lite';
import { bgGray, golden } from '@/themes/custom.color';
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Grid,
  GridItem,
  HStack,
  Icon,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Avatar,
  useToast,
  AvatarBadge,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import {
  BsChatSquareDotsFill,
  BsFillPeopleFill,
  BsFillChatSquareDotsFill,
} from 'react-icons/bs';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import { getMatch } from '@/api/profile/getMatch';
import {
  sendConnectionInput,
  getOutGoingRequest,
  deleteReqInput,
} from '@/api/connection/connection';
import NotFound from '@/utils/NotFound';
import UpgraeModal from '@/utils/UpgraeModal';
import convertBirthDateToAge from '@/utils/convertDateToAge';
import ConvertAvatarUrl from '@/utils/convertAvatarUrl';

export const MyMatch = observer(() => {
  const toast = useToast();
  const { user } = useRootStore();
  const { selectProfileId, addOutGoingRequest, outGoingRequest } = user;

  const [loading, setLoading] = useState(true);
  const [matchData, setMatchData] = useState([]);
  const [nearMeData, setNearMedata] = useState([]);
  const [recentViewData, setRecentViewData] = useState([]);

  // front end pagination
  const PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = ({ selected: selectedPage }: any) => {
    setCurrentPage(selectedPage);
  };
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(matchData.length / PER_PAGE);

  const fetchData = async () => {
    const getMatchResult: any = await getMatch(user.auth, selectProfileId);
    console.log(getMatchResult);
    if (getMatchResult.code === 200) {
      setMatchData(getMatchResult.details);
    }

    const getOutgoingResult: any = await getOutGoingRequest(
      selectProfileId,
      user.auth,
    );

    // outgoing req set in mobx state
    if (getOutgoingResult.code === 200) {
      // return only id
      const receiverId = getOutgoingResult.details.sendReq.map(
        (data: any) => data.receiverId,
      );
      addOutGoingRequest(receiverId);
    }
  };

  // api cal before loading
  useEffect(() => {
    // if token than api call
    if (user.auth) {
      fetchData();
    }
  }, [selectProfileId]);

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
      fetchData();
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
      fetchData();
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

  // remove match from state
  const removeMatchHandle = (id: string) => {
    const newData = matchData.filter((item: any) => item.id !== id);
    setMatchData(newData);
    toast({
      title: 'Remove',
      description: 'Remove Item',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <Box bg={bgGray}>
      <Tabs isFitted variant="enclosed">
        <TabList bg="gray.50">
          <Tab fontSize={['11px', '13px', '13px', '13px']}>New Matches</Tab>
          <Tab fontSize={['11px', '13px', '13px', '13px']}>My Matches</Tab>
          <Tab fontSize={['11px', '13px', '13px', '13px']}>Near Me</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <>
              {!matchData.length ? (
                <NotFound title="Match Not Found" />
              ) : (
                <>
                  <Grid
                    templateColumns={[
                      'repeat(1, 1fr)',
                      'repeat(2, 1fr)',
                      'repeat(4, 1fr)',
                      'repeat(4, 1fr)',
                    ]}
                    gap={3}
                    flexDirection={['column', 'column', 'row', 'row']}
                  >
                    {matchData.length &&
                      matchData
                        .slice(offset, offset + PER_PAGE)
                        .map((data: any, index: number) => (
                          <Box boxShadow="md" bg="white" rounded="md" p="3">
                            <Center>
                              <Avatar
                                h="120px"
                                w="120px"
                                name={data.firstName}
                                src={ConvertAvatarUrl(data.avatar) || 'd'}
                              >
                                {/* <AvatarBadge boxSize="1.25em" bg="green.500" /> */}
                              </Avatar>
                            </Center>

                            <Box d="flex" justifyContent="space-between" mt="3">
                              <Text
                                color={golden}
                                style={{ fontWeight: 'bold' }}
                                fontSize={['18px', '18px', '18px', '19px']}
                              >
                                {data.firstName}
                              </Text>
                              <Text color="green.500">
                                ({convertBirthDateToAge(data.birthDate)} Years)
                              </Text>
                            </Box>
                            <HStack justifyContent="space-around" py="2">
                              <Box fontSize="14px">
                                <Text mt={2}>
                                  {data.weight}kg ,{data.height} cm
                                </Text>
                                <Text mt={2}>{data.religion}</Text>
                                <Text mt={2}>{data.designation}</Text>
                              </Box>
                              <Box fontSize="14px">
                                <Text mt={2}>{data.maritalStatus}</Text>
                                <Text mt={2}>{data.country}</Text>
                                <Text mt={2}>Not Specified</Text>
                              </Box>
                            </HStack>
                            <HStack justifyContent="space-around" my="2">
                              <Text fontSize="14px" my={2} textAlign="justify">
                                {data?.bio ? data.bio : 'No Bio'}
                              </Text>
                            </HStack>
                            <Center>
                              <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                my="2"
                              >
                                {outGoingRequest.includes(data.id) ? (
                                  <Button
                                    size="sm"
                                    colorScheme="red"
                                    variant="solid"
                                    onClick={() =>
                                      cancelConnectReqHandle(data.id)
                                    }
                                  >
                                    Cancel
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    colorScheme="green"
                                    variant="solid"
                                    onClick={() =>
                                      sendConnectReqHandle(data.id)
                                    }
                                  >
                                    Connect
                                  </Button>
                                )}

                                {/* {user.details?.scopes.includes('PREMIUM') ? (
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
                                )} */}

                                <Link href={`/main/profile/match/${data.id}`}>
                                  <Button
                                    size="sm"
                                    colorScheme="blue"
                                    variant="outline"
                                  >
                                    <Text
                                      fontSize={[
                                        '10px',
                                        '10px',
                                        '10px',
                                        '12px',
                                      ]}
                                    >
                                      View profile
                                    </Text>
                                  </Button>
                                </Link>
                              </Stack>
                            </Center>
                          </Box>
                        ))}
                  </Grid>
                  <Box my="50px" mx={['0px', '50', '80px', '400px']}>
                    <ReactPaginate
                      previousLabel="← Previous"
                      nextLabel="Next →"
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      containerClassName="pagination"
                      previousLinkClassName="pagination__link"
                      nextLinkClassName="pagination__link"
                      disabledClassName="pagination__link--disabled"
                      activeClassName="pagination__link--active"
                      pageRangeDisplayed={5}
                      marginPagesDisplayed={2}
                    />
                  </Box>
                </>
              )}
            </>
          </TabPanel>
          <TabPanel>
            <>
              {!matchData.length ? (
                <NotFound title="Match Not Found" />
              ) : (
                <>
                  <Grid
                    templateColumns={[
                      'repeat(1, 1fr)',
                      'repeat(2, 1fr)',
                      'repeat(4, 1fr)',
                      'repeat(4, 1fr)',
                    ]}
                    gap={3}
                    flexDirection={['column', 'column', 'row', 'row']}
                  >
                    {matchData.length &&
                      matchData
                        .slice(offset, offset + PER_PAGE)
                        .map((data: any, index: number) => (
                          <Box
                            boxShadow="md"
                            bg="white"
                            // h="350px"
                            p="3"
                          >
                            <Center>
                              <Avatar
                                h="120px"
                                w="120px"
                                name={data.firstName}
                                src={ConvertAvatarUrl(data.avatar) || ''}
                              >
                                {/* <AvatarBadge boxSize="1.25em" bg="green.500" /> */}
                              </Avatar>
                            </Center>

                            <Box d="flex" justifyContent="space-between" mt="3">
                              <Text
                                color={golden}
                                style={{ fontWeight: 'bold' }}
                                fontSize={['18px', '18px', '18px', '19px']}
                              >
                                {data.firstName}
                              </Text>
                              <Text color="green.500">
                                ({convertBirthDateToAge(data.birthDate)} Years)
                              </Text>
                            </Box>
                            <HStack justifyContent="space-around" py="2">
                              <Box fontSize="14px">
                                <Text mt={2}>
                                  {data.weight}kg ,{data.height} feet
                                </Text>
                                <Text mt={2}>{data.religion}</Text>
                                <Text mt={2}>{data.designation}</Text>
                              </Box>
                              <Box fontSize="14px">
                                <Text mt={2}>{data.maritalStatus}</Text>
                                <Text mt={2}>{data.country}</Text>
                                {/* <Text mt={2}>Not Specified</Text> */}
                              </Box>
                            </HStack>
                            <HStack justifyContent="space-around" my="2">
                              <Text fontSize="14px" my={2} textAlign="justify">
                                {data?.bio ? data.bio : 'No Bio'}
                              </Text>
                            </HStack>
                            <Center>
                              <Stack
                                direction="row"
                                spacing={4}
                                alignItems="center"
                                my="2"
                              >
                                {outGoingRequest.includes(data.id) ? (
                                  <Button
                                    size="sm"
                                    colorScheme="red"
                                    variant="solid"
                                    onClick={() =>
                                      cancelConnectReqHandle(data.id)
                                    }
                                  >
                                    Cancel
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    colorScheme="green"
                                    variant="solid"
                                    onClick={() =>
                                      sendConnectReqHandle(data.id)
                                    }
                                  >
                                    Connect
                                  </Button>
                                )}

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
                                <Link href={`/main/profile/match/${data.id}`}>
                                  <Button
                                    size="sm"
                                    colorScheme="blue"
                                    variant="outline"
                                  >
                                    <Text
                                      fontSize={[
                                        '10px',
                                        '10px',
                                        '10px',
                                        '12px',
                                      ]}
                                    >
                                      View profile
                                    </Text>
                                  </Button>
                                </Link>
                              </Stack>
                            </Center>
                          </Box>
                        ))}
                  </Grid>
                  <Box my="50px" mx={['0px', '50', '80px', '400px']}>
                    <ReactPaginate
                      previousLabel="← Previous"
                      nextLabel="Next →"
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      containerClassName="pagination"
                      previousLinkClassName="pagination__link"
                      nextLinkClassName="pagination__link"
                      disabledClassName="pagination__link--disabled"
                      activeClassName="pagination__link--active"
                      pageRangeDisplayed={5}
                      marginPagesDisplayed={2}
                    />
                  </Box>
                </>
              )}
            </>
          </TabPanel>
          <TabPanel>
            <>
              {!matchData.length ? (
                <NotFound title="Match Not Found" />
              ) : (
                <>
                  <Grid
                    templateColumns={[
                      'repeat(1, 1fr)',
                      'repeat(2, 1fr)',
                      'repeat(4, 1fr)',
                      'repeat(4, 1fr)',
                    ]}
                    gap={3}
                    flexDirection={['column', 'column', 'row', 'row']}
                  >
                    {matchData.length &&
                      matchData
                        .slice(offset, offset + PER_PAGE)
                        .map((data: any, index: number) => (
                          <Box
                            boxShadow="md"
                            bg="white"
                            // h="350px"
                            p="3"
                          >
                            <Center>
                              <Avatar
                                h="120px"
                                w="120px"
                                name={data.firstName}
                                src={ConvertAvatarUrl(data.avatar) || ''}
                              >
                                {/* <AvatarBadge boxSize="1.25em" bg="green.500" /> */}
                              </Avatar>
                            </Center>

                            <Box d="flex" justifyContent="space-between" mt="3">
                              <Text
                                color={golden}
                                style={{ fontWeight: 'bold' }}
                                fontSize={['18px', '18px', '18px', '19px']}
                              >
                                {data.firstName}
                              </Text>
                              <Text color="green.500">
                                ({convertBirthDateToAge(data.birthDate)} Years)
                              </Text>
                            </Box>
                            <HStack justifyContent="space-around" py="2">
                              <Box fontSize="14px">
                                <Text mt={2}>
                                  {data.weight}kg ,{data.height} feet
                                </Text>
                                <Text mt={2}>{data.religion}</Text>
                                <Text mt={2}>{data.designation}</Text>
                              </Box>
                              <Box fontSize="14px">
                                <Text mt={2}>{data.maritalStatus}</Text>
                                <Text mt={2}>{data.country}</Text>
                                {/* <Text mt={2}>Not Specified</Text> */}
                              </Box>
                            </HStack>
                            <HStack justifyContent="space-around" my="2">
                              <Text fontSize="14px" my={2} textAlign="justify">
                                {data?.bio ? data.bio : 'No Bio'}
                              </Text>
                            </HStack>
                            <Center>
                              <Stack
                                direction="row"
                                spacing={4}
                                alignItems="center"
                                my="2"
                              >
                                {outGoingRequest.includes(data.id) ? (
                                  <Button
                                    size="sm"
                                    colorScheme="red"
                                    variant="solid"
                                    onClick={() =>
                                      cancelConnectReqHandle(data.id)
                                    }
                                  >
                                    Cancel
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    colorScheme="green"
                                    variant="solid"
                                    onClick={() =>
                                      sendConnectReqHandle(data.id)
                                    }
                                  >
                                    Connect
                                  </Button>
                                )}
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

                                <Link href={`/main/profile/match/${data.id}`}>
                                  <Button
                                    size="sm"
                                    colorScheme="blue"
                                    variant="outline"
                                  >
                                    <Text
                                      fontSize={[
                                        '10px',
                                        '10px',
                                        '10px',
                                        '12px',
                                      ]}
                                    >
                                      View profile
                                    </Text>
                                  </Button>
                                </Link>
                              </Stack>
                            </Center>
                          </Box>
                        ))}
                  </Grid>
                  <Box my="50px" mx={['0px', '50', '80px', '400px']}>
                    <ReactPaginate
                      previousLabel="← Previous"
                      nextLabel="Next →"
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      containerClassName="pagination"
                      previousLinkClassName="pagination__link"
                      nextLinkClassName="pagination__link"
                      disabledClassName="pagination__link--disabled"
                      activeClassName="pagination__link--active"
                      pageRangeDisplayed={5}
                      marginPagesDisplayed={2}
                    />
                  </Box>
                </>
              )}
            </>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
});
