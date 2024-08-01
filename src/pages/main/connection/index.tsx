import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRootStore } from '@/models/root-store-provider';
import { magicLogin } from '@/constants/api';
import { csBackground } from '@/themes/custom.color';
import {
  Box,
  CircularProgress,
  Flex,
  Modal,
  ModalContent,
  useToast,
} from '@chakra-ui/react';
import noOp from '@/utils/no-op';

const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
  when: 'afterChildren',
};

interface LoginResponse {
  code: number;
  message: string;
  details?: any;
}

function Index() {
  const router = useRouter();
  const toast = useToast();
  const { user } = useRootStore();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const login = async (magicToken: string) => {
    try {
      const response = await fetch(`${magicLogin}/${magicToken}`, {
        method: 'POST',
      });

      const res: LoginResponse = await response.json();

      if (res.code === 200) {
        setLoading(false);

        user.logIn(res.details);
        toast({
          title: 'Sign In Successful',
          description: res.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });

        if (router.query.path) {
          return router.push(`/main/${router.query.path}`);
        }
        return router.push('/main');
      }

      if (res.code === 401 || res.code === 403) {
        setLoading(false);
        setError(true);
        setErrorMsg(res.message);
        return toast({
          title: 'Login Fail',
          description: res.message,
          status: 'error', // Changed status to 'error' for fail cases
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMsg((error as Error).message);
      console.log(error);
    }
    return null;
  };

  useEffect(() => {
    if (router.query.token) {
      setLoading(true);
      login(router.query.token as string);
    } else {
      console.log('link not found');
      console.log(router.query.token);
      // router.push('/')
    }
  }, [router.query.token]);

  return (
    <Box bg={csBackground}>
      {isLoading && (
        <Flex direction="column" minHeight="100vh" maxWidth="100%">
          <Modal isOpen={isLoading} closeOnOverlayClick={false} onClose={noOp}>
            <ModalContent
              minW="100%"
              minH="100vh"
              m="0"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress size="100px" isIndeterminate={true} />
              Connecting...
            </ModalContent>
          </Modal>
        </Flex>
      )}

      {isError && (
        <Flex direction="column" minHeight="100vh" maxWidth="100%">
          <Modal isOpen={isError} closeOnOverlayClick={false} onClose={noOp}>
            <ModalContent
              minW="100%"
              minH="100vh"
              m="0"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {errorMsg}
            </ModalContent>
          </Modal>
        </Flex>
      )}
    </Box>
  );
}

export default Index;
