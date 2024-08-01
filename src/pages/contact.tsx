import { SubHeader } from '@/components/sub-header';
import { bgGray } from '@/themes/custom.color';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Contact = () => (
  <Box bg="gray">
    <Box paddingX={['0px', '50px', '80px', '150px']}>
      <SubHeader />
    </Box>
    <Box bg={bgGray} paddingX={['10px', '35px', '50px', '150px']}>
      <Text>adsfadsjl fadskdjf</Text>
    </Box>
  </Box>
);

export default Contact;
