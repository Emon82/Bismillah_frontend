// import { golden } from '@/themes/custom.color';
// import { ArrowForwardIcon } from '@chakra-ui/icons';
// import {
//   Box,
//   Button,
//   Heading,
//   Link,
//   Stack,
//   Text,
//   Image,
//   Center,
// } from '@chakra-ui/react';
// import React from 'react';
// import NextLink from 'next/link';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// interface Props {
//   type: string;
//   price: string;
//   duration: string;
//   proposals: string;
//   sendPropsal: string;
//   viewLimitation: string;
//   support: string;
// }

// function PriceList({
//   type,
//   price,
//   duration,
//   proposals,
//   sendPropsal,
//   viewLimitation,
//   support,
// }: Props) {
//   return (
//     <Box px={2} flex="1">
//       <Center>
//         <Image
//           src="/premium/dimond.png"
//           m="opx"
//           h={['100px', '80px', '70px', '80px']}
//           objectFit="cover"
//           fit="cover"
//           alt="dimond image not found"
//         />
//       </Center>
//       <Stack align="center">
//         <Heading fontSize={['sm', 'xl']}>{type}</Heading>
//         <Text fontSize={['11px', 'md']}>{price}</Text>
//         <Text fontSize={['11px', 'md']}>{duration}</Text>
//         <Text fontSize={['11px', 'md']}>{proposals}</Text>
//         <Text fontSize={['11px', 'md']} textAlign="center">
//           {sendPropsal}
//         </Text>
//         <Text fontSize={['11px', 'md']}>{viewLimitation}</Text>
//         <Text fontSize={['11px', 'md']}>{support}</Text>
//       </Stack>
//       <Stack align="center" my={4}>
//         <NextLink passHref href="/story">
//           <Link>
//             <Button
//               rightIcon={<ArrowForwardIcon />}
//               color={golden}
//               colorScheme={golden}
//               variant="outline"
//             >
//               Register Now
//             </Button>
//           </Link>
//         </NextLink>
//       </Stack>
//     </Box>
//   );
// }

// export default PriceList;

import { golden } from '@/themes/custom.color';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Grid,
  Button,
  Heading,
  Link,
  Stack,
  Text,
  Image,
  Center,
} from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Props {
  type: string;
  price: string;
  duration: string;
  proposals: string;
  sendPropsal: string;
  viewLimitation: string;
  support: string;
}

function PriceList({
  type,
  price,
  duration,
  proposals,
  sendPropsal,
  viewLimitation,
  support,
}: Props) {
  return (
    <div>
      <Box className="pricing-section">
        <Grid className="container">
          <Box className="outer-box">
            <Grid className="row">
              <Box
                className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
                data-wow-delay="800ms"
              >
                <Box className="inner-box">
                  <Box className="icon-box">
                    <Box className="icon-outer" bg="black">
                      <Center>
                        <Box mt="-3">
                          <Image
                            src="/premium/dimond.png"
                            border="5"
                            borderColor="black"
                            borderRadius="50%"
                            m="opx"
                            // h={['100px', '80px', '70px', '80px']}
                            objectFit="cover"
                            fit="cover"
                            alt="dimond image not found"
                          />
                        </Box>
                      </Center>
                    </Box>
                  </Box>
                  <Box>
                    <Stack align="center">
                      <Heading fontSize={['sm', 'xl']}>{type}</Heading>
                      <Text fontSize={['11px', 'md']}>{price}</Text>
                      <Text fontSize={['11px', 'md']}>{duration}</Text>
                      <Text fontSize={['11px', 'md']}>{proposals}</Text>
                      <Text fontSize={['11px', 'md']} textAlign="center">
                        {sendPropsal}
                      </Text>
                      <Text fontSize={['11px', 'md']}>{viewLimitation}</Text>
                      <Text fontSize={['11px', 'md']}>{support}</Text>
                    </Stack>
                  </Box>
                  {/* <div className="price-box">
                    <div className="title">Group Pass</div>
                    <h4 className="price">$199.99</h4>
                  </div> */}
                </Box>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </div>
  );
}

export default PriceList;
