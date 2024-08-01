import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useRootStore } from '@/models/root-store-provider';
// import { observer } from 'mobx-react-lite';
import {
  useToast,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { createSubscription } from '@/api/subscription/subscription';
import CongratilationPopup from './congratilationPopup';

export default function PaymentForm(props: any) {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useRootStore();
  const stripe = useStripe();
  const elements = useElements();

  const redirectHandle = () => {
    user.refresh();
    onClose();
    router.push('/main');
  };

  const handleSubmit = async (event: any) => {
    // Block native form submission.

    event.preventDefault();
    // onOpen();
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!props.email.match(mailformat)) {
      toast({
        title: 'Failed',
        description: 'Please Provide valid Email',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setLoading(false);
      return;
    }
    try {
      const cardElement: any = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
      setLoading(false);
      if (error) {
        toast({
          title: error.code,
          description: error.message,
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setLoading(false);
      }
      if (paymentMethod) {
        const secret: any = await createSubscription(user.auth, {
          email: props.email,
          priceId: props.priceId,
        });
        const clientSecret =
          secret.details.latest_invoice.payment_intent.client_secret;
        const result: any = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

        console.log(result.paymentIntent.id);
        setTimeout(() => {
          user.refresh();
        }, 3000);
        toast({
          title: 'Complete',
          description: 'Payment Completed',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setLoading(false);
        user.refresh();
        router.push('/main');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: 'failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontFamily: 'sans-serif',
                lineHeight: '36px',
                fontSize: '14px',
                '::placeholder': {
                  color: '#aaa',
                },
                ':-webkit-autofill': {
                  color: '#e39f48',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <Box marginTop="50px" textAlign="center">
          <Button
            size="sm"
            type="submit"
            isLoading={loading}
            loadingText="Loading"
            colorScheme="teal"
            variant="outline"
            spinnerPlacement="start"
          >
            Pay Now
          </Button>
        </Box>
      </form>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <CongratilationPopup />
            </Box>

            <Box textAlign="center">
              <Button colorScheme="blue" onClick={() => redirectHandle()}>
                Continue
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
