import { useRootStore } from '@/models/root-store-provider';
import { observer } from 'mobx-react-lite';
import { csBackground } from '@/themes/custom.color';
import {
  Box,
  Radio,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  TableCaption,
  Icon,
  RadioGroup,
  GridItem,
  Grid,
  useToast,
} from '@chakra-ui/react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getPlanList } from '@/api/subscription/subscription';
import PaymentForm from './CheckoutForm';

function CreateSubscription() {
  const { user } = useRootStore();
  const toast = useToast();

  const ELEMENTS_OPTIONS = {
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
      },
    ],
  };

  // const stripePromise = loadStripe('pk_live_73Xs0ZJ2nSdkCSqq35eGIaAx');
  const stripePromise = loadStripe('pk_test_sV5cOK7lA4m5CpWPPJWWzsFW');
  const [paymentUiLoad, setPaymentUiLoad] = useState(false);

  const [subscriptEmail, setSubscriptEmail] = useState('');
  const [planList, setPlanList] = useState<any>([]);
  const [priceId, setPriceId] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const findSelectedPlan = (planId: string) => {
    const result = planList.find((item: any) => item.id === planId);
    setSelectedPlan(result);
    setPriceId(result?.id);
  };

  const fetchPlan = async () => {
    const result: any = await getPlanList(user.auth);
    if (result.code === 200) {
      const formatPlan = result?.details.map((item: any) => ({
        id: item.id,
        currency: item.currency,
        name: item.product.name,
        interval: item.recurring.interval,
        interval_count: item.recurring.interval_count,
        unit_amount: item.unit_amount / 100,
        description: item.product.description,
        productId: item.product.id,
        active: item.active,
      }));
      //

      const activePaln: any = formatPlan.filter(
        (data: any) => data.active === true,
      );
      const re: any = activePaln.find(
        (item: any) => item.id === activePaln[0]?.id,
      );
      setPriceId(re?.id);
      setSelectedPlan(re);
      setPlanList(activePaln);
    }
  };

  // api cal before loading
  useEffect(() => {
    fetchPlan();
  }, []);

  // console.log(selectedPlan,priceId)

  const continueHandleForPayment = () => {
    if (!selectedPlan && !priceId) {
      toast({
        title: 'Failed',
        description: 'Please Select Your Plan',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      setPaymentUiLoad(true);
    }
  };

  return (
    <Box bg={csBackground}>
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
        {!paymentUiLoad ? (
          <Box>
            <Box bg="white" p="10px" m="5px">
              <Table size="sm">
                <TableCaption placement="top">
                  <Text fontWeight="bold" fontSize="20px">
                    Compare Features
                  </Text>
                </TableCaption>

                <Thead>
                  <Tr>
                    <Th>Features</Th>
                    <Th>Free</Th>
                    <Th isNumeric>Premium</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Send unlimited personalized messages</Td>
                    <Td>
                      <Icon
                        as={AiOutlineCloseCircle}
                        color="red.500"
                        w="5"
                        h="5"
                      />
                    </Td>
                    <Td isNumeric>
                      <Icon
                        as={AiOutlineCheckCircle}
                        color="green.500"
                        w="5"
                        h="5"
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Chat with prospects directly.</Td>
                    <Td>
                      <Icon
                        as={AiOutlineCloseCircle}
                        color="red.500"
                        w="5"
                        h="5"
                      />
                    </Td>
                    <Td isNumeric>
                      <Icon
                        as={AiOutlineCheckCircle}
                        color="green.500"
                        w="5"
                        h="5"
                      />
                    </Td>
                  </Tr>

                  <Tr>
                    <Td> View Contact Number</Td>
                    <Td>
                      <Icon
                        as={AiOutlineCloseCircle}
                        color="red.500"
                        w="5"
                        h="5"
                      />
                    </Td>
                    <Td isNumeric>
                      <Icon
                        as={AiOutlineCheckCircle}
                        color="green.500"
                        w="5"
                        h="5"
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>

            <Box bg="white" p="10px" m="5px">
              <RadioGroup
                size="md"
                value={priceId}
                onChange={(e: string) => findSelectedPlan(e)}
              >
                <Table variant="striped" colorScheme="facebook">
                  <TableCaption placement="top">
                    <Text fontWeight="bold" fontSize="20px">
                      Choose a subscription
                    </Text>
                  </TableCaption>
                  <Thead colorScheme="teal">
                    <Tr>
                      <Th>Plan</Th>

                      <Th isNumeric>Select</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {planList.map((item: any) => (
                      <Tr>
                        <Td>
                          {item.interval_count} {item.interval}{' '}
                        </Td>
                        <Td isNumeric>
                          <Radio
                            size="lg"
                            name={item.id}
                            colorScheme="orange"
                            value={item.id}
                          >
                            <Box d="flex">
                              <Text mr="4px" fontWeight="bold">
                                {item.currency.toUpperCase()} {item.unit_amount}
                              </Text>
                            </Box>
                          </Radio>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </RadioGroup>
            </Box>
            <Box textAlign="center" mt="10px">
              <Button
                size="sm"
                height="40px"
                width="200px"
                border="2px"
                borderColor="red.500"
                onClick={continueHandleForPayment}
              >
                Continue
              </Button>
            </Box>
          </Box>
        ) : (
          <Box p="20px" my="30px">
            <Box bg="#bf00ff" h="45px">
              <Text align="center" lineHeight="45px" color="white">
                Your Plan
              </Text>
            </Box>
            <Box>
              <Grid
                my="40px"
                templateColumns={[
                  'repeat(1, 1fr)',
                  'repeat(1, 1fr)',
                  'repeat(2, 1fr)',
                  'repeat(2, 1fr)',
                ]}
                flexDirection={['column', 'column', 'row', 'row']}
                gap={3}
              >
                <GridItem>
                  <Box boxShadow="md" minH="100%" p="20px">
                    <Box my="8px">
                      <Input
                        placeholder="Enter Your Valid Email"
                        type="email"
                        size="sm"
                        onChange={(e) => setSubscriptEmail(e.target.value)}
                      />
                    </Box>
                    <Box mt="20px">
                      <Elements
                        stripe={stripePromise}
                        options={ELEMENTS_OPTIONS}
                      >
                        <PaymentForm
                          email={subscriptEmail}
                          priceId={selectedPlan.id}
                        />
                      </Elements>
                    </Box>
                  </Box>
                </GridItem>

                <GridItem px={['5px', '30px', '50px', '50px']} boxShadow="md">
                  <Box px="20px" pt="20px">
                    <Text fontWeight="bold" mb="4px">
                      ORDER SUMMARY
                    </Text>
                    <Box d="flex" justifyContent="space-between">
                      <Text>
                        {selectedPlan?.name} for {selectedPlan?.interval_count}{' '}
                        {selectedPlan?.interval_count <= 1
                          ? selectedPlan?.interval
                          : `${selectedPlan?.interval}s`}
                      </Text>
                      <Text>US ${selectedPlan?.unit_amount}</Text>
                    </Box>
                    <Box
                      d="flex"
                      justifyContent="space-between"
                      borderTop="1px"
                      mt="20px"
                      py="20px"
                    >
                      <Text>Total Amount</Text>
                      <Text>US ${selectedPlan?.unit_amount}</Text>
                    </Box>
                  </Box>
                </GridItem>
              </Grid>

              <Box textAlign="center" mt="10px">
                <Button
                  size="sm"
                  height="40px"
                  width="200px"
                  border="2px"
                  borderColor="red.500"
                  onClick={() => setPaymentUiLoad(false)}
                >
                  Back
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CreateSubscription;
