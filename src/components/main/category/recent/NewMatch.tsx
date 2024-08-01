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
import { sendConnectionInput } from '../../../../api/connection/connection';
import convertBirthDateToAge from '../../../../utils/convertDateToAge';
import ConvertAvatarUrl from '../../../../utils/convertAvatarUrl';
import dateFormate from '../../../../utils/isoStringToDateConverter';

const RecentMatch = () => {
  const toast = useToast();
  const router = useRouter();
  const { user } = useRootStore();
  const { selectProfileId, auth } = user;
  const [match, setNewmatch] = useState([]);

  // incoming request api
  const fetchNewMatch = async () => {
    // const result: any = await getIncomingRequest(selectProfileId, auth);
    // if (result.code === 200) {
    //   setNewmatch(result.details?.receiveReq);
    // }
  };

  useEffect(() => {
    if (auth) {
      fetchNewMatch();
    }
  }, [selectProfileId]);

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
      fetchNewMatch();
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
        Recent Match
      </Box>
      <Box>
        {!match.length ? (
          <Box textAlign="center">
            <Text lineHeight="200px">No Match</Text>
          </Box>
        ) : (
          <>
            {match.map((item: any, index) => (
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
                        colorScheme="teal"
                        size="xs"
                        onClick={() => sendConnectReqHandle(item.senderId)}
                      >
                        Connect
                      </Button>
                    </Stack>
                  </GridItem>
                </Grid>
              </Box>
            ))}
          </>
        )}
      </Box>

      {match.length ? (
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

export default RecentMatch;
