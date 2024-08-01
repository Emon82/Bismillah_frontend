import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useRootStore } from '@/models/root-store-provider';
import { useRouter } from 'next/router';
import {
  subScriptionCancel,
  getSubscriptionDetails,
} from '@/api/subscription/subscription';

const SubscriptionDetails = () => {
  const { user } = useRootStore();
  const router = useRouter();
  const { auth } = user;
  const toast = useToast();
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>({});

  const fetchSubscriptionDetails = async () => {
    const { details, code }: any = await getSubscriptionDetails(user.auth);

    if (code === 200) {
      const formatData = {
        id: details?.id,
        status: details?.status,
        subscriptionType: details?.items.data[0]?.price?.product?.name,
        current_period_start: details?.current_period_start,
        current_period_end: details?.current_period_end,
        recurring: details?.items.data[0].price.recurring,
        amount: details?.items.data[0].price.unit_amount / 100,
        currency: details?.items.data[0].price?.currency,
        customerEmail: details?.customer?.email,
      };
      console.log(formatData);
      setSubscriptionDetails(formatData);
    }
  };

  useEffect(() => {
    fetchSubscriptionDetails();
  }, []);

  const [alertDialog, setAlertDialog] = useState(false);

  const openAlertDialog = (id: string) => {
    setAlertDialog(true);
    // setDeleteId(id);
  };

  const closeAlertDialog = () => setAlertDialog(false);

  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  // send connect request handle
  const sendSubscriptionCancelReq = async () => {
    const res: any = await subScriptionCancel(auth, subscriptionDetails?.id);
    if (res.code === 200) {
      toast({
        title: 'Success',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      closeAlertDialog();
      setTimeout(() => {
        user.refresh();
      }, 3000);

      //  router.push('/main');
    } else {
      toast({
        title: 'Request failed',
        description: res.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    return null;
  };
  const getMomentDateFormat = (
    dateValue: any,
    format = 'MM-DD-YYYY',
  ): string => {
    const myDate: any = new Date(dateValue * 1000);
    return myDate.toLocaleDateString();
  };

  console.log(getMomentDateFormat(subscriptionDetails?.current_period_end));
  // const confirmDeleteHandler = () => {
  //   sendSunscriptionCalcelReq(deleteId)
  //   closeAlertDialog();
  // };

  return (
    <div>
      <Box
        p="10px"
        mx={['0px', '50px', '50px', '200px']}
        my="10px"
        boxShadow="md"
        bg="white"
        borderLeft="10px solid #429EDB "
        borderRight="10px solid #429EDB "
        borderRadius="40px"
      >
        <Text
          textAlign="center"
          fontSize="20px"
          fontWeight="bold"
          fontStyle="italic"
        >
          Subscription Details
        </Text>

        <Table variant="simple" mt="20px">
          <Tbody>
            <Tr>
              <Td>Status</Td>

              <Td isNumeric>{subscriptionDetails?.status}</Td>
            </Tr>
            <Tr>
              <Td>Subscription Type</Td>

              <Td isNumeric>{subscriptionDetails?.subscriptionType}</Td>
            </Tr>
            <Tr>
              <Td>Scription Start Date</Td>
              {/* <Td isNumeric>N/A</Td> */}

              <Td isNumeric>
                {getMomentDateFormat(subscriptionDetails?.current_period_start)}
              </Td>
            </Tr>
            <Tr>
              <Td>Scription End Date</Td>
              {/* <Td isNumeric>N/A</Td> */}

              <Td isNumeric>
                {getMomentDateFormat(subscriptionDetails?.current_period_end)}
              </Td>
            </Tr>
            <Tr>
              <Td>Interval</Td>
              <Td isNumeric>
                {subscriptionDetails?.recurring?.interval_count}{' '}
                {subscriptionDetails?.recurring &&
                subscriptionDetails?.recurring?.interval_count <= 1
                  ? subscriptionDetails?.recurring?.interval
                  : `${subscriptionDetails?.recurring?.interval}s`}
              </Td>
            </Tr>
            <Tr>
              <Td>Total Amount</Td>
              <Td isNumeric>
                {subscriptionDetails.amount}{' '}
                {subscriptionDetails?.currency.toUpperCase()}
              </Td>
            </Tr>
            <Tr>
              <Td>Subscription Email</Td>
              <Td isNumeric>{subscriptionDetails?.customerEmail}</Td>
            </Tr>
          </Tbody>
        </Table>
        <Box textAlign="center" mt="10px">
          <Button
            size="sm"
            height="40px"
            width="200px"
            border="2px"
            borderColor="red.500"
            onClick={() => openAlertDialog('123')}
          >
            Cancel Subscription
          </Button>
        </Box>
      </Box>
      <AlertDialog
        isOpen={alertDialog}
        leastDestructiveRef={cancelRef}
        onClose={closeAlertDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel Subscription
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? upon subscription cancellation, Stripe will stop
              automatic collection of all finalized invoices for the customer.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={closeAlertDialog}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={sendSubscriptionCancelReq}
                ml={3}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default SubscriptionDetails;
