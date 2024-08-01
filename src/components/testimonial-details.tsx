import { bgGray, golden } from '@/themes/custom.color';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  AspectRatio,
  Box,
  Button,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

const TestimonialDetails = ({
  name,
  // title,
  image,
}: {
  name: string;
  // title: string;
  image?: string;
}) => (
  <Box bg="white" marginX={2} borderWidth="2px" borderRadius="2xl">
    {image && (
      <NextLink passHref href="/#">
        <Link>
          <AspectRatio ratio={4 / 3}>
            <Box borderWidth="1px" borderRadius="2xl" p="0px">
              <Image src={image} w="100%" h="100%" />
            </Box>
          </AspectRatio>
        </Link>
      </NextLink>
    )}
    <Box my={5}>
      <Text fontSize={['sm', 'md', 'md']} textAlign="center">
        {name}
      </Text>
    </Box>
  </Box>
);

export default TestimonialDetails;
