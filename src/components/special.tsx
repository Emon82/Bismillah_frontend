import { signIn } from '@/api/auth/login';
import { golden } from '@/themes/custom.color';
import { sanitizePhone } from '@/utils/sanitizers';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, MouseEvent, useCallback, useRef, useState } from 'react';
import { BiTrophy } from 'react-icons/bi';
import { FaAward, FaSms } from 'react-icons/fa';
import { IoPeopleOutline } from 'react-icons/io5';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const Special = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<any>();
  const finalRef = useRef<any>();
  const toast = useToast();

  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const onChangeIdentity = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIdentity(event.target.value);
    },
    [],
  );
  const onChangePassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [],
  );

  const loginHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      setLoading(true);
      const res = await signIn(sanitizePhone(identity), password);
      setLoading(false);
      toast({
        title: 'Sign In Successful',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setIdentity('');
      setPassword('');
      // close();
      return console.log('login Handle pressed');
    },
    [identity, password, toast],
  );

  return (
    <Box {...props}>
      <Grid
        templateColumns={[
          'repeat(2, 1fr)',
          'repeat(2, 1fr)',
          'repeat(4, 1fr)',
          'repeat(4, 1fr)',
        ]}
        gap={6}
        bg={golden}
        p={5}
        paddingX={['20px', '50px', '100px', '150px']}
        h="200px"
      >
        <HStack>
          <Box
            // onClick={onOpen}
            as={FaAward}
            size="50px"
            color="white"
            overflow="hidden"
          />
          <Box my={5}>
            {/* <Link onClick={onOpen}> */}
            <Text
              fontSize={['11px', '14px', '14px', '18px']}
              mt={5}
              align="center"
              color="white"
            >
              100% verified profile with mobile numbers
            </Text>
            {/* </Link> */}
          </Box>
        </HStack>
        <HStack>
          <Box
            onClick={onOpen}
            as={IoPeopleOutline}
            size="60px"
            color="white"
            overflow="hidden"
          />
          <Box my={5}>
            <Text
              fontSize={['11px', '14px', '14px', '18px']}
              mt={5}
              align="center"
              color="white"
            >
              Connect with Matches you like
            </Text>
          </Box>
        </HStack>
        <HStack>
          <Box
            onClick={onOpen}
            as={FaSms}
            size="60px"
            color="white"
            overflow="hidden"
          />
          <Box my={5}>
            <Text
              fontSize={['11px', '14px', '14px', '18px']}
              mt={5}
              color="white"
              align="center"
            >
              Register for free & put up your Profile
            </Text>
          </Box>
        </HStack>
        <HStack>
          <Box
            // onClick={onOpen}
            as={BiTrophy}
            size="55px"
            color="white"
            overflow="hidden"
          />
          <Box my={5}>
            <Text
              fontSize={['11px', '14px', '14px', '18px']}
              mt={5}
              color="white"
              align="center"
            >
              Most Trusted Matrimony Brand
            </Text>
          </Box>
        </HStack>
      </Grid>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent color={golden}>
          <ModalHeader> Welcome back! Please Login </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Mobile no / Email ID</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter Mobile no / Email ID"
                onChange={onChangeIdentity}
                color={golden}
                colorScheme={golden}
                borderColor={golden}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Enter password"
                onChange={onChangePassword}
                type="password"
              />
              <Box justifyContent="space-between">
                <FormLabel mt={2} float="right">
                  Stay Logged in
                </FormLabel>
                <FormLabel mt={2}>Forgot password</FormLabel>
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Button colorScheme="blue" mr={3} onClick={loginHandler}>
              Login
            </Button>
            <Button onClick={onClose}>Sign up</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
