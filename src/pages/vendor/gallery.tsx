import { useRootStore } from '@/models/root-store-provider';
import { observer } from 'mobx-react-lite';
import Footer from '@/components/footer';
import { Box } from '@chakra-ui/react';
import React from 'react';
import VendorHeader from '@/components/vendor/Header';
import VendorGallery from '@/components/vendor/gallery/index';
import Unauthorizrd from '@/utils/UnAuthorize';

const Gallery = observer(() => {
  const { vendor } = useRootStore();
  if (!vendor.details?.scopes.includes('VENDOR')) {
    return <Unauthorizrd />;
  }

  return (
    <Box>
      <VendorHeader />
      <VendorGallery />
      <Footer />
    </Box>
  );
});

export default Gallery;
