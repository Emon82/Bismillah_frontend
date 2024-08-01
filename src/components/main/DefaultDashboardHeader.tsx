import React from 'react';
import { useRouter } from 'next/router';
import { useRootStore } from '@/models/root-store-provider';
import { Box, HStack, Image, Text, Icon, useToast } from '@chakra-ui/react';
import { GrLogout } from 'react-icons/gr';
import { golden } from '@/themes/custom.color';

const DefaultDashboard = () => {
  const toast = useToast();
  const router = useRouter();
  const { user } = useRootStore();
  const handleLogout = () => {
    user.logOut();
    toast({
      title: 'Log out Successful',
      description: 'Log out success',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
    return router.push('/');
  };
  return (
    <Box mx={['50px', '70px', '80px', '100px']}>
      <HStack justifyContent="space-between">
        <Box cursor="pointer" onClick={() => router.push('/main')}>
          <Image
            maxW={['100px', '120px', '130px', '130px']}
            maxH={['50px', '60px', '80px', '80px']}
            objectFit="contain"
            ml={4}
            src="/logo/BM2.png"
            alt="Segun Adebayo"
          />
        </Box>
        <HStack>
          <Icon
            as={GrLogout}
            cursor="pointer"
            color={golden}
            w={6}
            h={46}
            onClick={() => handleLogout()}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default DefaultDashboard;
