import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  MenuDivider,
  Box,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { BsChatSquareDotsFill } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';

const UpgradeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  return (
    <div>
      <Button
        leftIcon={<BsChatSquareDotsFill />}
        colorScheme="teal"
        size="sm"
        variant="solid"
        onClick={onOpen}
      >
        Message
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upgrade Membership</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MenuDivider />
            <Text py="5px">Premium Members Can ~</Text>
            <Box px="20px" pb="20px" textAlign-="center">
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={AiOutlineCheckCircle} color="green.500" />
                  Send unlimited personalized messages
                </ListItem>
                <ListItem>
                  <ListIcon as={AiOutlineCheckCircle} color="green.500" />
                  Chat with prospects directly.
                </ListItem>
                <ListItem>
                  <ListIcon as={AiOutlineCheckCircle} color="green.500" />
                  View Contact Number
                </ListItem>
                {/* You can also use custom icons from react-icons */}
                {/* <ListItem>
                  <ListIcon as={AiOutlineCheckCircle} color="green.500" />
                  Access 100% verified mobile numbers
                </ListItem> */}
              </List>
            </Box>
            <Box textAlign="center" mb="10px">
              <Button
                variant="solid"
                flex="1"
                size="sm"
                colorScheme="pink"
                bg="#D366C4"
                onClick={() => router.push('/main/upgrade')}
              >
                Upgrade Your Plan
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UpgradeModal;
