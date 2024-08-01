import Footer from '@/components/footer';
// import { Search } from '@/components/main/category/search';
import Search from '@/components/main/category/search/Search';
import { csBackground } from '@/themes/custom.color';
import { Box } from '@chakra-ui/react';
import React from 'react';
import DashboardHeader from '../../components/dashboardHeader';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function MyProfile() {
  return (
    <Box bg={csBackground}>
      <DashboardHeader />
      <Box mt={2}>
        <Search />
      </Box>
      <Footer />
    </Box>
  );
}

export default MyProfile;
