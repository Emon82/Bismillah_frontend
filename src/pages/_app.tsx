import { RootStoreProvider, useRootStore } from '@/models/root-store-provider';
import '@/styles/global.css';
import noOp from '@/utils/no-op';
import {
  ChakraProvider,
  CircularProgress,
  Flex,
  Modal,
  ModalContent,
  theme,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { AppProps } from 'next/app';
import React from 'react';

const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
  when: 'afterChildren',
};

const ViewPort = observer<AppProps>(({ Component, pageProps, router }) => {
  const { hydrated } = useRootStore();
  return (
    <Flex direction="column" minHeight="100vh" maxWidth="100%">
      <AnimatePresence exitBeforeEnter={true}>
        <motion.div
          transition={spring}
          key={router.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ flex: 1 }}
        >
          <Component {...pageProps} key={router.pathname} />
        </motion.div>
      </AnimatePresence>
      <Modal isOpen={!hydrated} closeOnOverlayClick={false} onClose={noOp}>
        <ModalContent
          minW="100%"
          minH="100vh"
          m="0"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size="100px" isIndeterminate={true} />
        </ModalContent>
      </Modal>
    </Flex>
  );
});

const App: React.FC<AppProps> = (props) => (
  <RootStoreProvider>
    <ChakraProvider resetCSS={true} theme={theme}>
      <ViewPort {...props} />
    </ChakraProvider>
  </RootStoreProvider>
);

export default App;
