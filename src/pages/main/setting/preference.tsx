import Footer from '@/components/footer';
import PreferenceSetting from '@/components/main/category/setting/preferenceSetting';
import { csBackground } from '@/themes/custom.color';
import { Box } from '@chakra-ui/react';
import React from 'react';
import DashboardHeader from '../../../components/dashboardHeader';

function index() {
  return (
    <Box bg={csBackground}>
      <DashboardHeader />
      <Box py="20px">
        <PreferenceSetting />
      </Box>
      <Footer />
    </Box>
  );
}

export default index;
