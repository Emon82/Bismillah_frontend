import { useRootStore } from '@/models/root-store-provider';
import { observer } from 'mobx-react-lite';
import Footer from '@/components/footer';
import { Box } from '@chakra-ui/react';
import React from 'react';
import Unauthorizrd from '@/utils/UnAuthorize';
import VendorHeader from '@/components/vendor/Header';
import AccountSetting from '@/components/vendor/AccountSetting';

const Index = observer(() => {
  const { vendor } = useRootStore();
  if (!vendor.details?.scopes.includes('VENDOR')) {
    return <Unauthorizrd />;
  }

  return (
    <Box>
      <VendorHeader />
      <AccountSetting />
      <Footer />
    </Box>
  );
});

export default Index;
