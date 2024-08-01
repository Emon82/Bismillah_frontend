import { Box, Avatar, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const MatchSlider = ({
  id,
  name,
  image,
}: {
  id: string;
  name: string;
  image?: any;
}) => {
  const a = 'f';
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="#AFAEA6"
      borderRadius="lg"
      h="140px"
      m="5px"
    >
      <Box>
        <Avatar
          // cursor="pointer"
          h="60px"
          w="60px"
          mt="4px"
          name={name}
          src={image}
        />
      </Box>
      <Box>
        <Text pb="2px" fontWeight="bold">
          {name}
        </Text>
        <Text pb="2px" fontSize="10px" color="gray">
          Suggestions For You
        </Text>
        <Link href={`/main/profile/match/${id}`}>
          <Button h="20px" colorScheme="blue" variant="outline">
            <Text fontSize="10px">View profile</Text>
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default MatchSlider;
