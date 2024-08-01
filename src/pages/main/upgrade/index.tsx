import { useRootStore } from '@/models/root-store-provider';
import { observer } from 'mobx-react-lite';
import Footer from '@/components/footer';
import { csBackground } from '@/themes/custom.color';
import { Box } from '@chakra-ui/react';
import React from 'react';
import DashboardHeader from '@/components/dashboardHeader';
import CreateSubscription from '@/components/main/Subscription/CreateSubscription';
import SubscriptionDetails from '@/components/main/Subscription/SubscriptionDetails';

const Index = observer(() => {
  const { user } = useRootStore();
  const accountType = user.details?.scopes.includes('PREMIUM');

  return (
    <Box bg={csBackground}>
      <DashboardHeader />
      <Box my="50px">
        {!accountType ? <CreateSubscription /> : <SubscriptionDetails />}
      </Box>

      <Footer />
    </Box>
  );
});

export default Index;
