import React from 'react';
import { useRouter } from 'next/router';
import { useRootStore } from '@/models/root-store-provider';
import {
  Box,
  HStack,
  Image,
  Text,
  useToast,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuGroup,
  MenuItem,
} from '@chakra-ui/react';

const VendorHeader = () => {
  const toast = useToast();
  const router = useRouter();
  const { vendor } = useRootStore();
  const handleLogout = () => {
    vendor.logOut();
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
    <Box bg="white" px="10px">
      <HStack justifyContent="space-between">
        <Box cursor="pointer" onClick={() => router.push('/vendor')}>
          <Image
            maxW={['100px', '120px', '130px', '130px']}
            maxH={['50px', '60px', '80px', '80px']}
            objectFit="contain"
            ml={4}
            src="/logo/BM2.png"
            alt="Segun Adebayo"
          />
        </Box>
        <Box>
          <Text
            fontWeight="Bold"
            cursor="pointer"
            onClick={() => router.push('/vendor')}
          >
            Vendor Dashboard
          </Text>
        </Box>

        <HStack>
          <Text mr={['10px', '15px', '20px', '50px']}>
            <Menu>
              <MenuButton>
                <Avatar size="sm" name="Test" src="" />
              </MenuButton>
              <MenuList>
                <MenuGroup title="Setting">
                  <MenuItem onClick={() => router.push('/vendor/profile')}>
                    Edit Profile
                  </MenuItem>
                  <MenuItem onClick={() => router.push('/vendor/gallery')}>
                    Gallery
                  </MenuItem>
                  <MenuItem onClick={() => router.push('/vendor/account')}>
                    Account Setting
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default VendorHeader;
