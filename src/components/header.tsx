// @ts-nocheck

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { signIn } from '@/api/auth/login';
import { passReset } from '@/api/auth/reset';
import { resendOTP, signUp, updatePassword, verify } from '@/api/auth/signUp';
import {
  vendorsignIn,
  vendorsignUp,
  vendorVerify,
  vendorResendOTP,
  vendorPassReset,
  updateVendorPassword,
} from '@/api/vendor/vendor';
import { useRootStore } from '@/models/root-store-provider';
import { golden } from '@/themes/custom.color';
import { sanitizePhone } from '@/utils/sanitizers';
import {
  ChevronDownIcon,
  HamburgerIcon,
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  InputGroup,
  InputRightElement,
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
  RadioGroup,
  useDisclosure,
  useToast,
  VStack,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  Select,
  Radio,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export const Header = (props: any) => {
  const { loginOpen, singnUpOpen } = props;
  const { onOpen } = useDisclosure();
  const { user, vendor } = useRootStore();

  const initialRef = useRef<any>();
  const finalRef = useRef<any>();

  const toast = useToast();
  const router = useRouter();

  const [userType, setUserType] = useState('user');
  const [identity, setIdentity] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const [resetIdenty, setResetIdenty] = useState('');
  const [updateOTP, setUpdateOTP] = useState('');
  const [updatePass, setUpdatePass] = useState('');
  const [updateConfPass, setUpdateConfPass] = useState('');

  const [isSignIn, setSignIn] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [isPassReset, setPassReset] = useState(false);
  const [isUpdatePass, setIsUpdatePass] = useState(false);
  const [hide, setHide] = useState(false);
  const [confHide, setConfHide] = useState(false);
  const [loginWith, setLoginWith] = useState('email');
  const [resetButtonEnable, setResetButtonEnable] = useState(true);

  useEffect(() => {
    setSignIn(loginOpen);
    setSignUp(singnUpOpen);
  }, [loginOpen, singnUpOpen]);
  // after signing success then resent button will be enable 1min later
  const resetButtonHandler = () => {
    setTimeout(() => {
      setResetButtonEnable(false);
    }, 30000);
  };

  const resetButtonEnaletimeHandler = () => {
    setResetButtonEnable(true);
    setTimeout(() => {
      setResetButtonEnable(false);
    }, 30000);
  };

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

  const onChangeConfirmPassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value);
    },
    [],
  );

  // user login handler
  const loginHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      setUserType('user');
      if (!identity || !password) {
        return toast({
          title: 'Warning',
          description: 'Identity / Password filed not be empty !!!!',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }

      const res = await signIn(identity, password);
      if (res?.code === 200) {
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
        vendor.logOut();
        return router.push('/main');
      }

      return toast({
        title: 'Sign In Failed',
        description: res?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
    [identity, password, toast, router, user],
  );

  // vendor login handler
  const vendorLoginHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      setUserType('vendor');
      if (!identity || !password) {
        return toast({
          title: 'Warning',
          description: 'Identity / Password filed not be empty !!!!',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }

      const res = await vendorsignIn(identity, password);
      if (res?.code === 200) {
        console.log(res.details);
        vendor.logIn(res.details);
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
        user.logOut();
        return router.push('/vendor');
      }

      return toast({
        title: 'Sign In Failed',
        description: res?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
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

  const onChangeIdentitywithPhone = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIdentity(event.target.value);
    },
    [],
  );

  const signUpHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      setUserType('user');
      if (!name) {
        return toast({
          title: 'Warning',
          description: 'Please provide your name',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (!phone && !email) {
        return toast({
          title: 'Warning',
          description: 'Please provide your email or phone number',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      // if (phone && !phone.includes('+')) {
      //   return show({ message: 'Please enter a valid phone no', type: 'info' });
      // }
      if (!phone && !email) {
        return toast({
          title: 'Warning',
          description: 'Please provide your email or phone number',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (email && !email.includes('@')) {
        return toast({
          title: 'Warning',
          description: 'Please provide a valid email',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (!password) {
        return toast({
          title: 'Warning',
          description: 'Please provide a strong password',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (password.length < 8) {
        return toast({
          title: 'Warning',
          description: 'Password must be at least 8 characters',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (!confirmPassword) {
        return toast({
          title: 'Warning',
          description: 'Please retype your password',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (password !== confirmPassword) {
        return toast({
          title: 'Warning',
          description: 'Passwords do not match',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }

      const res = await signUp(name, email, sanitizePhone(phone), password);
      console.log(res);
      if (res?.code === 201) {
        toast({
          title: `Thanks for joining, ${name}!`,
          description: res.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setUserId(res.details);

        setSignUp(false);
        setSignIn(false);
        // setIsVerify(true);
        setName('');
        // setEmail('');
        setPassword('');
        resetButtonHandler();
      }

      // }

      if (res?.code === 422) {
        return toast({
          title: 'Registration failed',
          description: 'Email or Phone already registered',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (res?.code === 400) {
        return toast({
          title: 'Unable to process your request',
          description: res.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (res?.code === 500) {
        return toast({
          title: 'Unable to process your request',
          description: res.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      return console.log(res);
    },
    [name, email, password, phone, confirmPassword, toast],
  );




  const vendorSignUpHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      setUserType('vendor');
      if (!name) {
        return toast({
          title: 'Warning',
          description: 'Please provide your name',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (!phone && !email) {
        return toast({
          title: 'Warning',
          description: 'Please provide your email or phone number',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      // if (phone && !phone.includes('+')) {
      //   return show({ message: 'Please enter a valid phone no', type: 'info' });
      // }
      if (!phone && !email) {
        return toast({
          title: 'Warning',
          description: 'Please provide your email or phone number',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (email && !email.includes('@')) {
        return toast({
          title: 'Warning',
          description: 'Please provide a valid email',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (!password) {
        return toast({
          title: 'Warning',
          description: 'Please provide a strong password',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (password.length < 8) {
        return toast({
          title: 'Warning',
          description: 'Password must be at least 8 characters',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (!confirmPassword) {
        return toast({
          title: 'Warning',
          description: 'Please retype your password',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (password !== confirmPassword) {
        return toast({
          title: 'Warning',
          description: 'Passwords do not match',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }

      const res = await vendorsignUp(
        name,
        email,
        sanitizePhone(phone),
        password,
      );
      console.log(res);
      if (res?.code === 201) {
        toast({
          title: `Thanks for joining, ${name}!`,
          description: res.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setUserId(res.details);

        setSignUp(false);
        setSignIn(false);
        setIsVerify(true);
        setName('');
        // setEmail('');
        setPassword('');
        resetButtonHandler();
      }

      // }

      if (res?.code === 422) {
        return toast({
          title: 'Registration failed',
          description: 'Email or Phone already registered',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (res?.code === 400) {
        return toast({
          title: 'Unable to process your request',
          description: res.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      if (res?.code === 500) {
        return toast({
          title: 'Unable to process your request',
          description: res.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      return console.log(res);
    },
    [name, email, password, phone, confirmPassword, toast],
  );

  // const onChangeOtp = useCallback((event: ChangeEvent<HTMLInputElement>) => {
  //   setOtp(event.target.value);
  // }, [otp]);

  const otpReqHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      if (!otp) {
        return toast({
          title: 'Warning',
          description: 'Please Enter OTP',
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }

      if (userType === 'user') {
        const verifyResponse: any = await verify(userId, otp);
        if (verifyResponse?.code === 200) {
          toast({
            title: 'OTP Verification Successful',
            description: verifyResponse.message,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
          user.logIn(verifyResponse?.details);
          return router.push('/main');
        }
        return toast({
          title: 'OTP Verification Failed',
          description: verifyResponse.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }

      if (userType === 'vendor') {
        const verifyResponse: any = await vendorVerify(userId, otp);
        if (verifyResponse?.code === 200) {
          toast({
            title: 'OTP Verification Successful',
            description: verifyResponse.message,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
          vendor.logIn(verifyResponse?.details);
          return router.push('/vendor');
        }
        return toast({
          title: 'OTP Verification Failed',
          description: verifyResponse.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }

      return null;
    },
    [toast, otp, router],
  );

  const resendOTPHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      let resendOtpRes: any;
      if (userType === 'user') {
        resendOtpRes = await resendOTP(userId);
      }
      if (userType === 'vendor') {
        resendOtpRes = await vendorResendOTP(userId);
      }
      if (resendOtpRes?.code === 200) {
        toast({
          title: `${email} new OTP send`,
          description: resendOtpRes.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        resetButtonEnaletimeHandler();
        return console.log(resendOtpRes);
      }

      return toast({
        title: 'OTP Request Failed',
        description: resendOtpRes.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
    [userId, toast],
  );

  const onChangeResetHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setResetIdenty(event.target.value);
    },
    [],
  );

  const passResetHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      if (resetIdenty === '') {
        return toast({
          title: `${resetIdenty} OTP send`,
          description: 'Please Enter Identy',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      let passResetRes: any;

      if (userType === 'user') {
        passResetRes = await passReset(resetIdenty);
      }
      if (userType === 'vendor') {
        passResetRes = await vendorPassReset(resetIdenty);
      }

      if (passResetRes?.code === 200) {
        toast({
          title: `${resetIdenty} OTP send`,
          description: passResetRes.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setIsUpdatePass(true);
      } else {
        toast({
          title: 'OTP Request Failed',
          description: passResetRes.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      return null;
    },
    [toast, resetIdenty],
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
          description: 'Filed Should Not Be Empty !!!!',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }

      if (updatePass !== updateConfPass) {
        return toast({
          title: 'Warning',
          description: 'Confrim Password Not Match',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }

      // let res:any

      if (userType === 'user') {
        const res: any = await updatePassword(
          resetIdenty,
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
          router.push('/main');
        } else {
          return toast({
            title: 'Password Update failed',
            description: res?.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        }
      }
      if (userType === 'vendor') {
        const res: any = await updateVendorPassword(
          resetIdenty,
          updateOTP,
          updatePass,
        );
        if (res?.code === 200) {
          vendor.logIn(res.details);
          toast({
            title: 'Password Update Successful',
            description: res.message,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
          router.push('/vendor');
        } else {
          return toast({
            title: 'Password Update failed',
            description: res?.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        }
      }

      return null;
    },
    [resetIdenty, user, router, toast, updatePass, updateConfPass, updateOTP],
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

      <Stack
        ml="auto"
        direction="row-reverse"
        spacing={4}
        bgColor="rgba(52, 52, 52, 0.7)"
      >
        {user?.details || vendor?.details ? (
          <>
            <Button
              display={{
                base: 'none',
                sm: 'none',
                md: 'block',
                lg: 'block',
              }}
              onClick={() =>
                user?.details ? router.push('/main') : router.push('/vendor')
              }
              rightIcon={<ChevronDownIcon />}
              colorScheme="white"
              variant="unstyled"
              style={{ color: 'white' }}
            >
              Go to Dashboard
            </Button>
          </>
        ) : (
          <>
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
              style={{ color: 'white' }}
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
              style={{ color: 'white' }}
            >
              Login
            </Button>
          </>
        )}

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
            <ModalContent color={golden}>
              <ModalHeader> Welcome back! Please Login </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Tabs isFitted variant="enclosed">
                  <TabList mb="1em">
                    <Tab onClick={() => setUserType('user')}>User Login</Tab>
                    <Tab onClick={() => setUserType('vendor')}>
                      Vendor Login
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <FormControl>
                        <FormLabel color={golden}>
                          <RadioGroup
                            size="md"
                            color={golden}
                            variant="flushed"
                            value={loginWith}
                            onChange={(e: string) => setLoginWith(e)}
                          >
                            <Radio colorScheme="green" value="email" mr={3}>
                              With Email
                            </Radio>
                            <Radio colorScheme="green" value="phone">
                              With Phone
                            </Radio>
                          </RadioGroup>
                        </FormLabel>

                        {loginWith === 'phone' ? (
                          <PhoneInput
                            country="us"
                            placeholder="Enter Phone Number"
                            inputStyle={{ width: '100%', height: '41px' }}
                            value={identity}
                            onChange={(e: any) => setIdentity(e)}
                          />
                        ) : (
                          <Input
                            placeholder="Enter Email"
                            color={golden}
                            colorScheme={golden}
                            borderColor={golden}
                            onChange={onChangeIdentity}
                          />
                        )}
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel color={golden}>Password</FormLabel>
                        <InputGroup size="md">
                          <Input
                            pr="4.5rem"
                            type={hide ? 'text' : 'password'}
                            placeholder="Enter password"
                            onChange={onChangePassword}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              bg="white"
                              size="sm"
                              onClick={() => setHide(!hide)}
                            >
                              {!hide ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <Box justifyContent="space-between">
                        <FormLabel mt={5}>
                          <Button
                            color={golden}
                            fontSize="15px"
                            variant="link"
                            onClick={() => {
                              setUserType('user');
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
                      <Box justifyContent="space-between">
                        <FormLabel>
                          <Button
                            color={golden}
                            fontSize="15px"
                            variant="link"
                            onClick={() => {
                              setSignIn(false);
                              setSignUp(true);
                              setIsVerify(false);
                              setPassReset(false);
                            }}
                          >
                            Create a new account
                          </Button>
                        </FormLabel>
                      </Box>

                      <Box textAlign="center">
                        <Button
                          bg={golden}
                          color="white"
                          colorScheme="red"
                          size="lg"
                          width="200px"
                          mt="10px"
                          onClick={loginHandler}
                        >
                          User Login
                        </Button>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <FormControl>
                        <FormLabel color={golden}>
                          <RadioGroup
                            size="md"
                            color={golden}
                            variant="flushed"
                            value={loginWith}
                            onChange={(e: string) => setLoginWith(e)}
                          >
                            <Radio colorScheme="green" value="email" mr={3}>
                              With Email
                            </Radio>
                            <Radio colorScheme="green" value="phone">
                              With Phone
                            </Radio>
                          </RadioGroup>
                        </FormLabel>

                        {loginWith === 'phone' ? (
                          <PhoneInput
                            country="us"
                            placeholder="Enter Phone Number"
                            inputStyle={{ width: '100%', height: '41px' }}
                            value={identity}
                            onChange={(e: any) => setIdentity(e)}
                          />
                        ) : (
                          <Input
                            placeholder="Enter Email"
                            color={golden}
                            colorScheme={golden}
                            borderColor={golden}
                            onChange={onChangeIdentity}
                          />
                        )}
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel color={golden}>Password</FormLabel>
                        <InputGroup size="md">
                          <Input
                            pr="4.5rem"
                            type={hide ? 'text' : 'password'}
                            placeholder="Enter password"
                            onChange={onChangePassword}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              bg="white"
                              size="sm"
                              onClick={() => setHide(!hide)}
                            >
                              {!hide ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <Box justifyContent="space-between">
                        <FormLabel mt={5}>
                          <Button
                            color={golden}
                            fontSize="15px"
                            variant="link"
                            onClick={() => {
                              setUserType('vendor');
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
                      <Box justifyContent="space-between">
                        <FormLabel>
                          <Button
                            color={golden}
                            fontSize="15px"
                            variant="link"
                            onClick={() => {
                              setSignIn(false);
                              setSignUp(true);
                              setIsVerify(false);
                              setPassReset(false);
                            }}
                          >
                            Create a new account
                          </Button>
                        </FormLabel>
                      </Box>

                      <Box textAlign="center">
                        <Button
                          bg={golden}
                          color="white"
                          colorScheme="red"
                          size="lg"
                          width="200px"
                          mt="10px"
                          onClick={vendorLoginHandler}
                        >
                          Vendor Login
                        </Button>
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ModalBody>
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
              <ModalHeader> Create Account</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Tabs isFitted variant="enclosed">
                  <TabList mb="1em">
                    <Tab onClick={() => setUserType('user')}>
                      User Registration
                    </Tab>
                    <Tab onClick={() => setUserType('vendor')}>
                      Vendor Registration
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                          ref={initialRef}
                          placeholder="Enter Your Name"
                          onChange={onChangeName}
                          color={golden}
                          colorScheme={golden}
                          borderColor={golden}
                        />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel color={golden}>
                          <RadioGroup
                            size="md"
                            color={golden}
                            variant="flushed"
                            value={loginWith}
                            onChange={(e: string) => setLoginWith(e)}
                          >
                            <Radio colorScheme="green" value="email" mr={3}>
                              With Email
                            </Radio>
                            <Radio colorScheme="green" value="phone">
                              With Phone
                            </Radio>
                          </RadioGroup>
                        </FormLabel>
                        {loginWith === 'phone' ? (
                          <PhoneInput
                            country="us"
                            placeholder="Enter Phone Number"
                            inputStyle={{ width: '100%', height: '41px' }}
                            value={identity}
                            onChange={setPhone}
                          />
                        ) : (
                          <Input
                            ref={initialRef}
                            type="email"
                            placeholder="Enter Your Email"
                            color={golden}
                            colorScheme={golden}
                            borderColor={golden}
                            onChange={onChangeEmail}
                          />
                        )}
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size="md">
                          <Input
                            pr="4.5rem"
                            type={hide ? 'text' : 'password'}
                            placeholder="Enter password"
                            onChange={onChangePassword}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              bg="white"
                              size="sm"
                              onClick={() => setHide(!hide)}
                            >
                              {!hide ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup size="md">
                          <Input
                            pr="4.5rem"
                            type={confHide ? 'text' : 'password'}
                            placeholder="Enter password"
                            onChange={onChangeConfirmPassword}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              bg="white"
                              size="sm"
                              onClick={() => setConfHide(!confHide)}
                            >
                              {!confHide ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <Box justifyContent="space-between">
                        <FormLabel mt={5}>
                          <Button
                            color={golden}
                            size="sm"
                            variant="link"
                            onClick={() => {
                              setSignIn(true);
                              setSignUp(false);
                              setIsVerify(false);
                              setPassReset(false);
                            }}
                          >
                            Have an account?
                          </Button>
                        </FormLabel>
                      </Box>

                      <Box textAlign="center">
                        <Button
                          bg={golden}
                          color="white"
                          colorScheme="red"
                          size="lg"
                          width="200px"
                          onClick={signUpHandler}
                        >
                          User Sign Up
                        </Button>
                      </Box>



                    </TabPanel>
                    <TabPanel>
                      <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                          ref={initialRef}
                          placeholder="Enter Your Name"
                          onChange={onChangeName}
                          color={golden}
                          colorScheme={golden}
                          borderColor={golden}
                        />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input
                          ref={initialRef}
                          type="email"
                          placeholder="Enter Your Email"
                          color={golden}
                          colorScheme={golden}
                          borderColor={golden}
                          onChange={onChangeEmail}
                        />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Phone Number</FormLabel>
                        <PhoneInput
                          country="bangladesh"
                          placeholder="Enter phone number"
                          inputStyle={{ width: '100%', height: '41px' }}
                          value={phone}
                          onChange={setPhone}
                          disabled
                        />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size="md">
                          <Input
                            pr="4.5rem"
                            type={hide ? 'text' : 'password'}
                            placeholder="Enter password"
                            onChange={onChangePassword}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              bg="white"
                              size="sm"
                              onClick={() => setHide(!hide)}
                            >
                              {!hide ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup size="md">
                          <Input
                            pr="4.5rem"
                            type={confHide ? 'text' : 'password'}
                            placeholder="Enter password"
                            onChange={onChangeConfirmPassword}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              bg="white"
                              size="sm"
                              onClick={() => setConfHide(!confHide)}
                            >
                              {!confHide ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <Box justifyContent="space-between">
                        <FormLabel mt={5}>
                          <Button
                            color={golden}
                            size="sm"
                            variant="link"
                            onClick={() => {
                              setSignIn(true);
                              setSignUp(false);
                              setIsVerify(false);
                              setPassReset(false);
                            }}
                          >
                            Have an account?
                          </Button>
                        </FormLabel>
                      </Box>

                      <Box textAlign="center">
                        <Button
                          bg={golden}
                          color="white"
                          colorScheme="red"
                          size="lg"
                          // disabled
                          width="200px"
                          onClick={vendorSignUpHandler}
                        >
                          Vendor Sign Up
                        </Button>
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}

        {isVerify && (
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isVerify}
            onClose={() => {
              setIsVerify(true);
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color={golden}> OTP Verification </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl mt={4}>
                  <FormLabel color={golden}>
                    Check Your {email || phone}
                  </FormLabel>
                  <Input
                    color={golden}
                    colorScheme={golden}
                    borderColor={golden}
                    placeholder="Enter OTP"
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
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
                      disabled={resetButtonEnable}
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
                  <FormControl>
                    <FormLabel color={golden}>
                      <RadioGroup
                        size="md"
                        color={golden}
                        variant="flushed"
                        value={loginWith}
                        onChange={(e: string) => setLoginWith(e)}
                      >
                        <Radio colorScheme="green" value="email" mr={3}>
                          With Email
                        </Radio>
                        <Radio colorScheme="green" value="phone">
                          With Phone
                        </Radio>
                      </RadioGroup>
                    </FormLabel>

                    {loginWith === 'phone' ? (
                      <PhoneInput
                        country="us"
                        placeholder="Enter Your Phone Number"
                        inputStyle={{ width: '100%', height: '41px' }}
                        value={resetIdenty}
                        onChange={(e: any) => setResetIdenty(e)}
                      />
                    ) : (
                      <Input
                        placeholder="Enter Your Email"
                        color={golden}
                        colorScheme={golden}
                        borderColor={golden}
                        onChange={onChangeResetHandler}
                      />
                    )}
                  </FormControl>

                  {/* <FormControl mt={4}>


                    <FormLabel>Email</FormLabel>

                    <Input
                      ref={initialRef}
                      type="email"
                      placeholder="Enter Your Email"
                      color={golden}
                      colorScheme={golden}
                      borderColor={golden}
                      onChange={onChangeResetHandler}
                    />
                  </FormControl> */}
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
                    placeholder="Enter OTP"
                    onChange={onChangeOTPUpdate}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel color={golden}>Password : </FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={hide ? 'text' : 'password'}
                      placeholder="Enter password"
                      onChange={onChangeUpdatePass}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        bg="white"
                        size="sm"
                        onClick={() => setHide(!hide)}
                      >
                        {!hide ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel color={golden}>Confirm Password : </FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={confHide ? 'text' : 'password'}
                      placeholder="Enter Confirm password"
                      onChange={onChangeConfUpdatePass}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        bg="white"
                        size="sm"
                        onClick={() => setConfHide(!confHide)}
                      >
                        {!confHide ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
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
    </Flex>
  );
};
