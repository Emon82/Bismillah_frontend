import { useRootStore } from '@/models/root-store-provider';
import { observer } from 'mobx-react-lite';
import Footer from '@/components/footer';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import React from 'react';
import Unauthorizrd from '@/utils/UnAuthorize';
import VendorHeader from '@/components/vendor/Header';
import CreateProfile from '@/components/vendor/CreateVendorprofile';

const Index = observer(() => {
  const { vendor } = useRootStore();
  if (!vendor.details?.scopes.includes('VENDOR')) {
    return <Unauthorizrd />;
  }

  return (
    <Box>
      <VendorHeader />
      <Box pb="30px">
        <CreateProfile />
      </Box>

      <Footer />
    </Box>
  );
});

export default Index;
