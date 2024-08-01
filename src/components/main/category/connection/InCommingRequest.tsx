import { useRootStore } from '@/models/root-store-provider';
import { observer } from 'mobx-react-lite';
import { golden } from '@/themes/custom.color';
import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Stack,
  Text,
  Avatar,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import NotFoundWithImage from '../../../../utils/NotFoundWithImage';
import {
  acceptReqInput,
  rejectReqInput,
  getIncomingRequest,
} from '../../../../api/connection/connection';
import ConvertAvatarUrl from '../../../../utils/convertAvatarUrl';
import convertBirthDateToAge from '../../../../utils/convertDateToAge';

const IncomingRequestList = observer(() => {
  const toast = useToast();
  const { user } = useRootStore();
  const { selectProfileId } = user;
  const [incomingData, setIncoming] = useState([]);

  // local pagination
  const PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = ({ selected: selectedPage }: any) => {
    setCurrentPage(selectedPage);
  };
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(incomingData.length / PER_PAGE);

  // get incoming request api
  const fetchIncomingReq = async (auth: any) => {
    const incomingReq: any = await getIncomingRequest(selectProfileId, auth);
    if (incomingReq.code === 200) {
      // console.log(incomingReq.details.receiveReq)
      setIncoming(incomingReq.details.receiveReq);
    }
  };

  useEffect(() => {
    if (user.auth) {
      fetchIncomingReq(user.auth);
    }
  }, [selectProfileId]);

  // accept incoming request
  const acceptReqHandle = async (senderId: string) => {
    const res: any = await acceptReqInput(
      { receiverId: selectProfileId, senderId },
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
      fetchIncomingReq(user.auth);
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
  const rejectReqHandle = async (senderId: string) => {
    const res: any = await rejectReqInput(
      { receiverId: selectProfileId, senderId },
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
      fetchIncomingReq(user.auth);
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

  return (
    <Box>
      <>
        {!incomingData.length ? (
          <NotFoundWithImage
            title="Outgoing Request Not Found"
            imageUrl="/not_found/req.png"
          />
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
              {incomingData
                .slice(offset, offset + PER_PAGE)
                .map((data: any, index: number) => (
                  <Box boxShadow="md" bg="white" rounded="md" p="3px">
                    <Center>
                      <Avatar
                        h="120px"
                        w="120px"
                        name={data?.sender?.firstName}
                        src={ConvertAvatarUrl(data?.sender?.avatar) || 'd'}
                      />
                    </Center>

                    <Box
                      d="flex"
                      justifyContent="space-between"
                      mt="3"
                      px="5px"
                    >
                      <Text
                        color={golden}
                        style={{ fontWeight: 'bold' }}
                        fontSize={['18px', '18px', '18px', '19px']}
                      >
                        {data?.sender?.firstName}
                      </Text>
                      <Text color="green.500">
                        ({convertBirthDateToAge(data?.sender?.birthDate)} Years)
                      </Text>
                    </Box>
                    <HStack justifyContent="space-around" py="2">
                      <Box fontSize="14px">
                        <Text mt={2}>
                          {data?.sender?.weight}kg ,{data?.sender?.height} cm
                        </Text>
                        <Text mt={2}>{data?.sender?.religion}</Text>
                        <Text mt={2}>{data?.sender?.designation}</Text>
                      </Box>
                      <Box fontSize="14px">
                        <Text mt={2}>{data?.sender?.maritalStatus}</Text>
                        <Text mt={2}>{data.country}</Text>
                        <Text mt={2}>Not Specified</Text>
                      </Box>
                    </HStack>
                    <HStack justifyContent="space-around" my="2">
                      <Text fontSize="14px" my={2} textAlign="justify">
                        {data?.sender?.bio ? data.bio : 'No Bio'}
                      </Text>
                    </HStack>
                    <Center>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        my="2"
                      >
                        <Button
                          size="sm"
                          colorScheme="green"
                          variant="solid"
                          onClick={() => acceptReqHandle(data.senderId)}
                        >
                          Accept
                        </Button>

                        <Button
                          size="sm"
                          colorScheme="pink"
                          variant="solid"
                          onClick={() => rejectReqHandle(data.senderId)}
                        >
                          Reject
                        </Button>
                        <Link href={`/main/profile/match/${data.senderId}`}>
                          <Button
                            size="sm"
                            colorScheme="blue"
                            variant="outline"
                          >
                            <Text fontSize={['10px', '10px', '10px', '12px']}>
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
    </Box>
  );
});

export default IncomingRequestList;
