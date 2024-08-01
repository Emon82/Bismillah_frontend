import { useRootStore } from '@/models/root-store-provider';
import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Divider,
  Grid,
  GridItem,
  Text,
  Flex,
  Spacer,
  Link,
  Icon,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiEdit2 } from 'react-icons/fi';
import { GiLifeBar } from 'react-icons/gi';
import { golden } from '@/themes/custom.color';

const LifeStyleDetails = observer(() => {
  const { getProfileData } = useRootStore();
  const font = ['12px', '12px', '13x', '13px'];
  return (
    <div>
      <Grid
        p="3"
        borderWidth="1px"
        boxShadow="md"
        //  rounded="md"
        bg="white"
        borderBottom="5px solid #C1BEBD"
      >
        <Grid>
          <Flex py="2px">
            <Box display="flex">
              <Box
                h="7"
                w="7"
                textAlign="center"
                border="1px"
                borderColor={golden}
                borderRadius="50%"
              >
                <Icon as={GiLifeBar} color={golden} p="1px" />
              </Box>
              <Text
                color={golden}
                ml="5px"
                pt="2px"
                fontSize={['18px', '18px', '18px', '19px']}
              >
                Life Style
              </Text>
            </Box>
            <Spacer />
            <Box bg={golden} h="24px" w="53px" px="3px">
              <NextLink passHref href="/main/profile/edit">
                <Link to="/main">
                  <Text
                    color="white"
                    fontSize={['13px', '13px', '15px', '15px']}
                  >
                    <Icon as={FiEdit2} color="white" w={3} h={3} mr="2px" />
                    Edit
                  </Text>
                </Link>
              </NextLink>
            </Box>
          </Flex>
          <Divider colorScheme="golden" borderWidth="1px" mt="2px" />
          <Grid
            gridTemplateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
            direction={['column', 'row']}
            p="1"
          >
            <GridItem px={['5px', '12px', '50px', '50px']}>
              <Flex>
                <Box minW="50%">
                  <Text fontSize={font}>Diet</Text>
                  <Text fontSize={font}>Smoke</Text>
                  <Text fontSize={font}>Drink</Text>
                  <Text fontSize={font}>Height</Text>
                </Box>
                <Spacer />
                <Box minW="50%">
                  <Text fontSize={font}>: {getProfileData?.diet}</Text>
                  <Text fontSize={font}>
                    : {getProfileData?.smoke ? 'Yes' : 'No'}
                  </Text>
                  <Text fontSize={font}>
                    : {getProfileData?.drink ? 'Yes' : 'No'}
                  </Text>
                  <Text fontSize={font}>: {getProfileData?.height} (cm)</Text>
                </Box>
              </Flex>
            </GridItem>
            <GridItem px={['5px', '12px', '50px', '50px']}>
              <Flex>
                <Box minW="50%">
                  <Text fontSize={font}>Weight</Text>
                  <Text fontSize={font}>Body Type</Text>
                  <Text fontSize={font}>Skin Tone</Text>
                </Box>
                <Spacer />
                <Box minW="50%">
                  <Text fontSize={font}>: {getProfileData?.weight} (kg)</Text>
                  <Text fontSize={font}>: {getProfileData?.bodyType}</Text>
                  <Text fontSize={font}>: {getProfileData?.skinTone}</Text>
                </Box>
              </Flex>
            </GridItem>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
});
export default LifeStyleDetails;
