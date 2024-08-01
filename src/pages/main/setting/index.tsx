import Footer from '@/components/footer';
import AccountSetting from '@/components/main/category/setting/AccountSetting';
import { csBackground } from '@/themes/custom.color';
import { Box } from '@chakra-ui/react';
import React from 'react';
import DashboardHeader from '../../../components/dashboardHeader';

function index() {
  return (
    <Box bg={csBackground}>
      <DashboardHeader />
      <Box py="50px">
        <AccountSetting />
      </Box>
      <Footer />
    </Box>
  );
}

export default index;
