import Footer from '@/components/footer';
import { csBackground } from '@/themes/custom.color';
import { Box } from '@chakra-ui/react';
import React from 'react';
import EditProfile from '../../../components/main/category/myProfile/editProfile';
import DashboardHeader from '../../../components/dashboardHeader';

function MyProfile() {
  return (
    <Box bg={csBackground}>
      <DashboardHeader />
      <Box mt={2}>
        <EditProfile />
      </Box>
      <Footer />
    </Box>
  );
}

export default MyProfile;
