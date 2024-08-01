import Footer from '@/components/footer';
import { Myprofile } from '@/components/main/category/myProfile';
import { csBackground } from '@/themes/custom.color';
import { Box } from '@chakra-ui/react';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import DashboardHeader from '../../components/dashboardHeader';

function MyProfile() {
  return (
    <Box bg={csBackground}>
      <DashboardHeader />
      <Box mt={2}>
        <Myprofile />
      </Box>
      <Footer />
    </Box>
  );
}

export default MyProfile;
