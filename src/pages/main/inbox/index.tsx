import React from 'react';
// import Footer from '@/components/footer';
import { csBackground } from '@/themes/custom.color';
import { Box } from '@chakra-ui/react';
// import ChatList from '@/components/main/chat/ChatList';
import Inbox from '@/components/main/chat/inbox';
import DashboardHeader from '../../../components/dashboardHeader';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Index() {
  return (
    <Box bg={csBackground}>
      <DashboardHeader />
      <Box>
        <Inbox />
      </Box>
    </Box>
  );
}

export default Index;
