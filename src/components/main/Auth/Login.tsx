import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Box, Button } from '@chakra-ui/react';
import { golden } from '@/themes/custom.color';

const Login = () => {
  const [username, setUsername] = useState<any>(null);
  const [password, setPassword] = useState<any>(null);

  const loginHandler = () => {
    console.log(username, password);
  };

  return (
    <div>
      <FormControl>
        <FormLabel color={golden}>Mobile no / Email ID</FormLabel>
        <Input
          placeholder="Enter Mobile no / Email ID"
          color={golden}
          colorScheme={golden}
          borderColor={golden}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel color={golden}>Password</FormLabel>
        <Input
          placeholder="Enter password"
          type="password"
          color={golden}
          colorScheme={golden}
          borderColor={golden}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Box justifyContent="space-between">
        <FormLabel mt={5}>
          <Button color={golden} fontSize="15px" variant="link">
            Forgot password
          </Button>
        </FormLabel>
      </Box>
      <Box justifyContent="space-between">
        <FormLabel>
          <Button color={golden} fontSize="15px" variant="link">
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
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;
