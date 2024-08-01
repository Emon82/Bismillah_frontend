import { Center, Box } from '@chakra-ui/react';
import Head from 'next/head';

const Unauthorizrd: React.FC = ({ children }) => (
  <>
    <Head>
      <title>Unauthorized </title>
    </Head>
    <Box minH="500px">
      <Center lineHeight="500px">
        You are not authorized to access this page!
      </Center>
    </Box>

    {children}
  </>
);

export default Unauthorizrd;
