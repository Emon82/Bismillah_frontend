import { bgGray } from '@/themes/custom.color';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import Connected from './Connected';
import IncommingRequest from './InCommingRequest';
import OutGoingRequest from './OutGoingReguest';
import Viewers from './Viewers';

const ConnectionComponent = () => (
  <Box bg={bgGray}>
    <Tabs isFitted variant="enclosed" panelId="3">
      <TabList bg="gray.50">
        <Tab fontSize={['11px', '13px', '13px', '13px']}>Connected</Tab>
        <Tab fontSize={['11px', '13px', '13px', '13px']}>Incoming Request</Tab>
        <Tab fontSize={['11px', '13px', '13px', '13px']}>Outgoing Request</Tab>
        <Tab fontSize={['11px', '13px', '13px', '13px']}>Viewers</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Connected />
        </TabPanel>
        <TabPanel>
          <IncommingRequest />
        </TabPanel>
        <TabPanel>
          <OutGoingRequest />
        </TabPanel>
        <TabPanel>
          <Viewers />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
);

export default ConnectionComponent;
