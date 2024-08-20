import React, { useState, MouseEvent, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useRootStore } from '@/models/root-store-provider';
import {
  Grid,
  Box,
  GridItem,
  HStack,
  Text,
  Select,
  Input,
  Center,
  Button,
  Stack,
  Radio,
  RadioGroup,
  Textarea,
  Flex,
  Icon,
  Switch,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { golden } from '@/themes/custom.color';
import countryList from '@/api/utils/countryList';
// import DatePicker from '@/react-datepicker';
import { createProfileInput } from '@/api/profile/profile';
import { FaPenNib } from 'react-icons/fa';
import useInput from '../../../hooks/use-input';

const CreateProfile = () => {
  const { user } = useRootStore();
  const toast = useToast();
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [relationship, setProfileFor] = useInput('');
  const [firstName, setFirstName] = useInput('');
  const [lastName, setLastName] = useInput('');
  const [gender, setGender] = useState<string>('Male');
  const [birthDate, setDateOfBirth] = useState<any>(new Date());
  const [religion, setReligion] = useInput('');
  const [contact, setPhoneNumber] = useInput('');
  const [maritalStatus, setMaterialStatus] = useInput('');

  const [addressOne, setAddressOne] = useInput('');
  const [addressTwo, setAddressTwo] = useInput('');
  const [city, setCity] = useInput('');
  const [state, setState] = useInput('');
  const [country, setCountry] = useInput('');
  const [zipCode, setZipCode] = useInput('');

  const [profession, setProfession] = useInput('');
  const [companyName, setCompanyName] = useInput('');
  const [degree, setDegree] = useInput('');
  const [designation, setDesignation] = useInput('');
  const [institute, setInstatite] = useInput('');
  const [income, setAnnualIncome] = useInput('');

  const [diet, setDiet] = useInput('Non Veg');
  const [smoke, setSmoke] = useState<string>('No');
  const [drink, setDrink] = useState<string>('No');
  const [height, setHeight] = useInput('');
  const [weight, setWeight] = useInput('');
  const [bodyType, setBodyType] = useInput('');
  const [skinTone, setSkinTone] = useInput('');
  const [bio, setAbout] = useInput('');

  const countryListRender = countryList.map((item) => (
    <option value={item.name}>{item.name}</option>
  ));

  const submitHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      if (
        diet === '' ||
        height === '' ||
        weight === '' ||
        bodyType === '' ||
        skinTone === ''
      ) {
        return toast({
          title: 'Failed',
          description: 'All non-optional fields are required',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }

      const data = {
        bio,
        relationship,
        firstName,
        lastName,
        gender,
        birthDate,
        religion,
        contact,
        address: addressOne,
        addressTwo,
        city,
        state,
        country,
        zipCode,
        maritalStatus,
        profession,
        companyName,
        designation,
        degree,
        institute,
        income: Number(income),
        diet,
        drink: drink === 'Yes',
        smoke: smoke === 'Yes',
        // eslint-disable-next-line radix
        height: parseInt(height),
        // eslint-disable-next-line radix
        weight: parseInt(weight),
        bodyType,
        skinTone,
        makeDefault: true,
        /** Make this Profile Default for the user */
      };
      console.log(data);
      const res: any = await createProfileInput(data, user.auth);

      if (res?.code === 201) {
        console.log(res.details);
        user.addProfile(res.details);
        toast({
          title: 'Create success',
          description: res.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        return router.push('/main');
      }
      return toast({
        title: 'Create failed',
        description: res?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
    [
      bio,
      relationship,
      firstName,
      lastName,
      gender,
      birthDate,
      religion,
      contact,
      addressOne,
      addressTwo,
      city,
      state,
      country,
      zipCode,
      maritalStatus,
      profession,
      companyName,
      designation,
      degree,
      institute,
      income,
      diet,
      drink,
      smoke,
      height,
      weight,
      bodyType,
      skinTone,
      toast,
    ],
  );

  const stepOneHandler = () => {
    if (step === 1) {
      if (
        relationship === '' ||
        firstName === '' ||
        lastName === '' ||
        gender === '' ||
        birthDate === '' ||
        religion === '' ||
        maritalStatus === '' ||
        contact === '' ||
        addressOne === '' ||
        city === '' ||
        state === '' ||
        country === '' ||
        zipCode === ''
      ) {
        return toast({
          title: 'Failed',
          description: 'All non-optional fields are required',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      return setStep(step + 1);
    }
    if (step === 2) {
      if (degree === '' || institute === '' || profession === '') {
        return toast({
          title: 'Failed',
          description: 'All non-optional fields are required',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      return setStep(step + 1);
    }

    return null;
  };

  
  return (
    <>
      <Grid
        mt="40px"
        p="5"
        borderWidth="1px"
        boxShadow="md"
        bg="white"
        borderLeft="10px solid #429EDB "
        borderRight="10px solid #429EDB "
        borderRadius="40px"
        mx={['5px', '10px', '50px', '150px']}
      >
        {/* ------------------------step 1------------------------------------------ */}
        {step === 1 && (
          <Box>
            <Flex py="2px">
              <Box display="flex">
                <Box
                  h="7"
                  w="7"
                  textAlign="center"
                  border="1px"
                  borderColor={golden}
                  borderRadius="50%"
                >
                  <Icon as={FaPenNib} color={golden} p="1px" />
                </Box>
                <Text
                  color={golden}
                  ml="5px"
                  pt="2px"
                  fontSize={['18px', '18px', '18px', '19px']}
                >
                  Basic And Personal Information
                </Text>
              </Box>
            </Flex>
            <Divider
              colorScheme="whatsapp"
              borderWidth="1px"
              mt="5"
              mb="20px"
              mx="5"
              // colorScheme="whatsapp"
            />
            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Profile For
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Select
                    size="md"
                    // variant=""
                    placeholder="Choose one"
                    onChange={setProfileFor}
                    value={relationship || ''}
                    color={golden}
                  >
                    <option value="Self">Self</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Other">Other</option>
                  </Select>
                </HStack>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Name
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Input
                    size="md"
                    variant="flushed"
                    type="text"
                    placeholder="Enter Your First Name"
                    onChange={setFirstName}
                    value={firstName}
                    color={golden}
                  />
                  <Input
                    size="md"
                    variant="flushed"
                    type="text"
                    placeholder="Enter Your Last Name"
                    onChange={setLastName}
                    value={lastName}
                    color={golden}
                  />
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Gender
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <RadioGroup
                    size="md"
                    value={gender}
                    onChange={(e: string) => setGender(e)}
                    color={golden}
                  >
                    <Radio value="Male" mr={3}>
                      Male
                    </Radio>
                    <Radio value="Female">Female</Radio>
                  </RadioGroup>
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Date Of Birth
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Input
                    size="md"
                    type="date"
                    max="1-1-2003"
                    value={birthDate}
                    color={golden}
                    variant="flushed"
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Religion
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Select
                    size="md"
                    color={golden}
                    // variant="flushed"
                    placeholder="Religion"
                    onChange={setReligion}
                    value={religion}
                  >
                    <option value="Islam">Islam</option>
                    <option value="Christianity">Christianity</option>
                    <option value="Buddhism">Buddhism</option>
                    <option value="Hinduism">Hinduism</option>
                    <option
                      // style={{ backgroundColor: 'black', color: 'white' }}
                      value="Judaism"
                    >
                      Judaism
                    </option>
                    <option
                      // style={{ backgroundColor: 'black', color: 'white' }}
                      value="Other"
                    >
                      Other
                    </option>
                  </Select>
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Marital Status
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Select
                    size="md"
                    color={golden}
                    // variant="flushed"
                    placeholder="Status"
                    onChange={setMaterialStatus}
                    value={maritalStatus}
                  >
                    <option value="Never_Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Awaiting_Divorce">Awaiting Divorce</option>
                  </Select>
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Contact
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Input
                    size="md"
                    color={golden}
                    variant="flushed"
                    placeholder="Enter Contact Number"
                    type="number"
                    value={contact}
                    onChange={setPhoneNumber}
                  />
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Address
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Input
                    size="md"
                    color={golden}
                    variant="flushed"
                    placeholder="Enter Your Address"
                    type="text"
                    onChange={setAddressOne}
                    value={addressOne}
                  />
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Address Line Two (Optional)
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Input
                    size="md"
                    color={golden}
                    variant="flushed"
                    placeholder="Enter Your Address Line Two "
                    type="text"
                    onChange={setAddressTwo}
                    // value={addressTwo}
                  />
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  State and City
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Input
                    size="md"
                    color={golden}
                    variant="flushed"
                    type="text"
                    placeholder="Enter Your State"
                    onChange={setState}
                    value={state}
                  />

                  <Input
                    size="md"
                    color={golden}
                    variant="flushed"
                    type="text"
                    placeholder="Enter Your City"
                    onChange={setCity}
                    value={city}
                  />
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Living Country
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Select
                    size="md"
                    color={golden}
                    variant="flushed"
                    placeholder="Countries"
                    onChange={setCountry}
                    value={country}
                  >
                    {countryListRender}
                  </Select>
                </HStack>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Zip code
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Input
                    size="md"
                    color={golden}
                    variant="flushed"
                    placeholder="Enter Your Zip Code"
                    type="text"
                    onChange={setZipCode}
                    value={zipCode}
                  />
                </HStack>
              </GridItem>
            </Grid>
          </Box>
        )}

        {/* ----------------------------step 2------------------------------------ */}
        {step === 2 && (
          <Box>
            <Flex py="2px">
              <Box display="flex">
                <Box
                  h="7"
                  w="7"
                  textAlign="center"
                  border="1px"
                  borderColor={golden}
                  borderRadius="50%"
                >
                  <Icon as={FaPenNib} color={golden} p="1px" />
                </Box>
                <Text
                  color={golden}
                  ml="5px"
                  py="2px"
                  fontSize={['18px', '18px', '18px', '19px']}
                >
                  Education And Profession
                </Text>
              </Box>
            </Flex>
            <Divider
              colorScheme="golden"
              borderWidth="1px"
              mt="5"
              mb="20px"
              mx="5"
            />
            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              {' '}
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Degree(Highest Level)
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Select
                    size="md"
                    color={golden}
                    //  variant="flushed"
                    placeholder="Degree"
                    onChange={setDegree}
                    value={degree}
                  >
                    <option
                      // style={{ backgroundColor: 'black', color: 'white' }}
                      value="Doctorate"
                    >
                      Doctorate
                    </option>
                    <option
                      // style={{ backgroundColor: 'black', color: 'white' }}
                      value="Masters"
                    >
                      Masters
                    </option>
                    <option
                      // style={{ backgroundColor: 'black', color: 'white' }}
                      value="Bachelors"
                    >
                      Bachelors
                    </option>
                    <option
                      // style={{ backgroundColor: 'black', color: 'white' }}
                      value="College"
                    >
                      College
                    </option>
                    <option
                      // style={{ backgroundColor: 'black', color: 'white' }}
                      value="HighSchool"
                    >
                      Other
                    </option>
                  </Select>
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Institute Name
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Input
                    size="md"
                    color={golden}
                    variant="flushed"
                    placeholder="Enter Your Institute Name"
                    type="text"
                    onChange={setInstatite}
                    value={institute}
                  />
                </HStack>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Profession
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Input
                    size="md"
                    color={golden}
                    variant="flushed"
                    type="text"
                    placeholder="Enter Your profession"
                    onChange={setProfession}
                    value={profession}
                  />
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Designation (Optional)
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Input
                    size="md"
                    color={golden}
                    variant="flushed"
                    type="text"
                    placeholder="Enter Your Designation"
                    onChange={setDesignation}
                    value={designation}
                  />
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Company Name (Optional)
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Input
                    size="md"
                    color={golden}
                    variant="flushed"
                    placeholder="Company Name"
                    type="text"
                    onChange={setCompanyName}
                    value={companyName}
                  />
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Annual Income (Optional)
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Input
                    size="md"
                    color={golden}
                    variant="flushed"
                    placeholder="Enter Annual Income (USD)"
                    type="number"
                    onChange={setAnnualIncome}
                    value={income}
                  />
                </HStack>
              </GridItem>
            </Grid>
          </Box>
        )}
        {/* ------------------------------dtep 3------------------------------------ */}
        {step === 3 && (
          <Box>
            <Flex py="2px">
              <Box display="flex">
                <Box
                  h="7"
                  w="7"
                  textAlign="center"
                  border="1px"
                  borderColor={golden}
                  borderRadius="50%"
                >
                  <Icon as={FaPenNib} color={golden} p="1px" />
                </Box>
                <Text
                  color={golden}
                  ml="5px"
                  py="2px"
                  fontSize={['18px', '18px', '18px', '19px']}
                >
                  Physical Attribute And Lifestyle
                </Text>
              </Box>
            </Flex>
            <Divider
              colorScheme="golden"
              borderWidth="1px"
              mt="5"
              mb="20px"
              mx="5"
            />

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Diet
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Select
                    size="md"
                    color={golden}
                    // variant="flushed"
                    placeholder="Select Diet"
                    onChange={setDiet}
                    value={diet}
                  >
                    <option
                      // style={{ backgroundColor: 'black', color: 'white' }}
                      value="Veg"
                    >
                      Veg
                    </option>
                    <option
                      // style={{ backgroundColor: 'black', color: 'white' }}
                      value="NonVeg"
                    >
                      Non Veg
                    </option>
                    <option
                      // style={{ backgroundColor: 'black', color: 'white' }}
                      value="Vegan"
                    >
                      Vegan
                    </option>
                  </Select>
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Do You Smoke
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <RadioGroup
                    value={smoke}
                    size="md"
                    color={golden}
                    // variant="flushed"
                    onChange={(e: string) => setSmoke(e)}
                  >
                    <Radio colorScheme="green" value="Yes" mr={3}>
                      Yes, I Smoke
                    </Radio>
                    <Radio colorScheme="green" value="No">
                      No, I Don&apos;t Smoke
                    </Radio>
                  </RadioGroup>
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Do You Drink
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <RadioGroup
                    size="md"
                    color={golden}
                    variant="flushed"
                    value={drink}
                    onChange={(e: string) => setDrink(e)}
                  >
                    <Radio colorScheme="green" value="Yes" mr={3}>
                      Yes, I Drink
                    </Radio>
                    <Radio colorScheme="green" value="No">
                      No, I Don&apos;t Drink
                    </Radio>
                  </RadioGroup>
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Height (cm)
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Input
                    size="md"
                    color={golden}
                    variant="flushed"
                    placeholder="Enter Your Height"
                    type="number"
                    onChange={setHeight}
                    value={height}
                  />
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Weight (Kg)
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Input
                    size="md"
                    color={golden}
                    variant="flushed"
                    placeholder="Enter Your Weight"
                    type="number"
                    onChange={setWeight}
                    value={weight}
                  />
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Body Type
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Select
                    size="md"
                    color={golden}
                    //  variant="flushed"
                    placeholder="Select Body type"
                    onChange={setBodyType}
                    value={bodyType}
                  >
                    <option
                      // style={{ backgroundColor: 'black', color: 'white' }}
                      value="Slim"
                    >
                      Slim
                    </option>
                    <option
                      // style={{ backgroundColor: 'black', color: 'white' }}
                      value="Fat"
                    >
                      Fat
                    </option>
                  </Select>
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Skin Tone
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Select
                    size="md"
                    color={golden}
                    //  variant="flushed"
                    placeholder="Select Skin tone"
                    onChange={setSkinTone}
                    value={skinTone}
                  >
                    <option
                      // style={{ backgroundColor: 'black', color: 'white' }}
                      value="Fair"
                    >
                      Fair
                    </option>
                    <option
                      // style={{ backgroundColor: 'black', color: 'white' }}
                      value="Honey"
                    >
                      Honey
                    </option>
                    <option
                      // style={{ backgroundColor: 'black', color: 'white' }}
                      value="Ivory"
                    >
                      Ivory
                    </option>
                    <option
                      // style={{ backgroundColor: 'Brown', color: 'white' }}
                      value="Brown"
                    >
                      Brown
                    </option>
                    <option
                      // style={{ backgroundColor: 'Dark', color: 'white' }}
                      value="Dark"
                    >
                      Dark
                    </option>
                  </Select>
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Bio (Optional)
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Textarea
                    size="md"
                    color={golden}
                    // variant="flushed"
                    placeholder="Write Something About You"
                    onChange={setAbout}
                    value={bio}
                  />
                </HStack>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
              <GridItem colSpan={2} alignSelf="center">
                <Text color={golden} fontWeight="bold">
                  Make This Your Default Profile
                </Text>
              </GridItem>
              <GridItem colSpan={6}>
                <HStack spacing={5}>
                  <Switch size="md" />
                </HStack>
              </GridItem>
            </Grid>
          </Box>
        )}
      </Grid>

      <Box>
        <Center py={5}>
          <Stack direction="row" spacing={4}>
            <Button
              color={golden}
              onClick={() => setStep(step - 1)}
              colorScheme="red"
              // disabled={ step <= 1 ? true : false}
              disabled={step <= 1}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              color={golden}
              colorScheme="red"
              variant="outline"
              disabled={step >= 3}
              onClick={() => stepOneHandler()}
            >
              Next
            </Button>

            {step === 3 && (
              <Button
                color={golden}
                colorScheme="red"
                variant="outline"
                //  disabled={ step >= 3 ? true : false}
                onClick={submitHandler}
              >
                Submit
              </Button>
            )}
          </Stack>
        </Center>
      </Box>
    </>
  );
};

export default CreateProfile;
