import { useRootStore } from '@/models/root-store-provider';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Image,
  Divider,
  Icon,
  Button,
  Center,
  useToast,
  HStack,
  Text,
  Grid,
  GridItem,
  Select,
  Avatar,
  Stack,
  AvatarBadge,
  Input,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { bgGray, golden } from '@/themes/custom.color';
import { FcSearch } from 'react-icons/fc';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsChatSquareDotsFill } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import UpgraeModal from '@/utils/UpgraeModal';

import { profileSearch } from '@/api/profile/profile';
import { matchData } from '@/api/utils/fakeData/matchFakeData';
import {
  sendConnectionInput,
  getOutGoingRequest,
  deleteReqInput,
} from '@/api/connection/connection';
import NotFound from '@/utils/NotFound';
import convertBirthDateToAge from '@/utils/convertDateToAge';
import ConvertAvatarUrl from '@/utils/convertAvatarUrl';
// import SearchLoading from './SearchLoading';

const Search = observer(() => {
  const toast = useToast();
  const router = useRouter();

  const { user } = useRootStore();
  const { auth, selectProfileId, addOutGoingRequest, outGoingRequest } = user;
  const BoxHeight = '330px';

  const [religion, setReligion] = useState(
    router.query.religion ? router.query.religion : '',
  );
  const [gender, setGender] = useState(
    router.query.gender ? router.query.gender : '',
  );
  const [maritalStatus, setMaterialStatus] = useState(
    router.query.maritalStatus ? router.query.maritalStatus : '',
  );
  const [incomeLow, setIncomeLow] = useState('');
  const [incomeHigh, setIncomeHigh] = useState('');
  const [smoke, setSmoke] = useState('No');
  const [drink, setDrink] = useState('No');
  const [heightLow, setHeightLow] = useState('');
  const [heightHigh, setHeightHigh] = useState('');
  const [weightLow, setWeightLow] = useState('');
  const [weightHigh, setWeightHigh] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const [ageFrom, setAgeFrom] = useState<any>(
    router.query.ageFrom ? router.query.ageFrom : null,
  );
  const [ageTo, setAgeTo] = useState<any>(
    router.query.ageTo ? router.query.ageTo : null,
  );

  const [searchData, setSearchData] = useState<any>([]);

  const PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = ({ selected: selectedPage }: any) => {
    setCurrentPage(selectedPage);
  };
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(searchData.length / PER_PAGE);

  const fetchData = async () => {
    const getOutgoingResult: any = await getOutGoingRequest(
      selectProfileId,
      auth,
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

  useEffect(() => {
    if (auth) {
      fetchData();
    }
  }, []);
  const submitSearchHandler = async () => {
    const submitData = {
      // profileId: selectProfileId,
      religion,
      ageFrom: ageFrom ? Number(ageFrom) : '',
      ageTo: ageTo ? Number(ageTo) : '',
      gender,
      maritalStatus,
      incomeLow: Number(incomeLow),
      incomeHigh: Number(incomeHigh),
      drink: drink === 'Yes',
      smoke: smoke === 'Yes',
      heightLow: Number(heightLow),
      heightHigh: Number(heightHigh),
      weightLow: Number(weightLow),
      weightHigh: Number(weightHigh),
      bodyType,
      skinTone,
    };

    const res: any = await profileSearch(submitData, auth);
    console.log(res);

    // loadingStopHandle()
    // setSearchData(matchData)
    if (res?.code === 200) {
      toast({
        title: 'Success',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setSearchData(res.details);
      return null;
    }

    return toast({
      title: 'Search Failed',
      description: res?.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  // send connect request handle
  const sendConnectReqHandle = async (receiverId: string) => {
    const res: any = await sendConnectionInput(
      { receiverId, senderId: selectProfileId },
      auth,
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
      auth,
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
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    if (router?.query?.gender) {
      submitSearchHandler();
    }
  }, []);

  return (
    <div>
      <Box bg="white" rounded="md" mx="10px">
        <Grid
          templateColumns={[
            'repeat(2, 1fr)',
            'repeat(4, 1fr)',
            'repeat(5, 1fr)',
            'repeat(5, 1fr)',
          ]}
          gap={1}
          flexDirection={['column', 'column', 'row', 'row']}
          px="10px"
        >
          <Box h="10">
            <Select
              variant="flushed"
              placeholder="Gender"
              color={golden}
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Any">Any</option>
            </Select>
          </Box>
          <Box h="10">
            <Input
              // size="sm"
              variant="flushed"
              type="number"
              placeholder="Age From"
              onChange={(e) => setAgeFrom(e.target.value)}
              value={ageFrom}
              color={golden}
            />
          </Box>

          <Box h="10">
            <Input
              // size="sm"
              variant="flushed"
              type="number"
              placeholder="Age To"
              onChange={(e) => setAgeTo(e.target.value)}
              value={ageTo}
              color={golden}
            />
          </Box>

          <Box h="10">
            <Select
              value={religion}
              variant="flushed"
              placeholder="Religion"
              onChange={(e) => setReligion(e.target.value)}
              color={golden}
            >
              <option value="Islam">Islam</option>
              <option value="Christianity">Christianity</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Judaism">Judaism</option>
              <option value="Any">Any</option>
            </Select>
          </Box>

          <Box h="10">
            <Select
              variant="flushed"
              placeholder="Marital Status"
              onChange={(e) => setMaterialStatus(e.target.value)}
              value={maritalStatus}
              color={golden}
            >
              <option value="Never_Married">Never Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
              <option value="Awaiting_Divorce">Awaiting Divorce</option>
              <option value="Any">Any</option>
            </Select>
          </Box>

          <Box h="10">
            <Input
              variant="flushed"
              type="number"
              placeholder="Height From (cm)"
              onChange={(e) => setHeightLow(e.target.value)}
              value={heightLow}
              color={golden}
            />
          </Box>
          <Box h="10">
            <Input
              variant="flushed"
              type="number"
              placeholder="Height To (cm)"
              onChange={(e) => setHeightHigh(e.target.value)}
              value={heightHigh}
              color={golden}
            />
          </Box>
          <Box h="10">
            <Input
              variant="flushed"
              type="number"
              placeholder="Weight From (kg)"
              onChange={(e) => setWeightLow(e.target.value)}
              value={weightLow}
              color={golden}
            />
          </Box>
          <Box h="10">
            <Input
              variant="flushed"
              type="number"
              placeholder="Weight Up (kg)"
              onChange={(e) => setWeightHigh(e.target.value)}
              value={weightHigh}
              color={golden}
            />
          </Box>
          <Box h="10">
            <Select
              variant="flushed"
              placeholder="Select Body type"
              onChange={(e) => setBodyType(e.target.value)}
              value={bodyType}
              color={golden}
            >
              <option value="Slim">Slim</option>
              <option value="Fat">Fat</option>
              <option value="Any">Any</option>
            </Select>
          </Box>
          <Box h="10">
            <Select
              variant="flushed"
              placeholder="Select Skin tone"
              onChange={(e) => setSkinTone(e.target.value)}
              value={skinTone}
              color={golden}
            >
              <option value="Fair">Fair</option>
              <option value="Honey">Honey</option>
              <option value="Ivory">Ivory</option>
              <option value="Black">Brown</option>
              <option value="Black">Dark</option>
              <option value="Any">Any</option>
            </Select>
          </Box>
          <Box h="10">
            <Select
              variant="flushed"
              placeholder="Smoke"
              color={golden}
              onChange={(e) => setSmoke(e.target.value)}
              value={smoke}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Any">Any</option>
            </Select>
          </Box>
          <Box h="10">
            <Select
              variant="flushed"
              placeholder="Drink"
              color={golden}
              onChange={(e) => setDrink(e.target.value)}
              value={drink}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Any">Any</option>
            </Select>
          </Box>

          <Box h="10">
            <Input
              variant="flushed"
              type="number"
              placeholder="Annual Income From(USD)"
              onChange={(e) => setIncomeLow(e.target.value)}
              value={incomeLow}
              color={golden}
            />
          </Box>
          <Box h="10">
            <Input
              variant="flushed"
              type="number"
              placeholder="Annual Income To(USD)"
              onChange={(e) => setIncomeHigh(e.target.value)}
              value={incomeHigh}
              color={golden}
            />
          </Box>
        </Grid>
        <Box textAlign="center" my="10px">
          <Button
            h="30px"
            w="300px"
            mb="8px"
            rightIcon={<FcSearch />}
            colorScheme={golden}
            variant="outline"
            onClick={() => submitSearchHandler()}
          >
            Search
          </Button>
        </Box>
      </Box>

      <Box m="3">
        {!searchData.length ? (
          <NotFound title="Result Not Found" />
        ) : (
          <>
            <Grid
              templateColumns={[
                'repeat(1, 1fr)',
                'repeat(2, 1fr)',
                'repeat(5, 1fr)',
                'repeat(5, 1fr)',
              ]}
              gap={3}
              flexDirection={['column', 'column', 'row', 'row']}
              // mx="15px"
            >
              {searchData.length &&
                searchData
                  .slice(offset, offset + PER_PAGE)
                  .map((data: any, index: number) => (
                    <Box
                      boxShadow="md"
                      bg="white"
                      // h="350px"
                      p="4"
                      rounded="md"
                    >
                      <Center>
                        <Avatar
                          h="120px"
                          w="120px"
                          name={data.firstName}
                          src={ConvertAvatarUrl(data.avatar) || ''}
                        />
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
                          {data.bio}
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
                              onClick={() => cancelConnectReqHandle(data.id)}
                            >
                              Cancel
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              colorScheme="green"
                              variant="solid"
                              onClick={() => sendConnectReqHandle(data.id)}
                            >
                              Connect
                            </Button>
                          )}
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
      </Box>
    </div>
  );
});

export default Search;
