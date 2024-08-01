import { useRootStore } from '@/models/root-store-provider';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { golden } from '@/themes/custom.color';
import {
  Box,
  Flex,
  Divider,
  Grid,
  GridItem,
  Text,
  Spacer,
  Link,
  Icon,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiEdit2 } from 'react-icons/fi';
import { TiDocumentText } from 'react-icons/ti';

const Basic = observer(() => {
  const { getProfileData } = useRootStore();
  const font = ['12px', '12px', '13x', '13px'];
  const birthDateFormater = (date: any) => {
    const format = date.split('T');
    console.log(format);
    return format[0];
  };
  return (
    <Grid
      p="3"
      borderWidth="1px"
      boxShadow="md"
      //  rounded="md"
      bg="white"
      borderBottom="5px solid #C1BEBD"
    >
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
            <Icon as={TiDocumentText} color={golden} p="1px" />
          </Box>
          <Text
            color={golden}
            ml="5px"
            pt="2px"
            fontSize={['18px', '18px', '18px', '19px']}
          >
            Basic
          </Text>
        </Box>
        <Spacer />
        <Box bg={golden} h="24px" w="53px" px="3px">
          <NextLink passHref href="/main/profile/edit">
            <Link to="/main">
              <Text color="white" fontSize={['13px', '13px', '15px', '15px']}>
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
              <Text fontSize={font}>Name</Text>
              <Text fontSize={font}>Gender</Text>
              <Text fontSize={font}>Date Of Birth</Text>
            </Box>
            <Spacer />
            <Box minW="50%">
              <Text fontSize={font}>: {getProfileData?.firstName}</Text>
              <Text fontSize={font}>: {getProfileData?.gender}</Text>
              <Text fontSize={font}>
                :{birthDateFormater(getProfileData?.birthDate)}
              </Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem px={['5px', '12px', '50px', '50px']}>
          <Flex>
            <Box minW="50%">
              <Text fontSize={font}>Religion</Text>
              <Text fontSize={font}>Marital Status</Text>
              <Text fontSize={font}>Contact Number</Text>
            </Box>
            <Spacer />
            <Box minW="50%">
              <Text fontSize={font}>: {getProfileData?.religion}</Text>
              <Text fontSize={font}>: {getProfileData?.maritalStatus}</Text>
              <Text fontSize={font}>: {getProfileData?.contact}</Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Grid>
  );
});

export default Basic;
