import { useRootStore } from '@/models/root-store-provider';
import { golden } from '@/themes/custom.color';
import { observer } from 'mobx-react-lite';
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  Textarea,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import {
  getConnected,
  profileReportInput,
} from '../../../../api/profile/profile';
import { unfriendReqInput } from '../../../../api/connection/connection';
import NotFoundWithImage from '../../../../utils/NotFoundWithImage';
import convertBirthDateToAge from '../../../../utils/convertDateToAge';
import ConvertAvatarUrl from '../../../../utils/convertAvatarUrl';

const ConnectedList = observer(() => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useRootStore();
  const { selectProfileId } = user;
  const [connected, setConnected] = useState([]);
  const [reportType, setReportType] = useState('');
  const [details, setDetails] = useState('');
  const [reportedUserId, setReportedUserId] = useState('');
  const [reportedProfile, setReportedProfile] = useState('');

  // local pagination
  const PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = ({ selected: selectedPage }: any) => {
    setCurrentPage(selectedPage);
  };
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(connected.length / PER_PAGE);

  // fetch my connected profile
  const fetchMyConnection = async (auth: any) => {
    const myConnected: any = await getConnected(auth, selectProfileId);
    if (myConnected.code === 200) {
      setConnected(myConnected.details);
    }
  };

  useEffect(() => {
    if (user.auth) {
      fetchMyConnection(user.auth);
    }
  }, [selectProfileId]);

  // unfriend my connection
  const unriendReqhandle = async (senderId: string) => {
    const res: any = await unfriendReqInput(
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
      fetchMyConnection(user.auth);
    } else {
      toast({
        title: 'Send Failed',
        description: res.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  //  modal handle
  const openReportModal = (id: string, profileId: string) => {
    setReportedUserId(id);
    setReportedProfile(profileId);
    onOpen();
  };

  // report api handle
  const reportSubmit = async () => {
    if (reportType === '') {
      return toast({
        title: 'Send Failed',
        description: 'Please select Report Type',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    const res: any = await profileReportInput(
      { reportType, details, reportedUserId, reportedProfile },
      user.auth,
    );
    // console.log(res)
    if (res.code === 201) {
      toast({
        title: 'Success',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    } else {
      toast({
        title: 'Send Failed',
        description: res.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    return null;
  };
  return (
    <Box>
      <>
        {!connected.length ? (
          <NotFoundWithImage
            title="Outgoing Request Not Found"
            imageUrl="/not_found/friends.png"
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
              {connected
                .slice(offset, offset + PER_PAGE)
                .map((data: any, index: number) => (
                  <Box boxShadow="md" bg="white" rounded="md" p="3px">
                    <Center>
                      <Avatar
                        h="120px"
                        w="120px"
                        name={data.firstName}
                        src={ConvertAvatarUrl(data.avatar) || 'd'}
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
                        <Button
                          size="sm"
                          colorScheme="red"
                          variant="solid"
                          onClick={() => unriendReqhandle(data.id)}
                        >
                          Unfriend
                        </Button>

                        <Link href={`/main/profile/match/${data.id}`}>
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
                        <Button
                          onClick={() => {
                            openReportModal(data.userId, data.id);
                          }}
                          size="sm"
                          colorScheme="red"
                          variant="outline"
                        >
                          <Text fontSize={['10px', '10px', '10px', '12px']}>
                            Report
                          </Text>
                        </Button>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Report This Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text textAlign="justify" mb="5">
              We take steps to ensure that only genuine profiles are listed at
              our site, however on occasions some slip past us. Please help us
              eliminate any duplicate or fake profiles by letting us know if you
              spot something that is suspicious.
            </Text>

            <FormControl>
              <FormLabel>Report Type</FormLabel>
              <Select
                variant="flushed"
                placeholder="Select report Type"
                onChange={(e) => {
                  setReportType(e.target.value);
                }}
                value={reportType}
              >
                <option value="Harassment">Harassment</option>
                <option value="Fraud">Fraud</option>
                <option value="Spam">Spam</option>
                <option value="Inappropriate_Content">
                  Inappropriate_Content
                </option>
                <option value="Harmful">Harmful</option>
                <option value="Impersonation">Impersonation</option>
                <option value="Offensive">Offensive</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Comment (Optional)</FormLabel>
              <Textarea
                size="md"
                placeholder="Write Something "
                onChange={(e) => {
                  setDetails(e.target.value);
                }}
                value={details}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={() => reportSubmit()}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
});

export default ConnectedList;
