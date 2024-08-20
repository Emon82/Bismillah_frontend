import { useRootStore } from '@/models/root-store-provider';
import { observer } from 'mobx-react-lite';
import Footer from '@/components/footer';
import { useRouter } from 'next/router';
import { Dashboard } from '@/components/main/category/dashboard';
import Premium from '@/components/premium';
import { csBackground } from '@/themes/custom.color';
import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Unauthorizrd from '@/utils/UnAuthorize';
// import ChatList from '@/components/main/chat/ChatList';
// import { getProfile } from '@/api/profile/getProfile';
// import { getProfiledetails } from '@/api/profile/profile';
import PendingProfileUi from '@/utils/NotFoundWithImage';
import DashboardHeader from '../../components/dashboardHeader';
import DefaultDashboard from '../../components/main/DefaultDashboard';

const Index = observer(() => {
  const { user } = useRootStore();
  if (!user.details?.scopes.includes('USER')) {
    return <Unauthorizrd />;
  }

  if (user.profiles?.approval === 'Awaiting') {
    return (
      <PendingProfileUi
        title="Please wait while we approve"
        imageUrl="/not_found/pending.png"
      />
    );
  }

  

  return (
    <Box bg={csBackground}>
      {user && user.selectProfileId ? (
        <Box>
          <DashboardHeader />
          <Dashboard />
          {/* <Premium /> */}
        </Box>
      ) : (
        <Box>
          <DefaultDashboard />
        </Box>
      )}

      <Footer />
    </Box>
  );
});

export default Index;
