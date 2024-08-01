import React from 'react';
import { useRouter } from 'next/router';
import { useRootStore } from '@/models/root-store-provider';
import { Box, Button, HStack, Image, Text, useToast } from '@chakra-ui/react';
import { csBackground, golden, bgGray } from '@/themes/custom.color';
import DefaultDashboardHeader from './DefaultDashboardHeader';

const DefaultDashboard = () => {
  const toast = useToast();
  const router = useRouter();
  const { user } = useRootStore();
  // const handleLogout = () => {
  //   user.logOut();
  //   toast({
  //     title: 'Log out Successful',
  //     description: 'Log out success',
  //     status: 'success',
  //     duration: 3000,
  //     isClosable: true,
  //     position: 'top-right',
  //   });
  //   return router.push('/');
  // };
  return (
    <Box>
      <Box bg="white" boxShadow="dark-lg">
        <DefaultDashboardHeader />
      </Box>
      <Box h="500px" bg={bgGray}>
        <Box textAlign="center" lineHeight="500px">
          <Text
            color={golden}
            cursor="pointer"
            onClick={() => router.push('/main/profile/create')}
          >
            CREATE NEW PROFILE
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultDashboard;
