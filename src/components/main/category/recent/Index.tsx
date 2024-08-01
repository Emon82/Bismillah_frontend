import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import NewMatch from './NewMatch';
import RecentRequest from './RecentRequest';

const Index = () => {
  const a = '';
  return (
    <Grid
      // h="250px"
      templateColumns={[
        'repeat(1, 1fr)',
        'repeat(1, 1fr)',
        'repeat(2, 1fr)',
        'repeat(2, 1fr)',
      ]}
      flexDirection={['column', 'column', 'row', 'row']}
      gap={3}
    >
      <GridItem boxShadow="md" bg="white" borderRadius="lg">
        <RecentRequest />
      </GridItem>
      <GridItem boxShadow="md" bg="white" borderRadius="lg">
        <NewMatch />
      </GridItem>
    </Grid>
  );
};

export default Index;
