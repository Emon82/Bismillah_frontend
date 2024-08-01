import React from 'react';
import { Box } from '@chakra-ui/react';
import CreateProfile from '@/components/main/category/myProfile/createProfile';
import Footer from '@/components/footer';
import DefaultDashboardHeader from '../../../components/main/DefaultDashboardHeader';

const CreateProfilePage = () => (
  <Box>
    <Box bg="white" boxShadow="md">
      <DefaultDashboardHeader />
    </Box>
    <Box>
      <CreateProfile />
    </Box>
    <Footer />
  </Box>
);

export default CreateProfilePage;
