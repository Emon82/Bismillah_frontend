import Footer from '@/components/footer';
import { csBackground, golden } from '@/themes/custom.color';
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
  Flex,
  Icon,
  Link,
  Spacer,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { GrGallery } from 'react-icons/gr';
import { publicVendorDetails, publicVendorGallery } from '@/api/vendor/vendor';
import GalleryViewe from '@/components/main/category/myProfile/photo/GalleryForViewer';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

function VendorDetails() {
  const router = useRouter();

  const [data, setVendordetails] = useState<any>({});
  const [galleryImage, setGalleryImage] = useState<any>([]);
  const [id, setId] = useState<any>([]);

  const fetchVendorDetails = async () => {
    const result: any = await publicVendorDetails(router.query?.id);
    console.log(result);
    if (result.code === 200) {
      setVendordetails(result.details);
    }
  };

  const fetchGallery = async () => {
    const result: any = await publicVendorGallery(router.query?.id);
    if (result.code === 200) {
      setGalleryImage(result.details?.images || []);
    }
  };

  useEffect(() => {
    if (router.query?.id) {
      fetchVendorDetails();
      fetchGallery();
    }
  }, [router.query?.id]);

  return (
    <Box bg={csBackground}>
      <Box mx={['10px', '50px', '100px', '200px']}>
        <HStack justifyContent="space-between">
          <Box>
            <NextLink passHref href="/">
              <Link>
                <Image
                  maxW={['100px', '120px', '130px', '150px']}
                  maxH={['50px', '60px', '80px', '80px']}
                  objectFit="contain"
                  ml={4}
                  src="/logo/BM2.png"
                  alt="Segun Adebayo"
                />
              </Link>
            </NextLink>
          </Box>
          <HStack>
            <NextLink passHref href="/">
              <Link>
                <Text mx={2}>Go To Home Page</Text>
              </Link>
            </NextLink>
          </HStack>
        </HStack>
      </Box>

      <Box mt={2} bg="white">
        {/* <Center>
          <Text fontFamily="initial" fontSize="28px">
            Welcome to {data?.companyName}.
          </Text>
        </Center> */}

        <Grid gap={2}>
          <GridItem colSpan={4} p={5} borderRadius={10}>
            <Heading as="h5" size="lg" fontFamily="initial">
              Business Details
            </Heading>

            <Text textAlign="justify">{data?.description}</Text>

            <Divider orientation="horizontal" my={5} />

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
                  <Center>
                    <GalleryViewe galleryImage={galleryImage} />
                  </Center>
                </Grid>
              </Grid>
            </Grid>

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
                    {data?.businessDays &&
                      data?.businessDays?.map((day: any, index: any) => (
                        <Text>
                          {day}
                          {index !== data?.businessDays?.length - 1 && ','}
                        </Text>
                      ))}
                  </Grid>

                  {data?.businessHours ? (
                    <Text>
                      Hours: {data?.businessHours[0]} To{' '}
                      {data?.businessHours[1]}
                    </Text>
                  ) : null}
                </Box>
              </Box>
            </Grid>

            {/* <Grid
              gridTemplateColumns={[
                'repeat(1, 1fr)',
                'repeat(1, 1fr)',
                'repeat(3, 1fr)',
                'repeat(3, 1fr)',
              ]}
              gap={6}
            >
              <Box my={['0px', '10px', '30px', '40px']}>
                <Center mb={3}>
                  <Text fontSize="xl">Business Info</Text>
                </Center>
                <Divider colorScheme="pink" borderWidth="2px" />
                <Box my={['10px', '10px', '25px', '30px']} textAlign="center">
                  <Text>Business Type: {data?.companyName}</Text>
                  <Text>Business Type: {data?.businessType}</Text>
                </Box>
              </Box>
              <Box my={['0px', '10px', '30px', '40px']}>
                <Center mb={3}>
                  <Text fontSize="xl">Company Address</Text>
                </Center>
                <Divider colorScheme="pink" borderWidth="2px" />
                <Box my={['0px', '5px', '25px', '30px']} textAlign="center">
                  <Text>State: {data?.state}</Text>
                  <Text>City: {data?.city}</Text>
                  <Text>Country: {data?.country}</Text>
                </Box>
              </Box>

              <Box my={['0px', '10px', '30px', '40px']}>
                <Center mb={3}>
                  <Text fontSize="xl">Business Time</Text>
                </Center>
                <Divider colorScheme="pink" borderWidth="2px" />
                <Box my={['0px', '10px', '25px', '30px']} textAlign="center">
                  <Text>
                    {' '}
                    Days:{' '}
                    {data?.businessDays &&
                      data?.businessDays.map((day: any) => <span>{day},</span>)}
                  </Text>
                  Hours:
                  {data?.businessHours ? (
                    <Text>
                      {data?.businessHours[0]} To {data?.businessHours[1]}{' '}
                    </Text>
                  ) : null}
                </Box>
              </Box>
            </Grid> */}
          </GridItem>
        </Grid>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default VendorDetails;
