import { useRootStore } from '@/models/root-store-provider';
import {
  Box,
  Grid,
  Spacer,
  Text,
  Stack,
  Button,
  Avatar,
  GridItem,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  getIncomingRequest,
  acceptReqInput,
  rejectReqInput,
} from '../../../../api/connection/connection';
import convertBirthDateToAge from '../../../../utils/convertDateToAge';
import ConvertAvatarUrl from '../../../../utils/convertAvatarUrl';
import dateFormate from '../../../../utils/isoStringToDateConverter';

const Index = () => {
  const toast = useToast();
  const router = useRouter();
  const { user } = useRootStore();
  const { selectProfileId } = user;
  const [incoming, setIncoming] = useState([]);

  // incoming request api
  const fetchIncomingReq = async (auth: any) => {
    const result: any = await getIncomingRequest(selectProfileId, auth);
    if (result.code === 200) {
      if (result.details) {
        setIncoming(result.details?.receiveReq);
      }
    }
  };

  useEffect(() => {
    if (user.auth) {
      fetchIncomingReq(user.auth);
    }
  }, [selectProfileId]);

  // accept request api
  const acceptReqHandle = async (senderId: string) => {
    const res: any = await acceptReqInput(
      { receiverId: selectProfileId, senderId },
      user.auth,
    );
    // console.log(res)
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
    // console.log(selectProfileId, senderId)
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
    <div>
      <Box p="3" borderBottom="1px">
        Recent Request
      </Box>
      <Box>
        {!incoming.length ? (
          <Box textAlign="center">
            <Text lineHeight="200px">No Request</Text>
          </Box>
        ) : (
          <>
            {incoming.map((item: any, index) => (
              <Box p="3" borderBottom="1px">
                <Grid display="flex">
                  <GridItem>
                    <Box textAlign="center" mr="6px">
                      <Avatar
                        h="40px"
                        w="40px"
                        name={item.sender.firstName}
                        src={ConvertAvatarUrl(item.sender.avatar) || ''}
                      />
                    </Box>
                  </GridItem>
                  <Spacer />
                  <GridItem pt={['2px', '1px', '2px', '5px']}>
                    <Text fontSize={['12px', '12px', '12px', '14px']}>
                      {item?.sender.firstName}
                    </Text>

                    <Text fontSize={['9px', '8px', '8px', '10px']}>
                      ({convertBirthDateToAge(item?.sender.birthDate)},Years),
                      {item?.sender.height}, {item?.sender.city},
                      {item?.sender.country}
                    </Text>
                  </GridItem>
                  <Spacer />

                  <GridItem pt={['5px', '1px', '2px', '13px']}>
                    <Text fontSize={['8px', '12px', '12px', '12px']}>
                      {dateFormate(item.sender.created)}
                    </Text>
                  </GridItem>
                  <Spacer />

                  <GridItem pt={['5px', '1px', '2px', '13px']}>
                    <Stack spacing={1} direction="row">
                      <Button
                        colorScheme="red"
                        size="xs"
                        onClick={() => rejectReqHandle(item.senderId)}
                      >
                        Reject
                      </Button>
                      <Button
                        colorScheme="teal"
                        size="xs"
                        onClick={() => acceptReqHandle(item.senderId)}
                      >
                        Accept
                      </Button>
                    </Stack>
                  </GridItem>
                </Grid>
              </Box>
            ))}
          </>
        )}
      </Box>

      {incoming.length ? (
        <Box paddingTop="30px">
          <Text
            textAlign="center"
            fontWeight="bold"
            fontSize="13px"
            color="red"
            cursor="pointer"
            onClick={() => router.push('/main/profile/connection')}
          >
            View All
          </Text>
        </Box>
      ) : null}
    </div>
  );
};

export default Index;
