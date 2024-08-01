import { useRootStore } from '@/models/root-store-provider';
import { observer } from 'mobx-react-lite';
import { golden } from '@/themes/custom.color';
import {
  Box,
  Button,
  Center,
  Divider,
  Grid,
  GridItem,
  HStack,
  Icon,
  Stack,
  Text,
  Avatar,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import NotFoundWithImage from '../../../../utils/NotFoundWithImage';
import { getViewProfileList } from '../../../../api/connection/connection';
import ConvertAvatarUrl from '../../../../utils/convertAvatarUrl';
import convertBirthDateToAge from '../../../../utils/convertDateToAge';

const Viewers = observer(() => {
  const toast = useToast();
  const { user } = useRootStore();
  const { selectProfileId } = user;
  const [outGoingData, setOutGoingData] = useState([]);
  console.log(outGoingData);
  // local pagination
  const PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = ({ selected: selectedPage }: any) => {
    setCurrentPage(selectedPage);
  };
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(outGoingData.length / PER_PAGE);

  // fetch outgoing api
  const fetchViewProfileList = async (auth: any) => {
    const result: any = await getViewProfileList(selectProfileId, auth);
    console.log(result);

    // if (outgoingReq.code === 200) {
    //   // console.log(outgoingReq.details.sendReq)
    //   setOutGoingData(outgoingReq.details.sendReq);
    // }
  };

  useEffect(() => {
    if (user.auth) {
      fetchViewProfileList(user.auth);
    }
  }, [selectProfileId]);

  // cancel connect request handle
  //   const cancelConnectReqHandle = async (receiverId: string) => {
  //     const res: any = await deleteReqInput(
  //       { receiverId, senderId: selectProfileId },
  //       user.auth,
  //     );
  //     if (res.code === 200) {
  //       toast({
  //         title: 'Success',
  //         description: res.message,
  //         status: 'success',
  //         duration: 3000,
  //         isClosable: true,
  //         position: 'top-right',
  //       });
  //       fetchOutgoingReq(user.auth);
  //     } else {
  //       toast({
  //         title: 'Send failed',
  //         description: res.message,
  //         status: 'success',
  //         duration: 3000,
  //         isClosable: true,
  //         position: 'top-right',
  //       });
  //     }
  //   };

  return (
    <Box>
      <>
        {!outGoingData.length ? (
          <NotFoundWithImage
            title="Outgoing Request Not Found"
            imageUrl="/not_found/no-visitor.png"
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
              {outGoingData
                .slice(offset, offset + PER_PAGE)
                .map((data: any, index: number) => (
                  <Box boxShadow="md" bg="white" rounded="md" p="3px">
                    <Center>
                      <Avatar
                        h="120px"
                        w="120px"
                        name={data?.receiver?.firstName}
                        src={ConvertAvatarUrl(data?.receiver?.avatar) || 'd'}
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
                        {data?.receiver?.firstName}
                      </Text>
                      <Text color="green.500">
                        ({convertBirthDateToAge(data?.receiver?.birthDate)}{' '}
                        Years)
                      </Text>
                    </Box>
                    <HStack justifyContent="space-around" py="2">
                      <Box fontSize="14px">
                        <Text mt={2}>
                          {data?.receiver?.weight}kg ,{data?.receiver?.height}{' '}
                          cm
                        </Text>
                        <Text mt={2}>{data?.receiver?.religion}</Text>
                        <Text mt={2}>{data?.receiver?.designation}</Text>
                      </Box>
                      <Box fontSize="14px">
                        <Text mt={2}>{data?.receiver?.maritalStatus}</Text>
                        <Text mt={2}>{data.country}</Text>
                        <Text mt={2}>Not Specified</Text>
                      </Box>
                    </HStack>
                    <HStack justifyContent="space-around" my="2">
                      <Text fontSize="14px" my={2} textAlign="justify">
                        {data?.receiver?.bio ? data.bio : 'No Bio'}
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
                          //   onClick={() =>
                          //     cancelConnectReqHandle(data.receiver.id)
                          //   }
                        >
                          Cancel
                        </Button>

                        <Link href={`/main/profile/match/${data.receiverId}`}>
                          <Button
                            size="sm"
                            colorScheme="blue"
                            variant="outline"
                          >
                            <Text fontSize="13px">View profile</Text>
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

export default Viewers;
