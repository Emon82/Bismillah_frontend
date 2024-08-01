import {
  Box,
  Grid,
  GridItem,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from '@chakra-ui/react';
import React from 'react';

const MatchLoading = () => (
  <>
    <Grid
      templateColumns={[
        'repeat(3, 1fr)',
        'repeat(3, 1fr)',
        'repeat(12, 1fr)',
        'repeat(12, 1fr)',
      ]}
      gap={4}
    >
      <GridItem colSpan={[6, 4]}>
        <Box my="2" boxShadow="sm" p="1" bg="#E0E0E0">
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        </Box>
        <Box my="2" boxShadow="sm" p="1" bg="#E0E0E0">
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        </Box>
        <Box my="2" boxShadow="sm" p="1" bg="#E0E0E0">
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        </Box>
      </GridItem>

      <GridItem colSpan={[6, 8]}>
        <Grid p="2" mb="3" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Grid>

        <Grid p="2" mb="3" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Grid>

        <Grid p="2" mb="3" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Grid>

        <Grid p="2" mb="3" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Grid>
      </GridItem>
    </Grid>
  </>
);

export default MatchLoading;
