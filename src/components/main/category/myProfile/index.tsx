import { useRootStore } from '@/models/root-store-provider';
import { bgWhite, golden } from '@/themes/custom.color';
import NextLink from 'next/link';
import {
  Box,
  Divider,
  Flex,
  Grid,
  Icon,
  Text,
  Spacer,
  Link,
  SkeletonText,
  Container,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { FaPenNib } from 'react-icons/fa';
import Profile from './profile';
import Basic from './basic';
import FamilyDetails from './familyDetails';
import EducationAndCarierDetails from './educationAndCarierDetails';
import LifeStyleDetails from './lifeStyleDetails';

export const Myprofile = () => {
  const { getProfileData } = useRootStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Container maxW="container.lg">
      {loading ? (
        <Grid borderWidth="1px" boxShadow="md" bg="white">
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={20} spacing="4" />
          </Box>
        </Grid>
      ) : (
        <div>
          <Profile />
          <Text
            fontSize="2xl"
            color={golden}
            style={{ fontWeight: 'bold' }}
            py="8px"
          >
            Personal Information
          </Text>
          <Grid
            p="5"
            borderWidth="1px"
            boxShadow="md"
            bg="white"
            borderBottom="5px solid #C1BEBD"
          >
            <Box>
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
                    <Icon as={FaPenNib} color={golden} p="1px" />
                  </Box>
                  <Text
                    color={golden}
                    ml="5px"
                    pt="2px"
                    fontSize={['18px', '18px', '18px', '19px']}
                  >
                    In My Own Words
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
              <Text
                fontSize="15px"
                fontFamily="sans-serif"
                color="#393636"
                pt="10px"
                textAlign="justify"
              >
                {getProfileData?.bio}
              </Text>
            </Box>
          </Grid>

          <Box my="10px">
            <Basic />
          </Box>

          <Box my="10px">
            <FamilyDetails />
          </Box>

          <Box my="10px">
            <EducationAndCarierDetails />
          </Box>
          <Box my="10px">
            <LifeStyleDetails />
          </Box>
        </div>
      )}
    </Container>
  );
};
