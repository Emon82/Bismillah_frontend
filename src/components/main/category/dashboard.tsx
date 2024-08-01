import { useRootStore } from '@/models/root-store-provider';
import { bgWhite, golden } from '@/themes/custom.color';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  Link,
  Image,
  Avatar,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { FaLock } from 'react-icons/fa';
import { AiFillCloseSquare } from 'react-icons/ai';
import { MdVerifiedUser } from 'react-icons/md';
import { GoUnverified } from 'react-icons/go';
import { BiEdit } from 'react-icons/bi';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ConvertAvatarUrl from '@/utils/convertAvatarUrl';
import { getConnected } from '@/api/profile/profile';
import {
  getIncomingRequest,
  acceptReqInput,
  rejectReqInput,
} from '@/api/connection/connection';
import { baseUrl } from '../../../constants/api';
import Recent from './recent/Index';
import ImproveProfileBanner from '../../improveProfileBanner';

export const Dashboard = observer(() => {
  const { user, getProfileData } = useRootStore();
  const router = useRouter();
  const [connectedCount, setConnectedCount] = useState(0);
  const [pendingInvitationCount, setPendingInvitationCount] = useState(0);
  const [recentVisitorCount, setRecentVisitorCount] = useState(0);
  const { selectProfileId, loadSelectedProfile } = user;

  useEffect(() => {
    loadSelectedProfile(selectProfileId);
    const fetchData = async (auth: any) => {
      const res: any = await getConnected(auth, selectProfileId);
      if (res.code === 200) {
        if (res.details) {
          setConnectedCount(res.details.length);
        }
      }
      const result: any = await getIncomingRequest(selectProfileId, auth);
      if (result.code === 200) {
        if (result.details) {
          setPendingInvitationCount(result.details.receiveReq.length);
        }
      }
    };
    if (user.auth) {
      fetchData(user.auth);
    }
  }, [selectProfileId]);

  return (
    <>
      <Flex
        templateColumns={[
          'repeat(3, 1fr)',
          'repeat(3, 1fr)',
          'repeat(12, 1fr)',
          'repeat(12, 1fr)',
        ]}
        gap={4}
        mx={['0px', '0px', '80px', '65px']}
        flexDirection={['column', 'column', 'row', 'row']}
      >
        <Box
          flex="1"
          mr={['1px', '1px', '3pc', '10px']}
          mt="10"
          colSpan={[6, 3]}
          boxShadow="md"
          bg="white"
          borderRadius="lg"
          // px="5px"
        >
          <Box
            bgImage="url('https://thumbs.dreamstime.com/b/d-wallpaper-background-decoration-design-wall-high-n-floral-photo-mural-163063382.jpg')"
            backgroundSize="cover"
            backgroundPosition="center"
            bgRepeat="no-repeat"
            alt="image not found"
            h="100px"
            w="100%"
            color="white"
            borderBottom="1px"
          />

          <Box w="100%" mt="-60px">
            <Center>
              <Avatar
                h="120px"
                w="120px"
                //  size="2xl"
                mt="10px"
                name={getProfileData?.firstName}
                src={ConvertAvatarUrl(getProfileData?.avatar) || ''}
              />
            </Center>
          </Box>
          <Box textAlign="center" pt="5px">
            <Text mt="1" color={golden} fontSize={[15, 18]} fontWeight="bold">
              {`${getProfileData?.firstName} ${getProfileData?.lastName}`}
            </Text>
            <Box as="span" color="gray.600" fontSize="sm">
              {getProfileData?.designation}
            </Box>
            <Box>
              <Grid textAlign="center" px="2">
                <Box pl="3">
                  <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                    Connected
                  </Text>
                  <Text as="span" color="gray.600" fontSize="sm">
                    {connectedCount}+
                  </Text>
                </Box>
              </Grid>
            </Box>
          </Box>
          <Box px="8px">
            <Divider my={4} borderWidth="1px" />
            <Box px={[5, 10, 1, 1]}>
              <Stack
                direction={['row']}
                spacing="10px"
                justifyContent="space-between"
              >
                <Text fontSize="16px">Account Type</Text>
                <Box>
                  <Button
                    variant="solid"
                    flex="1"
                    size="sm"
                    disabled={user.profiles?.approval.includes('Rejected')}
                    colorScheme="pink"
                    bg="#D366C4"
                    onClick={() => router.push('/main/upgrade')}
                  >
                    {user.details?.scopes.includes('PREMIUM')
                      ? 'Plan Details'
                      : 'Upgrade Your Plan'}
                  </Button>
                </Box>
              </Stack>
              <Text fontSize="14px">
                {user.details?.scopes.includes('PREMIUM')
                  ? 'Premium MemberShip'
                  : 'Free MemberShip'}
              </Text>
            </Box>

            <Divider my={4} borderWidth="1px" />
            <Box px={[5, 10, 1, 1]} py="3px">
              <Stack
                direction="row"
                spacing="10px"
                justifyContent="space-between"
              >
                <Text fontSize="16px" color="green.500">
                  Profile Status
                </Text>
                <Box mr="10px" pb="3">
                  {(() => {
                    switch (user.profiles?.approval) {
                      case 'Awaiting':
                        return (
                          <Text fontSize="16px" color="red.500">
                            Awaiting
                            <Icon
                              as={GoUnverified}
                              ml="2px"
                              color="red.500"
                              w={5}
                              h={5}
                            />
                          </Text>
                        );
                      case 'Correction':
                        return (
                          <>
                            <NextLink passHref href="/main/profile/edit">
                              <Link to="/main">
                                <Text fontSize="16px" color="red.500">
                                  Correction
                                  <Icon
                                    as={BiEdit}
                                    ml="2px"
                                    color="red.500"
                                    w={5}
                                    h={5}
                                  />
                                </Text>
                              </Link>
                            </NextLink>
                          </>
                        );

                      case 'Rejected':
                        return (
                          <Text fontSize="16px" color="red.500">
                            Rejected
                            <Icon
                              as={AiFillCloseSquare}
                              ml="2px"
                              color="red.500"
                              w={5}
                              h={5}
                            />
                          </Text>
                        );
                      case 'Approved':
                        return (
                          <Text fontSize="16px" color="green.500">
                            Approved
                            <Icon
                              as={MdVerifiedUser}
                              ml="2px"
                              color="green.500"
                              w={5}
                              h={5}
                            />
                          </Text>
                        );

                      default:
                        return null;
                    }
                  })()}
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box flex="3" colSpan={[6, 6]}>
          <Text
            my={2}
            ml="8px"
            color={golden}
            fontSize={[15, 18]}
            fontWeight="bold"
          >
            My active summary
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap={3} h="100px">
            <Box
              w="auto"
              bg={bgWhite}
              pt="20px"
              boxShadow="md"
              borderRadius="lg"
            >
              <Center color={golden}>
                <Heading fontSize={['15px', '20px', '22px', '22px']}>
                  {pendingInvitationCount}
                  {/* <Icon as={FaLock} color="green.500" w={4} h={4} /> */}
                </Heading>
              </Center>
              <Text
                textAlign="center"
                fontSize={['11px', '14px', '14px', '12px']}
              >
                {pendingInvitationCount > 0
                  ? 'Pending Invitation'
                  : 'No Pending Invitation'}
              </Text>
            </Box>
            <Box
              w="auto"
              bg={bgWhite}
              pt="20px"
              boxShadow="md"
              borderRadius="lg"
            >
              <Center color={golden}>
                <Heading fontSize={['15px', '20px', '22px', '22px']}>
                  {connectedCount}
                  {/* <Icon as={FaLock} color="green.500" w={4} h={4} /> */}
                </Heading>
              </Center>
              <Text
                textAlign="center"
                fontSize={['11px', '14px', '14px', '12px']}
              >
                {connectedCount > 0
                  ? 'Accepted Invitation'
                  : 'No Accepted Invitation'}
              </Text>
            </Box>
            <Box
              w="auto"
              bg={bgWhite}
              pt="20px"
              boxShadow="md"
              borderRadius="lg"
            >
              <Center color={golden}>
                <Heading fontSize={['15px', '20px', '22px', '22px']}>
                  {recentVisitorCount}
                  {/* <Icon as={FaLock} color="green.500" w={4} h={4} /> */}
                </Heading>
              </Center>
              <Text
                textAlign="center"
                fontSize={['11px', '14px', '14px', '12px']}
              >
                {recentVisitorCount > 0
                  ? 'Recent Visitors'
                  : 'No Recent Visitors'}
              </Text>
            </Box>
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap={3} h="100px" mt={3}>
            <Box
              w="auto"
              bg={bgWhite}
              pt="20px"
              boxShadow="md"
              borderRadius="lg"
            >
              <Center color={golden}>
                <Heading fontSize={['15px', '20px', '22px', '22px']}>
                  <Icon as={FaLock} color="green.500" w={4} h={4} />
                </Heading>
              </Center>
              <Text
                textAlign="center"
                fontSize={['11px', '14px', '14px', '12px']}
              >
                Contact viewed
              </Text>
            </Box>
            <Box
              w="auto"
              bg={bgWhite}
              pt="20px"
              boxShadow="md"
              borderRadius="lg"
            >
              <Center color={golden}>
                <Heading fontSize={['15px', '20px', '22px', '22px']}>
                  <Icon as={FaLock} color="green.500" w={4} h={4} />
                </Heading>
              </Center>
              <Text
                textAlign="center"
                fontSize={['11px', '14px', '14px', '12px']}
              >
                Contact viewed
              </Text>
            </Box>
            <Box
              w="auto"
              bg={bgWhite}
              pt="20px"
              boxShadow="md"
              borderRadius="lg"
            >
              <Center color={golden}>
                <Heading fontSize={['15px', '20px', '22px', '22px']}>
                  <Icon as={FaLock} color="green.500" w={4} h={4} />
                </Heading>
              </Center>
              <Text
                textAlign="center"
                fontSize={['11px', '14px', '14px', '12px']}
              >
                Chats initialized
              </Text>
            </Box>
          </Grid>
          <Grid mt={4}>
            <ImproveProfileBanner />
          </Grid>
        </Box>
      </Flex>

      <Box mx={['0px', '0px', '80px', '66px']} my="10px">
        <Recent />
      </Box>
    </>
  );
});
