import { useRootStore } from '@/models/root-store-provider';
import {
  Box,
  Text,
  Spacer,
  useDisclosure,
  Collapse,
  Button,
  Input,
  Center,
  useToast,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useEffect, useState, useCallback } from 'react';
import useInput from '../../../hooks/use-input';
import {
  changePassDataInput,
  editAccountDataInput,
} from '../../../../api/auth/auth';

const AccountSetting = () => {
  const toast = useToast();
  const { user } = useRootStore();
  // const nameData: string  = user.details ? user.details.name : ''
  const { onToggle } = useDisclosure();
  const [openNameField, setOpenNameField] = useState(true);
  const [openEmailField, setOpenEmailField] = useState(false);
  const [openPasswordField, setOpenPasswordField] = useState(false);
  const [openPhoneField, setOpenPhoneField] = useState(false);
  const [name, setName] = useInput(
    user.details?.name ? user.details?.name : '',
  );
  const [phone, setPhone] = useInput(
    user.details?.phone ? user.details?.phone : '',
  );
  const [email, setEmail] = useInput(
    user.details?.email ? user.details?.email : '',
  );
  const [currentPass, setOldPassword] = useInput('');
  const [newPass, setNewPassword] = useInput('');
  const [confirmPass, setConfirmNewPassword] = useInput('');

  const open0Handler = () => {
    setOpenNameField(!openNameField);
    onToggle();
  };
  const open1Handler = () => {
    setOpenEmailField(!openEmailField);
    onToggle();
  };

  const phoneFieldOpenHandler = () => {
    setOpenPhoneField(!openPhoneField);
    onToggle();
  };
  const open2Handler = () => {
    setOpenPasswordField(!openPasswordField);
    onToggle();
  };
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const saveUpdatedUserhandler = async () => {
    const data = {
      name,
      email,
      phone,
    };
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
    const res = await editAccountDataInput(data, user.auth);
    console.log(res);
    if (res?.code === 200) {
      return toast({
        title: 'Update Success',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
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
    console.log(res);

    return toast({
      title: 'Unable to process your request',
      description: res.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const changePasswordHandler = async () => {
    const data = {
      currentPass,
      newPass,
      confirmPass,
    };
    if (!currentPass) {
      return toast({
        title: 'Warning',
        description: 'Please provide your current password',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    if (!newPass) {
      return toast({
        title: 'Warning',
        description: 'Please provide your new password',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }

    if (!confirmPass) {
      return toast({
        title: 'Warning',
        description: 'Please provide your confirm password',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }

    if (newPass !== confirmPass) {
      return toast({
        title: 'Warning',
        description: 'New password and conform password not match',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }

    const res = await changePassDataInput(data, user.auth);
    console.log(res);
    if (res?.code === 200) {
      toast({
        title: 'Change Success',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }

    if (res?.code === 401) {
      toast({
        title: 'Invalid',
        description: res.message,
        status: 'error',
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
  };

  return (
    <div>
      <Box mx={['5px', '10px', '50px', '150px']} mt="5">
        <Box boxShadow="md" bg="white" mb="3" rounded="md">
          <Box display="flex" p="3">
            <Text>Name :</Text>
            <Spacer />
            <Text>{user.details?.name}</Text>
            <Spacer />
            <Text>
              <Button
                colorScheme="teal"
                size="sm"
                onClick={() => open0Handler()}
              >
                Edit
              </Button>
              {/* <Button onClick={() => open0Handler()}>Edit</Button> */}
            </Text>
          </Box>
          <Collapse in={openNameField} animateOpacity>
            <Box py="40px" borderTop="2px">
              <Box mx={['6px', '10px', '40px', '100px']}>
                <Input type="text" value={name} onChange={setName} />
              </Box>
              <Center>
                <Box display="flex" mt="4">
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => saveUpdatedUserhandler()}
                    mr="1"
                  >
                    Save
                  </Button>

                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => open0Handler()}
                    ml="1"
                  >
                    Cancel
                  </Button>
                </Box>
              </Center>
            </Box>
          </Collapse>
        </Box>

        <Box boxShadow="md" bg="white" mb="3" rounded="md">
          <Box display="flex" p="3">
            <Text>Email :</Text>
            <Spacer />
            <Text>{user.details?.email}</Text>
            <Spacer />
            <Text>
              <Button
                Button
                colorScheme="teal"
                size="sm"
                onClick={() => open1Handler()}
              >
                Edit
              </Button>
            </Text>
          </Box>
          <Collapse in={openEmailField} animateOpacity>
            <Box py="40px" borderTop="2px">
              <Box mx={['6px', '10px', '40px', '100px']}>
                <Input type="email" value={email} onChange={setEmail} />
              </Box>
              <Center>
                <Box display="flex" mt="4">
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => saveUpdatedUserhandler()}
                    mr="1"
                  >
                    Save
                  </Button>

                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => open1Handler()}
                    ml="1"
                  >
                    Cancel
                  </Button>
                </Box>
              </Center>
            </Box>
          </Collapse>
        </Box>

        <Box boxShadow="md" bg="white" mb="3" rounded="md">
          <Box display="flex" p="3">
            <Text>Phone :</Text>
            <Spacer />
            <Text>{user.details?.phone}</Text>
            <Spacer />
            <Text>
              <Button
                colorScheme="teal"
                size="sm"
                onClick={() => phoneFieldOpenHandler()}
              >
                Edit
              </Button>
            </Text>
          </Box>
          <Collapse in={openPhoneField} animateOpacity>
            <Box py="40px" borderTop="2px">
              <Box mx={['6px', '10px', '40px', '100px']}>
                <Input type="number" value={phone} onChange={setPhone} />
              </Box>
              <Center>
                <Box display="flex" mt="4">
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => saveUpdatedUserhandler()}
                    mr="1"
                  >
                    Save
                  </Button>

                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => phoneFieldOpenHandler()}
                    ml="1"
                  >
                    Cancel
                  </Button>
                </Box>
              </Center>
            </Box>
          </Collapse>
        </Box>

        <Box boxShadow="md" bg="white" rounded="md">
          <Box display="flex" p="3">
            <Text>Password :</Text>
            <Spacer />
            <Text>*********</Text>
            <Spacer />
            <Text>
              <Button
                Button
                colorScheme="teal"
                size="sm"
                onClick={() => open2Handler()}
              >
                Edit
              </Button>
            </Text>
          </Box>
          <Collapse in={openPasswordField} animateOpacity>
            <Box p="40px" borderTop="2px">
              <Box mx={['6px', '10px', '40px', '100px']}>
                <Text mt="3">current Password:</Text>
                <InputGroup size="md" mt="2">
                  <Input
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    onChange={setOldPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <Text mt="3">New Password:</Text>
                <InputGroup size="md" mt="2">
                  <Input
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    onChange={setNewPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <Text mt="3">Confirm New Password:</Text>
                <InputGroup size="md" mt="2">
                  <Input
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    onChange={setConfirmNewPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Center>
                <Box display="flex" mt="4">
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => changePasswordHandler()}
                    mr="1"
                  >
                    Save
                  </Button>

                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => open2Handler()}
                    ml="1"
                  >
                    Cancel
                  </Button>
                </Box>
              </Center>
            </Box>
          </Collapse>
        </Box>
      </Box>
    </div>
  );
};

export default AccountSetting;
