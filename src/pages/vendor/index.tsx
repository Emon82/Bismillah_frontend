import { useRootStore } from '@/models/root-store-provider';
import { observer } from 'mobx-react-lite';
import Footer from '@/components/footer';
import { Box } from '@chakra-ui/react';
import React from 'react';
import VendorHeader from '@/components/vendor/Header';
import VendorDashboard from '@/components/vendor/VendorDashboard';
import Unauthorizrd from '@/utils/UnAuthorize';

const Index = observer(() => {
  const { vendor } = useRootStore();
  if (!vendor.details?.scopes.includes('VENDOR')) {
    return <Unauthorizrd />;
  }

  return (
    <Box>
      <VendorHeader />
      <VendorDashboard />
      <Footer />
    </Box>
  );
});

export default Index;
