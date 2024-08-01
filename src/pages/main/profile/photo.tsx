import Footer from '@/components/footer';
import { csBackground } from '@/themes/custom.color';
import { Box } from '@chakra-ui/react';
import React from 'react';
import DashboardHeader from '../../../components/dashboardHeader';
import Photo from '../../../components/main/category/myProfile/photo';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function MyProfile() {
  return (
    <Box bg={csBackground}>
      <DashboardHeader />
      <Box mt={2} mx={['0px', '0px', '70px', '200px']}>
        <Photo />
      </Box>
      <Footer />
    </Box>
  );
}

export default MyProfile;
