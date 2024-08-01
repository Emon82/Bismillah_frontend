import { useRouter } from 'next/router';
import PriceList from '@/components/price-list';
import { golden } from '@/themes/custom.color';
import { Box, Button, Center, Flex, Grid, Heading } from '@chakra-ui/react';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Premium() {
  const router = useRouter();
  return (
    <>
      <Box
        boxShadow="dark-lg"
        bg="white"
        mx={['10px', '50px', '80px', '65px']}
        py="5px"
      >
        <Center mt={5} mb={7}>
          <Heading fontSize={['12px', '12px', '20px', '20px']}>
            Select Membership Package
          </Heading>
        </Center>
        <Flex
          templateColumns={[
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            'repeat(4, 1fr)',
          ]}
          paddingX={['20px', '50px', '80px', '120px']}
          direction={['column', 'column', 'row', 'row']}
          gap={['15px', '20px']}
          mb="10px"
        >
          <Box
            flex="1"
            m="5"
            border="1px"
            borderRadius="5px"
            borderColor={golden}
          >
            <PriceList
              type="Silver"
              price="$ 1000.00"
              duration="Duration 180 Days"
              proposals="Total 50 Proposals"
              sendPropsal="Send Per Day 4 Proposals"
              viewLimitation="Contact View Limit 10"
              support="24/7 Customer Support"
            />

            <Box textAlign="center">
              <Button onClick={() => router.push('/main/upgrade/cart')}>
                Register
              </Button>
            </Box>
          </Box>
          <Box
            flex="1"
            m="5"
            border="1px"
            borderRadius="5px"
            borderColor={golden}
          >
            <PriceList
              type="Golden"
              price="$ 2500.00"
              duration="Duration 180 Days"
              proposals="Total 50 Proposals"
              sendPropsal="Send Per Day 4 Proposals"
              viewLimitation="Contact View Limit 10"
              support="24/7 Customer Support"
            />
          </Box>
          <Box
            flex="1"
            m="5"
            border="1px"
            borderRadius="5px"
            borderColor={golden}
          >
            <PriceList
              type="Platinum"
              price="$ 3500.00"
              duration="Duration 180 Days"
              proposals="Total 50 Proposals"
              sendPropsal="Send Per Day 4 Proposals"
              viewLimitation="Contact View Limit 10"
              support="24/7 Customer Support"
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Premium;
