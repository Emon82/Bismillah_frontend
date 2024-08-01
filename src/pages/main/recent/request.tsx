import Footer from '@/components/footer';
// import AccountSetting from '@/components/main/category/setting/AccountSetting';
import { csBackground } from '@/themes/custom.color';
import {
  Box,
  Grid,
  Spacer,
  StackDivider,
  Image,
  VStack,
  Center,
  Text,
  Stack,
  Button,
  GridItem,
  Divider,
} from '@chakra-ui/react';
import React from 'react';
import Recent from '@/components/main/category/recent/Index';
import DashboardHeader from '../../../components/dashboardHeader';

function index() {
  return (
    <Box bg={csBackground}>
      <DashboardHeader />
      <Box mt={2} p="2" boxShadow="dark-lg" bg="white">
        hi
      </Box>
      <Footer />
    </Box>
  );
}

export default index;
