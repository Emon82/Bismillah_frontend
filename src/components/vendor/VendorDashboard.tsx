import React, { useEffect } from 'react';
import NextLink from 'next/link';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/models/root-store-provider';
import { csBackground } from '@/themes/custom.color';
import { Box, Text, Link } from '@chakra-ui/react';
import { getVendorProfileInfo } from '@/api/vendor/vendor';
// import VendorHeader from './Header';
import DashboardBody from './DashboardBody';

const VendorDashboard = observer(() => {
  const { vendor } = useRootStore();

  const fetchData = async () => {
    const result: any = await getVendorProfileInfo(vendor.auth);
    if (result.code === 200) {
      vendor.addVendorProfile(result.details);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {vendor.profile?.companyName ? (
        <Box bg={csBackground} py="10px">
          <DashboardBody />
        </Box>
      ) : (
        <Box bg={csBackground} minH="500px">
          <NextLink passHref href="/vendor/profile">
            <Link>
              <Text lineHeight="500px" textAlign="center">
                No Data
              </Text>
            </Link>
          </NextLink>
        </Box>
      )}
    </div>
  );
});
export default VendorDashboard;
