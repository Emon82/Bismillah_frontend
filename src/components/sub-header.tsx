import { signIn } from '@/api/auth/login';
import { passReset } from '@/api/auth/reset';
import { resendOTP, signUp, updatePassword, verify } from '@/api/auth/signUp';
import { pattern } from '@/constants/validation';
import { useRootStore } from '@/models/root-store-provider';
import { golden } from '@/themes/custom.color';
import { sanitizePhone } from '@/utils/sanitizers';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  SystemProps,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useRef,
  useState,
} from 'react';

export const SubHeader = (props: SystemProps) => {
  const { onOpen } = useDisclosure();
  const { user } = useRootStore();

  const initialRef = useRef<any>();
  const finalRef = useRef<any>();

  const toast = useToast();
  const router = useRouter();

  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const [resetPhoneNo, setResetPhoneNo] = useState('');
  const [updateOTP, setUpdateOTP] = useState('');
  const [updatePass, setUpdatePass] = useState('');
  const [updateConfPass, setUpdateConfPass] = useState('');

  const [isSignIn, setSignIn] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [isPassReset, setPassReset] = useState(false);
  const [isUpdatePass, setIsUpdatePass] = useState(false);

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
      if (!identity || !password) {
        return toast({
          title: 'Warning',
          description: 'Identy / Password filed not be empyt !!!!',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      const res = await signIn(sanitizePhone(identity), password);
      if (res?.status === 200) {
        user.logIn(res.details);
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
        return router.push('/main');
      }
      if (res?.status === 404) {
        return toast({
          title: 'Sign In faild',
          description: res?.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      return console.log(res.message);
    },
    [identity, password, toast, router, user],
  );

  const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const onChangeEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const onChangePhone = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  }, []);

  const signUpHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      if (!name || !email || !phone || !password) {
        return toast({
          title: 'Warning',
          description: 'All filed are required !!!!',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (email !== 'undefined') {
        if (!pattern.test(email)) {
          return toast({
            title: 'Registration faild',
            description: 'Email id invalid',
            status: 'warning',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        }
      }

      const res = await signUp(name, email, sanitizePhone(phone), password);
      console.log(res);

      if (res?.code === 201) {
        toast({
          title: 'Sign Up Successful',
          description: res.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });

        setSignUp(false);
        setSignIn(false);
        setIsVerify(true);

        setName('');
        setEmail('');
        setPassword('');
      }

      if (res?.status === 422) {
        return toast({
          title: 'Registration faild',
          description: 'Email or Phone no already registered',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (res?.status === 400) {
        return toast({
          title: 'Registration faild',
          description: res.message,
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      return console.log(res);
    },
    [name, email, password, phone, toast],
  );

  const onChangeOtp = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
  }, []);

  const otpReqHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      if (!otp) {
        return toast({
          title: 'Warning',
          description: 'OTP filed are required !!!!',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      const verifyResponse: any = await verify(sanitizePhone(phone), otp);

      if (verifyResponse?.code === 200) {
        user.logIn(verifyResponse.details);
        toast({
          title: 'OTP Verification Successful',
          description: verifyResponse.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        // setPhone('');
        // setOtp('');
        return router.push('/main');
      }

      if (verifyResponse?.code === 404) {
        return toast({
          title: 'OTP Verification Failed',
          description: verifyResponse.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (verifyResponse?.code === 400) {
        return toast({
          title: 'OTP Verification Failed',
          description: verifyResponse.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      return console.log(verifyResponse);
    },
    [phone, toast, otp, router, user],
  );

  const resendOTPHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();

      const resendOtpRes = await resendOTP(sanitizePhone(phone));
      console.log(resendOtpRes);

      if (resendOtpRes?.code === 200) {
        toast({
          title: `${phone} new OTP send`,
          description: resendOtpRes.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        // setPhone('');
        // setOtp('');
        // return router.push('/main');
        return console.log(resendOtpRes);
      }

      if (resendOtpRes?.code !== 200) {
        return toast({
          title: 'OTP Request Failed',
          description: resendOtpRes.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      return console.log(resendOtpRes);
    },
    [phone, toast],
  );

  const onChangeResetPhone = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setResetPhoneNo(event.target.value);
    },
    [],
  );

  const passResetHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();

      const passResetRes = await passReset(sanitizePhone(resetPhoneNo));
      console.log(passResetRes);

      if (passResetRes?.code === 200) {
        toast({
          title: `${resetPhoneNo} OTP send`,
          description: passResetRes.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setIsUpdatePass(true);
        return console.log(passResetRes);
      }

      if (passResetRes?.code !== 200) {
        return toast({
          title: 'OTP Request Failed',
          description: passResetRes.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      return console.log(passResetRes);
    },
    [toast, resetPhoneNo],
  );

  const onChangeOTPUpdate = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUpdateOTP(event.target.value);
    },
    [],
  );

  const onChangeUpdatePass = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUpdatePass(event.target.value);
    },
    [],
  );

  const onChangeConfUpdatePass = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUpdateConfPass(event.target.value);
    },
    [],
  );

  const updatePassHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      if (!updateOTP || !updatePass || !updateConfPass) {
        return toast({
          title: 'Warning',
          description: 'filed shuld not be empyt !!!!',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      const res = await updatePassword(
        sanitizePhone(resetPhoneNo),
        updateOTP,
        updatePass,
      );
      if (res?.code === 200) {
        user.logIn(res.details);
        toast({
          title: 'Password Update Successful',
          description: res.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        return router.push('/main');
      }
      if (res?.code !== 200) {
        return toast({
          title: 'Sign In faild',
          description: res?.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      return console.log(res.message);
    },
    [resetPhoneNo, user, router, toast, updatePass, updateConfPass, updateOTP],
  );

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      px={5}
      py={5}
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <NextLink passHref href="/">
          <Link>
            <Image
              maxW={['100px', '120px', '130px', '180px']}
              objectFit="contain"
              src="/logo/BM3.png"
              alt="Segun Adebayo"
            />
          </Link>
        </NextLink>
      </Flex>

      <Box alignItems="center" flexGrow={1}>
        <Stack direction="row-reverse" spacing={4}>
          <Button
            display={{
              base: 'none',
              sm: 'none',
              md: 'block',
              lg: 'block',
            }}
            onClick={() => {
              setSignIn(false);
              setSignUp(true);
            }}
            rightIcon={<ChevronDownIcon />}
            colorScheme="white"
            variant="unstyled"
            style={{ color: 'black' }}
          >
            Sign Up
          </Button>
          <Button
            display={{
              base: 'none',
              sm: 'none',
              md: 'block',
              lg: 'block',
            }}
            onClick={() => {
              setSignUp(false);
              setSignIn(true);
            }}
            rightIcon={<ChevronDownIcon />}
            colorScheme="white"
            variant="unstyled"
            style={{ color: 'black' }}
          >
            Login
          </Button>
          <Button
            display={{
              base: 'none',
              sm: 'none',
              md: 'block',
              lg: 'block',
            }}
            onClick={onOpen}
            rightIcon={<ChevronDownIcon />}
            colorScheme="white"
            variant="unstyled"
            style={{ color: 'black' }}
          >
            Vendor SignUp
          </Button>
          <Button
            display={{
              base: 'none',
              sm: 'none',
              md: 'block',
              lg: 'block',
            }}
            rightIcon={<ChevronDownIcon />}
            colorScheme="white"
            style={{ color: 'black' }}
            variant="unstyled"
          >
            Vendor Login
          </Button>
          <Box>
            <Menu>
              <MenuButton
                display={{
                  base: 'block',
                  sm: 'block',
                  md: 'none',
                  lg: 'none',
                }}
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                size="xs"
                variant="outline"
              />
              <MenuList bg="silver">
                <MenuItem
                  onClick={() => {
                    setSignUp(false);
                    setSignIn(true);
                  }}
                >
                  Login
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setSignIn(false);
                    setSignUp(true);
                  }}
                >
                  Sign Up
                </MenuItem>
                <MenuItem onClick={onOpen}>Vendor Login</MenuItem>
                <MenuItem onClick={onOpen}>Vendor SignUp</MenuItem>
              </MenuList>
            </Menu>
          </Box>

          {isSignIn && (
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isSignIn}
              onClose={() => {
                setSignIn(false);
              }}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader> Welcome back! Please Login </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Mobile no / Email ID</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder="Enter Mobile no / Email ID"
                      onChange={onChangeIdentity}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      placeholder="Enter password"
                      type="password"
                      onChange={onChangePassword}
                    />
                    <Box justifyContent="space-between">
                      <FormLabel mt={5}>
                        <Button
                          color={golden}
                          size="sm"
                          variant="link"
                          onClick={() => {
                            setSignIn(false);
                            setSignUp(false);
                            setIsVerify(false);
                            setPassReset(true);
                          }}
                        >
                          Forgot password
                        </Button>
                      </FormLabel>
                    </Box>
                  </FormControl>
                </ModalBody>

                <ModalFooter justifyContent="center">
                  <Box borderWidth="1px">
                    <Button
                      bg={golden}
                      color="white"
                      colorScheme="red"
                      size="lg"
                      width="200px"
                      onClick={loginHandler}
                    >
                      Login
                    </Button>
                  </Box>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}

          {isSignUp && (
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isSignUp}
              onClose={() => {
                setSignUp(false);
              }}
            >
              <ModalOverlay />
              <ModalContent color={golden}>
                <ModalHeader> Welcome To Sign Up Interface </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder="ex.Jone doe"
                      onChange={onChangeName}
                      color={golden}
                      colorScheme={golden}
                      borderColor={golden}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Email id</FormLabel>
                    <Input
                      ref={initialRef}
                      type="email"
                      placeholder="test@test.com"
                      color={golden}
                      colorScheme={golden}
                      borderColor={golden}
                      onChange={onChangeEmail}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Phone no</FormLabel>
                    <Input
                      ref={initialRef}
                      type="tel"
                      placeholder="+8801760 __ __ __ __ __ __"
                      onChange={onChangePhone}
                      color={golden}
                      colorScheme={golden}
                      borderColor={golden}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      placeholder="Enter password"
                      type="password"
                      onChange={onChangePassword}
                    />
                    <Box justifyContent="space-between">
                      <FormLabel mt={5}>
                        <Button
                          color={golden}
                          size="sm"
                          variant="link"
                          onClick={() => {
                            setSignIn(false);
                            setSignUp(false);
                            setIsVerify(false);
                            setPassReset(true);
                          }}
                        >
                          Forgot password
                        </Button>
                      </FormLabel>
                    </Box>
                  </FormControl>
                </ModalBody>

                <ModalFooter justifyContent="center">
                  <Box borderWidth="1px">
                    <Button
                      bg={golden}
                      color="white"
                      colorScheme="red"
                      size="lg"
                      width="200px"
                      onClick={signUpHandler}
                    >
                      Sign up
                    </Button>
                  </Box>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}

          {isVerify && (
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isVerify}
              onClose={() => {
                setIsVerify(false);
              }}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader color={golden}> OTP Verification </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl mt={4}>
                    <FormLabel color={golden}>
                      Check Your {phone} Phone no...
                    </FormLabel>
                    <Input
                      color={golden}
                      colorScheme={golden}
                      borderColor={golden}
                      placeholder="Otp ex: 179323"
                      onChange={onChangeOtp}
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter justifyContent="center">
                  <VStack>
                    <Box borderWidth="1px">
                      <Button
                        bg={golden}
                        color="white"
                        width="200px"
                        colorScheme="red"
                        onClick={otpReqHandler}
                      >
                        Validate OTP
                      </Button>
                    </Box>
                    <Box py={4}>
                      <Button
                        color={golden}
                        width="200px"
                        colorScheme="red"
                        variant="link"
                        onClick={resendOTPHandler}
                      >
                        Resend OTP
                      </Button>
                    </Box>
                  </VStack>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}

          {isPassReset && (
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isPassReset}
              onClose={() => {
                setPassReset(false);
              }}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader color={golden}> Reset Password </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl mt={4}>
                    <FormLabel color={golden}>Enter your phone no : </FormLabel>
                    <Input
                      color={golden}
                      colorScheme={golden}
                      borderColor={golden}
                      placeholder="example : 01760 __ __ __ __ __ __ "
                      onChange={onChangeResetPhone}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter justifyContent="center">
                  <VStack>
                    <Box borderWidth="1px">
                      <Button
                        bg={golden}
                        color="white"
                        width="200px"
                        colorScheme="red"
                        onClick={passResetHandler}
                      >
                        Reset Request
                      </Button>
                    </Box>
                  </VStack>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}

          {isUpdatePass && (
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isUpdatePass}
              onClose={() => {
                setIsUpdatePass(false);
              }}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader color={golden}> Change Password </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl mt={4}>
                    <FormLabel color={golden}>Enter OTP : </FormLabel>
                    <Input
                      color={golden}
                      colorScheme={golden}
                      borderColor={golden}
                      type="number"
                      placeholder="example : 687551 "
                      onChange={onChangeOTPUpdate}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel color={golden}>Password : </FormLabel>
                    <Input
                      color={golden}
                      colorScheme={golden}
                      borderColor={golden}
                      type="password"
                      placeholder="example : ****** "
                      onChange={onChangeUpdatePass}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel color={golden}>Confirm - Password : </FormLabel>
                    <Input
                      color={golden}
                      colorScheme={golden}
                      borderColor={golden}
                      type="password"
                      placeholder="example : ****** "
                      onChange={onChangeConfUpdatePass}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter justifyContent="center">
                  <VStack>
                    <Box borderWidth="1px">
                      <Button
                        bg={golden}
                        color="white"
                        width="200px"
                        colorScheme="red"
                        onClick={updatePassHandler}
                      >
                        Update Password
                      </Button>
                    </Box>
                  </VStack>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};
