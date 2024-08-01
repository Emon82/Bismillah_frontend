import React from 'react';
import { useToast, Button, Box } from '@chakra-ui/react';

export default function CongratulationPopup() {
  const a = '';
  return (
    <Box
      h="450px"
      bgImage="url('https://cdn.dribbble.com/users/311928/screenshots/6574034/congrats1_4x.png?compress=1&resize=1200x900')"
      backgroundSize="cover"
      backgroundPosition="center"
      // objectFit="contain"
      // bgPosition={['center', 'contain']}
      bgRepeat="no-repeat"
      alt="image not found"
    />
  );
}
