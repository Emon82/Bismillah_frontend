import { Box, Text, Image } from '@chakra-ui/react';
import React from 'react';

const NotFound: React.FC<any> = ({ title, imageUrl }): JSX.Element => (
  <Box>
    <Box w="100%" display="flex" justifyContent="center" textAlign="center">
      <Image
        width={['200px', '200px', '300px', '400px']}
        textAlign="center"
        src={`${imageUrl}`}
        alt="marriage"
      />
    </Box>

    <Text
      textAlign="center"
      lineHeight="50px"
      font={['17px', '18px', '18px', '20px']}
      fontWeight="bold"
    >
      {' '}
      {title}
    </Text>
  </Box>
);

export default NotFound;
