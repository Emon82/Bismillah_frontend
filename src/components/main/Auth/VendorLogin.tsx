import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Select,
} from '@chakra-ui/react';
import { golden } from '@/themes/custom.color';

const VendorLogin = () => (
  <div>
    <FormControl>
      <FormLabel color={golden}>Mobile no / Email ID</FormLabel>
      <Input
        placeholder="Enter Mobile no / Email ID"
        color={golden}
        colorScheme={golden}
        borderColor={golden}
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
      />
    </FormControl>

    <FormControl mt={4}>
      <FormLabel color={golden}>Select Vendor Type</FormLabel>
      <Select borderColor={golden} placeholder="Select option">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
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

export default VendorLogin;
