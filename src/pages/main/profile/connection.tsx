// import { useRootStore } from '@/models/root-store-provider';
import Footer from '@/components/footer';
import { csBackground } from '@/themes/custom.color';
import { Box } from '@chakra-ui/react';
import React from 'react';
import DashboardHeader from '../../../components/dashboardHeader';
import Connection from '../../../components/main/category/connection/Connection';

function ConnectionCom() {
  return (
    <Box bg={csBackground}>
      <DashboardHeader />
      <Box>
        <Connection />
      </Box>
      <Footer />
    </Box>
  );
}

export default ConnectionCom;
