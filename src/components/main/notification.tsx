import {
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  Image,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Notification() {
  return (
    <>
      <Grid
        templateColumns={['repeat(3, 1fr)', 'repeat(8, 1fr)']}
        gap={1}
        px={[10, 2, 2, 2]}
        justifyContent="space-around"
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
        <GridItem colSpan={[2, 4, 4, 6]} alignSelf="center">
          <Center>
            <Text fontSize={['12px', '12px', '12px', '14px']}>
              Angelina Joli
            </Text>
          </Center>
          <Center>
            <Text fontSize={['8px', '8px', '8px', '10px']} textAlign="center">
              21 yars, 5&apos;4, bengali,Dhaka,Not working
            </Text>
          </Center>
        </GridItem>
      </Grid>
      <Divider my={2} borderWidth="1px" />
    </>
  );
}

export default Notification;
