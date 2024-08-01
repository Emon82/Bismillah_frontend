import {
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Matches() {
  return (
    <>
      <Grid
        templateColumns={['repeat(3, 1fr)', 'repeat(8, 1fr)']}
        gap={1}
        px={[10, 2, 5, 5]}
      >
        <GridItem colSpan={[1, 2, 2, 2]} alignSelf="center">
          <Box textAlign="center">
            <Image
              boxSize={['30px', '30px', '40px', '50px']}
              objectFit="contain"
              src="/slider/a.jpg"
              alt="Segun Adebayo"
              borderWidth="5px"
              borderRadius="200px"
            />
          </Box>
        </GridItem>
        <GridItem colSpan={[1, 4, 4, 4]} alignSelf="center">
          <Center>
            <Text fontSize={['12px', '12px', '12px', '14px']}>
              Princes Fiona
            </Text>
          </Center>
          <Text fontSize={['8px', '8px', '8px', '10px']} textAlign="center">
            21 yars, 5&apos;4, bengali,Dhaka,Not working
          </Text>
        </GridItem>
        <GridItem colSpan={[1, 2, 2, 2]}>
          <Center>
            <Icon as={AiOutlineCheckCircle} color="green.500" w={8} h={8} />
          </Center>
          <Center>
            <Text fontSize={['8px', '6px', '6px', '10px']}>Connect Now</Text>
          </Center>
        </GridItem>
      </Grid>
      <Divider my={2} borderWidth="1px" />
    </>
  );
}

export default Matches;
