import Footer from '@/components/footer';
import { MyMatch } from '@/components/main/category/matches';
import { csBackground } from '@/themes/custom.color';
import { Box } from '@chakra-ui/react';
import React from 'react';
import DashboardHeader from '../../../../components/dashboardHeader';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function MyProfile() {
  return (
    <Box bg={csBackground}>
      <DashboardHeader />
      <Box mt={2}>
        <MyMatch />
      </Box>
      <Footer />
    </Box>
  );
}

export default MyProfile;
