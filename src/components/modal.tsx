import { golden } from '@/themes/custom.color';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useRef } from 'react';

export const ModalWindow = (props: any) => {
  const { isOpen, onClose } = useDisclosure();

  const initialRef = useRef<any>();
  const finalRef = useRef<any>();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      color="white"
      {...props}
    >
      <Box mt={{ base: 4, md: 0 }} alignItems="center" flexGrow={1}>
        <Stack direction="row-reverse" spacing={4}>
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
                    color={golden}
                    colorScheme={golden}
                    borderColor={golden}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input placeholder="Enter password" type="password" />
                  <Box justifyContent="space-between">
                    <FormLabel mt={2} float="right">
                      Stay Logged in
                    </FormLabel>
                    <FormLabel mt={2}>Forgot password</FormLabel>
                  </Box>
                </FormControl>
              </ModalBody>

              <ModalFooter justifyContent="space-between">
                <Button colorScheme="blue" mr={3}>
                  Login
                </Button>
                <Button onClick={onClose}>Sign up</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      </Box>
    </Flex>
  );
};
