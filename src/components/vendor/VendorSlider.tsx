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
import convertAvatarUrl from '@/utils/convertAvatarUrl';

const VendorSlider = ({
  businessType,
  title,
  id,
  image,
}: {
  businessType: string;
  title: string;
  id?: string;
  image?: string | null;
}) => (
  <>
    <Box
      mt="10px"
      marginX={2}
      borderWidth="2px"
      borderRadius="2xl"
      minH="120px"
      // bgImage="url('/banner/cover3.jpg')"
      bgImage={`url(${image})`}
      backgroundSize="cover"
      backgroundPosition="center"
      // objectFit="contain"
      // bgPosition={['center', 'contain']}
      bgRepeat="no-repeat"
      alt="image not found"
    />

    <Stack align="center" py="4px" mb="3px">
      <NextLink passHref href={`/details/${id}`}>
        <Link>
          <Button
            size="sm"
            rightIcon={<ArrowForwardIcon />}
            color={golden}
            colorScheme={golden}
            variant="outline"
          >
            {businessType}
          </Button>
        </Link>
      </NextLink>
    </Stack>
  </>
);

export default VendorSlider;
