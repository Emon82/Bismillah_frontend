import Footer from '@/components/footer';
import { useRootStore } from '@/models/root-store-provider';
import { Header } from '@/components/header';
import TestimonialDetails from '@/components/testimonial-details';
import VendorSlider from '@/components/vendor/VendorSlider';
import { bgGray, golden } from '@/themes/custom.color';
import range from '@/utils/range';
import { filterInput } from '@/api/search/filter';
import { publicVendorList } from '@/api/vendor/vendor';
import {
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Heading,
  HStack,
  Image,
  Link,
  Select,
  Stack,
  Text,
  useBreakpointValue,
  GridItem,
  Flex,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
// import Link from 'next/link';
import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import convertAvatarUrl from '@/utils/convertAvatarUrl';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Special } from '../components/special';

const age = range(18, 85);

export default function Home() {
  const toast = useToast();
  const router = useRouter();

  const { user, vendor } = useRootStore();
  const [vendors, setvendors] = useState<any>([]);
  const [gender, setGender] = useState<string>('');
  const [ageFrom, setAgeFrom] = useState<string>('');
  const [ageTo, setAgeTo] = useState<string>('');
  const [religion, setReligion] = useState<string>('');
  const [maritalStatus, setMaritalStatus] = useState<string>('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [singnUpOpen, setSignUpOpen] = useState(false);

  const cardSliderResize = useBreakpointValue([100, 100, 50, 30]);

  const fetchVendors = async () => {
    const result: any = await publicVendorList();
    console.log(result);
    if (result.code === 200) {
      setvendors(result.details);
    }
  };
  useEffect(() => {
    fetchVendors();
  }, []);

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };
  const handleAgeFromChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAgeFrom(e.target.value);
  };
  const handleAgeToChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAgeTo(e.target.value);
  };
  const handleReligionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReligion(e.target.value);
  };
  const handleMaritalStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setMaritalStatus(e.target.value);
  };

  const genderList = [{ label: 'Male' }, { label: 'Female' }];

  interface HomeType {
    name: string;
    link: string;
  }
  const HelpLink: React.FC<HomeType> = ({ name, link }) => (
    <Center my={2}>
      <Link fontSize={['12px', '14px', '14px', '16px']} href={link}>
        {name}
      </Link>
    </Center>
  );

  const searchHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      if (!gender || !ageFrom || !ageTo || !religion || !maritalStatus) {
        return toast({
          title: 'Warning',
          description: 'Filed not be empty !!!',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (user?.details) {
        router.push(
          `/main/search?gender=${gender}&ageFrom=${ageFrom}&ageTo=${ageTo}&religion=${religion}&maritalStatus=${maritalStatus}`,
        );
      } else {
        return toast({
          title: 'Failed',
          description: 'Please Login',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }

      return null;
    },
    [gender, ageFrom, ageTo, religion, maritalStatus, toast],
  );

  return (
    <Box>
      <Head>
        <title>Bismillah Marriage</title>
        <link rel="icon" href="/logo/BM.png" />
      </Head>

      <Box
        h={['450px', '450px', '500px', '600px']}
        bgImage="url('/banner/cover1.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        // objectFit="contain"
        // bgPosition={['center', 'contain']}
        bgRepeat="no-repeat"
        alt="image not found"
      >
        <Box paddingX={['0px', '0px', '130px', '150px']}>
          <Header loginOpen={loginOpen} singnUpOpen={singnUpOpen} />

          <Grid
            // gridTemplateColumns="repeat(8, 1fr)"
            mt={['0px', '60px']}
            mr={['0px', '0px', '180px', '200px']}
            ml={['25px', '0px', '0px', '0px']}
          >
            <GridItem
              // colSpan={[10, 8, 5, 5]}
              bg="rgba(0,0,0, 0.4)"
              borderWidth="0.5px"
              borderColor="black"
              // bg="rgba(52, 52, 52, 0.7)"
              borderRadius={10}
              px="16px"
              py="15px"
              w={['200px', '360px']}
              // style={{ backgroundColor: rgba(0,0,0, 0.4)}}
            >
              <Box>
                <Grid>
                  <Stack
                    flexDirection="column"
                    justifyContent="space-around"
                    // alignItems="center"
                  >
                    <Text
                      color="white"
                      pt="4px"
                      fontSize={['14px', '16px', '16px', '16px']}
                    >
                      Gender
                    </Text>
                    <Select
                      variant="outline"
                      //  variant="flushed"
                      h={['22px', '30px', '30px', '30px']}
                      w="100%"
                      bg="white"
                      color="black"
                      value={gender}
                      onChange={handleGenderChange}
                      placeholder="Gender"
                    >
                      {genderList.map((i) => (
                        <option key={i.label} value={i.label}>
                          {i.label}
                        </option>
                      ))}
                    </Select>

                    <Text
                      color="white"
                      pt="4px"
                      fontSize={['14px', '16px', '16px', '16px']}
                    >
                      Religion
                    </Text>
                    <Select
                      //  variant="flushed"
                      h={['22px', '30px', '30px', '30px']}
                      w="100%"
                      bg="white"
                      color="black"
                      value={religion}
                      onChange={handleReligionChange}
                      placeholder="Religion"
                    >
                      <option value="Islam">Islam</option>
                      <option value="Christianity">Christianity</option>
                      <option value="Buddhism">Buddhism</option>
                      <option value="Hinduism">Hinduism</option>
                      <option value="Judaism">Judaism</option>
                      <option value="Other">Other</option>
                    </Select>

                    <Text
                      color="white"
                      pt="4px"
                      fontSize={['14px', '16px', '16px', '16px']}
                    >
                      Age
                    </Text>

                    <Stack direction={['column', 'row']} spacing="5px">
                      <Box>
                        <Select
                          w="163px"
                          h={['22px', '30px', '30px', '30px']}
                          bg="white"
                          color="black"
                          value={ageFrom}
                          onChange={handleAgeFromChange}
                          placeholder="Age From"
                        >
                          {age.map((i) => (
                            <option value={i} color="black" key={i.toString()}>
                              {i}
                            </option>
                          ))}
                        </Select>
                      </Box>
                      <Box>
                        <Select
                          h={['22px', '30px', '30px', '30px']}
                          w="163px"
                          bg="white"
                          color="black"
                          value={ageTo}
                          onChange={handleAgeToChange}
                          placeholder="Age To"
                        >
                          {age.map((i) => (
                            <option value={i} key={i.toString()}>
                              {i}
                            </option>
                          ))}
                        </Select>
                      </Box>
                    </Stack>

                    <Text
                      color="white"
                      pt="4px"
                      fontSize={['14px', '16px', '16px', '16px']}
                    >
                      Marital Status
                    </Text>
                    <Select
                      //  variant="flushed"
                      h={['22px', '30px', '30px', '30px']}
                      w="100%"
                      bg="white"
                      color="black"
                      value={maritalStatus}
                      onChange={handleMaritalStatusChange}
                      placeholder="Marital Status"
                      ml={5}
                    >
                      <option value="Never_Married">Never Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Awaiting_Divorce">Awaiting Divorce</option>
                    </Select>
                    <Box pt="10px">
                      <Button
                        variant="solid"
                        h={['25px', '30px', '30px', '35px']}
                        w="100%"
                        colorScheme="red"
                        bg={golden}
                        onClick={searchHandler}
                      >
                        <Text fontSize={[13, 16, 17, 17]} color="white">
                          SEARCH
                        </Text>
                      </Button>
                    </Box>
                  </Stack>
                </Grid>
              </Box>
            </GridItem>
            <GridItem colSpan={3} display="none" />
          </Grid>
        </Box>
      </Box>
      {/* works */}
      <Box bg={bgGray}>
        <Box py={[0, 3, 4, 6]}>
          <Box align="center" pt="3">
            <Heading fontSize={[18, 19, 20, 25]} color={golden}>
              How it Works
            </Heading>
            <Text fontSize={[14, 16, 17, 18]}>Get start in 3 simple steps</Text>
          </Box>
          <Flex
            color="black"
            // gridTemplateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']}
            // direction={['column', 'row']}
          >
            <Box flex="1" align="center" p="3">
              <Box
                height={['80px', '80px', '180px', '160px']}
                width={['80px', '80px', '180px', '160px']}
              >
                <Image
                  height="80%"
                  width="80%"
                  border="2px dotted"
                  borderColor={golden}
                  src="/work-process/step-01.png"
                  alt="marriage"
                  borderRadius="50%"
                />
              </Box>
              <Box>
                <Text
                  fontSize={['10px', '12px', '16px', '16px']}
                  color="black"
                  // textAlign="match-parent"
                >
                  Create an Account and Profile
                </Text>
              </Box>
            </Box>
            <Box flex="1" align="center" p="3">
              <Box
                height={['80px', '80px', '180px', '160px']}
                width={['80px', '80px', '180px', '160px']}
              >
                <Image
                  height="80%"
                  width="80%"
                  border="2px dotted"
                  borderColor={golden}
                  src="/work-process/step-02.png"
                  alt="marriage"
                  borderRadius="50%"
                />
              </Box>
              <Box>
                <Text fontSize={['10px', '12px', '16px', '16px']} color="black">
                  Select and Connect Your match
                </Text>
              </Box>
            </Box>
            <Box flex="1" align="center" p="3">
              <Box
                height={['80px', '80px', '180px', '160px']}
                width={['80px', '80px', '180px', '160px']}
              >
                <Image
                  height="80%"
                  width="80%"
                  border="2px dotted"
                  borderColor={golden}
                  src="/work-process/step-03.png"
                  alt="marriage"
                  borderRadius="50%"
                />
              </Box>
              <Box>
                <Text fontSize={['10px', '12px', '16px', '16px']} color="black">
                  Let The Journey Begin
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
      {/* countries */}
      {/* <Box bg={golden} py={['0px', '0px', '0px', '35px']}> */}
      <Box bg={golden} h="100%" p="4">
        <Flex color="white" pb="13px">
          <Box flex="1" align="center">
            <Text fontSize={['3xl', '3xl', '3xl', '5xl']}>100+</Text>
            <Text fontSize={['1xl', '2xl']}>Countries</Text>
          </Box>
          <Box flex="1" align="center">
            <Text fontSize={['3xl', '3xl', '3xl', '5xl']}>100%</Text>
            <Text fontSize={['1xl', '2xl']}>Authenticity Guaranteed</Text>
          </Box>
        </Flex>
      </Box>

      <Box bg={bgGray} paddingX={['10px', '35px', '50px', '150px']} pb="60px">
        <Center>
          <Heading
            my={['20px', '30px', '40px', '50px']}
            fontSize={['15px', '20px', '22px', '25px']}
          >
            Thousand of Success Stories
          </Heading>
        </Center>
        <Box bg={bgGray}>
          <Carousel
            autoPlay={true}
            centerMode={true}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            infiniteLoop={true}
            interval={2000}
            centerSlidePercentage={cardSliderResize}
          >
            <TestimonialDetails
              name="I knew instantly he was the guy for me"
              // title="View"
              image="/slider/ss1.jpg"
            />
            <TestimonialDetails
              name="His first day was also my first day."
              // title="View"
              image="/slider/ss3.jpg"
            />
            <TestimonialDetails
              name="We are so happy thanks to your site!"
              // title="View"
              image="/slider/ss2.jpg"
            />
            <TestimonialDetails
              name="It was romantic and surprisingly thrilling"
              // title="View"
              image="/slider/ss4.jpg"
            />
          </Carousel>
        </Box>
      </Box>
      <Box
        // minH={['280px', '280px', '350px', '327px']}
        // minH={['280px', '280px', '450px', '450px']}
        bgImage="url('/banner/cover3.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        // objectFit="contain"
        // bgPosition={['center', 'contain']}
        bgRepeat="no-repeat"
        alt="image not found"
        // bgImage="url('https://bbf.digital/wp-content/uploads/2016/11/SFA_4029-e1478096488511.jpg')"
        // objectFit="contain"
        // bgPosition={['center', 'contain']}
        // bgRepeat="no-repeat"
        // alt="image not found"
      >
        <Box bg="rgba(52, 52, 52, 0.7)" py={['50px', '30px', '125px', '125px']}>
          <Box paddingX={['10px', '35px', '50px', '150px']}>
            <Center>
              <Heading
                fontSize={['15px', '20px', '22px', '32px']}
                mb={10}
                color="white"
              >
                Marketplace
              </Heading>
            </Center>
            <Box borderRadius="50px" bg="rgba(52, 52, 52, 0.7)">
              <Carousel
                autoPlay={true}
                centerMode={true}
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                infiniteLoop={true}
                interval={2000}
                centerSlidePercentage={cardSliderResize}
              >
                {vendors.map((item: any) => (
                  <VendorSlider
                    businessType={item.businessType}
                    image={convertAvatarUrl(item?.image)}
                    title="Details"
                    id={item.id}
                  />
                ))}
              </Carousel>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box bg={bgGray} alignSelf="center" align="center">
        <Special />
      </Box>
      <Box
        // h={['320px', '400px', '500px', '450px']}
        // bgImage="url('/pray/dua5.jpg')"
        objectFit="contain"
        bgPosition={['center', 'contain']}
        bgRepeat="no-repeat"
        alt="image not found"
        boxShadow="md"
      >
        <Box
          bg="rgba(52, 52, 52, 0.7)"
          py={['60px', '40px', '40px', '40px']}
          //  bgImage="url('/banner/cover1.jpg')"
          //  backgroundSize="cover"
          //  backgroundPosition="center"

          //  bgRepeat="no-repeat"
          //  alt="image not found"
        >
          <Box paddingX={['10px', '35px', '50px', '150px']}>
            <Center>
              <Heading
                mb={['20px', '30px', '30px', '30px']}
                fontSize={['15px', '20px', '22px', '32px']}
                color="white"
              >
                About Us
              </Heading>
            </Center>
            <Text
              color="white"
              textAlign="justify"
              fontSize={['11px', '14px', '14px', '16px']}
              pb={['5px', '5px', '5px', '80px']}
            >
              Bismillah Marriage, The World&apos;s No.1 Matchmaking Service, was
              founded with a simple objective - to help people find happiness.
              Bismillah Marriage is a social networking site specialising in
              matchmaking and not just a matrimonial service. As a leader in
              what is sometimes known as the matrimony category, we have touched
              more than 35 million lives. Bismillah Marriage has always
              differentiated itself from other matrimonials through its
              innovation-led approach. By redefining the way Indian brides and
              grooms meet for marriage, Bismillah Marriage has created a
              world-renowned brand that has changed the way of finding a life
              partner.
            </Text>
          </Box>
        </Box>
      </Box>
      <Box bg={golden} color="white" py="4">
        <Text textAlign="center" fontSize={['md', 'lg', '2xl', '3xl']}>
          Download the App
        </Text>
        <HStack justify="center">
          <Link
            href="https://play.google.com/store/apps/details?id=design.starit.bm"
            isExternal={true}
          >
            <Image
              w={['75px', '90px', '110px', '150px']}
              objectFit="contain"
              src="/app/playstore-v2.png"
              alt="Dan Abramov"
            />
          </Link>
          <Image
            w={['75px', '90px', '110px', '150px']}
            objectFit="contain"
            ml={4}
            src="/app/appstore-v2.png"
            alt="Segun Adebayo"
          />
        </HStack>
      </Box>
      <Box bg={bgGray} paddingX={['10px', '20px', '80px', '150px']} py={5}>
        <Grid
          gridTemplateColumns={[
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
            'repeat(3, 1fr)',
          ]}
          gap={6}
        >
          <Box my={['0px', '10px', '30px', '40px']}>
            <Center mb={1}>
              <Text fontSize="xl">User</Text>
            </Center>
            <Divider colorScheme="pink" borderWidth="2px" />
            <Box my="10px" textAlign="center">
              <Text cursor="pointer" onClick={() => setLoginOpen(!loginOpen)}>
                User Login
              </Text>
              <Text
                cursor="pointer"
                onClick={() => setSignUpOpen(!singnUpOpen)}
              >
                User Registration
              </Text>
            </Box>
          </Box>
          <Box my={['0px', '10px', '30px', '40px']}>
            <Center mb={1}>
              <Text fontSize="xl">Vendor</Text>
            </Center>
            <Divider colorScheme="pink" borderWidth="2px" />
            <Box my="10px" textAlign="center">
              <Text cursor="pointer" onClick={() => setLoginOpen(!loginOpen)}>
                Vendor Login
              </Text>
              <Text
                cursor="pointer"
                onClick={() => setSignUpOpen(!singnUpOpen)}
              >
                Vendor Registration
              </Text>
            </Box>
          </Box>

          <Box my={['0px', '10px', '30px', '40px']}>
            <Center mb={1}>
              <Text fontSize="xl">Privacy & Policy</Text>
            </Center>
            <Divider colorScheme="pink" borderWidth="2px" />
            <Box my="10px" textAlign="center">
              <Link
                href="https://www.bismillahmarriage.com/privacy-policy"
                isExternal={true}
              >
                <Text>Privacy & Policy</Text>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}
