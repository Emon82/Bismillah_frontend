import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useRootStore } from '@/models/root-store-provider';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FaRegCreditCard } from 'react-icons/fa';
import { csBackground, golden } from '@/themes/custom.color';
import Footer from '@/components/footer';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function CreateProfilePage() {
  const toast = useToast();
  const router = useRouter();
  const { user } = useRootStore();
  const handleLogout = () => {
    user.logOut();
    toast({
      title: 'Log out Successful',
      description: 'Log out success',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
    return router.push('/');
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Box bg={csBackground}>
      <Box mx={['10px', '50px', '100px', '150px']}>
        <HStack justifyContent="space-between">
          <Box>
            <Image
              maxW={['100px', '120px', '130px', '150px']}
              maxH={['50px', '60px', '80px', '45px']}
              objectFit="contain"
              ml={4}
              src="/logo/BM2.png"
              alt="Segun Adebayo"
            />
          </Box>
          <HStack>
            <Text fontSize={['15px', '15px', '16px', '16px']} mr={5}>
              Help
            </Text>
            <Button
              fontSize={['15px', '15px', '16px', '16px']}
              mr={5}
              // bg={golden}
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </HStack>
        </HStack>
      </Box>

      <Box bg="#bf00ff" h="45px">
        <Text align="center" lineHeight="45px" color="white">
          You are saving US $30 on your selected plan!
        </Text>
      </Box>
      <Box mx={['10px', '30px', '50px', '150px']}>
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
            <Box boxShadow="dark-lg">
              <Tabs isManual variant="enclosed">
                <TabList>
                  <Tab>
                    <Box display="flex">
                      <Icon
                        as={FaRegCreditCard}
                        color="blue"
                        w={5}
                        h={5}
                        mr="3px"
                      />
                      <Text> Credit Card</Text>
                    </Box>
                  </Tab>
                  <Tab>
                    <Box display="flex">
                      <Icon
                        as={FaRegCreditCard}
                        color="blue"
                        w={5}
                        h={5}
                        mr="3px"
                      />
                      <Text>Debit Card</Text>
                    </Box>
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <FormControl
                        id="cardNumber"
                        isInvalid={errors.cardNumber}
                      >
                        <FormLabel>Card Number</FormLabel>
                        <InputGroup size="sm">
                          <InputLeftAddon
                            size="sm"
                            children={
                              <Icon
                                as={FaRegCreditCard}
                                color="blue"
                                w={5}
                                h={5}
                                mr="3px"
                              />
                            }
                          />

                          <NumberInput
                            size="sm"
                            min={14}
                            max={20}
                            {...register('cardNumber', {
                              required: {
                                value: true,
                                message: 'This is required.',
                              },
                            })}
                          >
                            <NumberInputField />
                          </NumberInput>
                        </InputGroup>
                        {/* <FormHelperText>We'll never share your card number.</FormHelperText> */}
                        <FormErrorMessage>
                          {errors.email?.message}
                        </FormErrorMessage>
                      </FormControl>
                      <Flex display="flex">
                        <Box>
                          <FormControl
                            id="cardNumber"
                            isInvalid={errors.cardNumber}
                          >
                            <FormLabel>Valid upto</FormLabel>
                            <InputGroup size="sm">
                              <InputLeftAddon
                                children={
                                  <Icon
                                    as={FaRegCreditCard}
                                    color="blue"
                                    w={5}
                                    h={5}
                                    mr="3px"
                                  />
                                }
                              />

                              <NumberInput
                                size="sm"
                                min={14}
                                max={20}
                                {...register('cardNumber', {
                                  required: {
                                    value: true,
                                    message: 'This is required.',
                                  },
                                })}
                              >
                                <NumberInputField />
                              </NumberInput>
                            </InputGroup>
                            {/* <FormHelperText>We'll never share your card number.</FormHelperText> */}
                            <FormErrorMessage>
                              {errors.email?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>

                        <Box ml="10px">
                          <FormControl
                            id="cardNumber"
                            isInvalid={errors.cardNumber}
                          >
                            <FormLabel>CVV</FormLabel>
                            <InputGroup size="sm">
                              <InputLeftAddon
                                children={
                                  <Icon
                                    as={FaRegCreditCard}
                                    color="blue"
                                    w={5}
                                    h={5}
                                    mr="3px"
                                  />
                                }
                              />

                              <NumberInput
                                size="sm"
                                min={3}
                                max={4}
                                {...register('cardNumber', {
                                  required: {
                                    value: true,
                                    message: 'This is required.',
                                  },
                                })}
                              >
                                <NumberInputField />
                              </NumberInput>
                            </InputGroup>
                            {/* <FormHelperText>We'll never share your card number.</FormHelperText> */}
                            <FormErrorMessage>
                              {errors.email?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                      </Flex>
                      <Button
                        variant="solid"
                        type="submit"
                        my="9px"
                        mr="6px"

                        // bg="#0040ff"
                      >
                        <Text fontSize={[13, 19, 20, 15]}>Pay Now</Text>
                      </Button>
                    </form>
                    <Divider side="2px" mx="5px" colorScheme="messenger" />
                    <Box>Secure</Box>
                  </TabPanel>
                  <TabPanel>
                    <p>Debit Card</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </GridItem>

          <GridItem px={['5px', '30px', '50px', '90px']} boxShadow="dark-lg">
            <Box px="20px" pt="60px">
              <Text pt="10px" fontWeight="bold">
                ORDER SUMMARY
              </Text>
              <Box d="flex" justifyContent="space-between">
                <Text>Gold</Text>
                <Text>US $99</Text>
              </Box>
              <Box
                d="flex"
                justifyContent="space-between"
                borderTop="1px"
                mt="20px"
                py="20px"
              >
                <Text>Total Amount</Text>
                <Text>US $99</Text>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}

export default CreateProfilePage;
