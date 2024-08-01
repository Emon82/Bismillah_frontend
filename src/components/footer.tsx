import React from 'react';
import { golden } from '@/themes/custom.color';
import {
  Box,
  Divider,
  Link,
  Text,
  HStack,
  IconButton,
  Center,
} from '@chakra-ui/react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaFacebook, FaPinterest, FaTwitter } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io5';
import { AiFillInstagram } from 'react-icons/ai';

function Footer() {
  return (
    <Box
      py={10}
      textAlign="center"
      bg={golden}
      px={['50px', '80px', '100px', '150px']}
      h="260px"
    >
      <Text fontSize={['12px', '15px', '20px', '25px']} textColor="snow">
        Connect with us!
      </Text>
      <Divider my={5} />

      <Center>
        <HStack>
          <Link
            href=" https://www.facebook.com/Bismillah-marriage-113107280816864"
            isExternal={true}
          >
            <IconButton
              colorScheme={golden}
              aria-label="Call Segun"
              fontSize="40px"
              icon={<FaFacebook />}
              mx={[3, 5]}
            />
          </Link>

          <Link href="https://twitter.com/Bismillah_Marr" isExternal={true}>
            <IconButton
              colorScheme={golden}
              aria-label="Call Segun"
              fontSize="40px"
              icon={<FaTwitter />}
              mx={[3, 5]}
            />
          </Link>
          <Link
            href="https://www.instagram.com/bismillah.marriage"
            isExternal={true}
          >
            <IconButton
              colorScheme={golden}
              aria-label="Call Segun"
              fontSize="40px"
              icon={<AiFillInstagram />}
              mx={[3, 5]}
            />
          </Link>

          <Link
            href="https://www.youtube.com/channel/UCV47vdTXe3pDfey-QBD6ahA"
            isExternal={true}
          >
            <IconButton
              colorScheme={golden}
              aria-label="Call Segun"
              fontSize="40px"
              icon={<IoLogoYoutube />}
              mx={[3, 5]}
            />
          </Link>

          <Link
            href="https://www.pinterest.com/bismillahmarriage/"
            isExternal={true}
          >
            <IconButton
              colorScheme={golden}
              aria-label="Call Segun"
              fontSize="40px"
              icon={<FaPinterest />}
              mx={[3, 5]}
            />
          </Link>
        </HStack>
      </Center>

      <Text pt={8} textColor="snow" fontSize={['12px', '15px', '20px', '18px']}>
        © 1996-2021 Bismillah Marriage, The World &lsquo;s No.1 Matchmaking
        Service™
      </Text>
    </Box>
  );
}

export default Footer;
