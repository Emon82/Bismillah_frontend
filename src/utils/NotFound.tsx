import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const NotFound: React.FC<any> = ({ title, link }): JSX.Element => (
  <>
    <Box minH="400px">
      <Text
        textAlign="center"
        lineHeight="400px"
        font={['17px', '18px', '18px', '20px']}
        fontWeight="bold"
      >
        {' '}
        {title}
      </Text>
    </Box>
  </>
);

export default NotFound;
