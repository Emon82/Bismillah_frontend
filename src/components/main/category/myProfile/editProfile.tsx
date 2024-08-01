import { golden, csBackground, bgWhite } from '@/themes/custom.color';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/models/root-store-provider';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  Radio,
  RadioGroup,
  Select,
  Text,
  Grid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Textarea,
  Button,
  Stack,
  Center,
  GridItem,
  Flex,
  useToast,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { MouseEvent, useCallback, useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import countryList from '@/api/utils/countryList';
import { updateProfileDataInput } from '@/api/profile/updateProfile';
import useInput from '../../../hooks/use-input';

const EditProfileComponent = observer(() => {
  const toast = useToast();
  const { user, getProfileData } = useRootStore();
  const { addProfile, auth, selectProfileId, loadSelectedProfile } = user;
  const profileData: any = getProfileData;
  const [id, setId] = useState<string>(profileData ? profileData.id : '');
  const [firstName, setFirstName] = useInput(
    profileData ? profileData.firstName : '',
  );
  const [lastName, setLastName] = useInput(
    profileData ? profileData.lastName : '',
  );
  const [gender, setGender] = useState<string>(
    profileData ? profileData.gender : '',
  );
  const [birthDate, setDateOfBirth] = useState<any>(new Date());
  const [religion, setReligion] = useInput(
    profileData ? profileData.religion : '',
  );
  const [contact, setPhoneNumber] = useInput(
    profileData ? profileData.contact : '',
  );
  const [maritalStatus, setMaterialStatus] = useInput(
    profileData ? profileData.maritalStatus : '',
  );

  const [addressOne, setAddressOne] = useInput(
    profileData ? profileData.address : '',
  );
  const [addressTwo, setAddressTwo] = useInput(
    profileData ? profileData.addressTwo : '',
  );
  const [city, setCity] = useInput(profileData ? profileData.city : '');
  const [state, setState] = useInput(profileData ? profileData.state : '');
  const [country, setCountry] = useInput(
    profileData ? profileData.country : '',
  );
  const [zipCode, setZipCode] = useInput(
    profileData ? profileData.zipCode : '',
  );

  const [profession, setProfession] = useInput(
    profileData ? profileData.profession : '',
  );
  const [companyName, setCompanyName] = useInput(
    profileData ? profileData.companyName : '',
  );
  const [degree, setDegree] = useInput(profileData ? profileData.degree : '');
  const [designation, setDesignation] = useInput(
    profileData ? profileData.designation : '',
  );
  const [institute, setInstatite] = useInput(
    profileData ? profileData.institute : '',
  );
  const [income, setAnnualIncome] = useInput(
    profileData ? profileData.income.toString() : '',
  );

  const [diet, setDiet] = useInput(profileData ? profileData.diet : '');
  const [smoke, setSmoke] = useState<string>(profileData?.smoke ? 'Yes' : 'No');
  const [drink, setDrink] = useState<string>(profileData?.drink ? 'Yes' : 'No');
  const [height, setHeight] = useInput(
    profileData ? profileData.height.toString() : '',
  );
  const [weight, setWeight] = useInput(
    profileData ? profileData.weight.toString() : '',
  );
  const [bodyType, setBodyType] = useInput(
    profileData ? profileData.bodyType : '',
  );
  const [skinTone, setSkinTone] = useInput(
    profileData ? profileData.skinTone : '',
  );

  const [bio, setAbout] = useInput(profileData ? profileData.bio : '');
  const [correctionList, setCorrectionList] = useState<string[]>(
    profileData ? profileData?.correctionList : [],
  );

  useEffect(() => {
    loadSelectedProfile(selectProfileId);
  }, [selectProfileId]);

  const countryListRender = countryList.map((item) => (
    <option
      style={{
        backgroundColor: 'black',
        color: 'white',
      }}
      value={item.name}
    >
      {item.name}
    </option>
  ));

  const data: any = {
    id,
    bio,
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
    height: parseFloat(height),
    weight: Number(weight),
    bodyType,
    skinTone,
  };

  const onSubmitHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();

      const res = await updateProfileDataInput(data, auth);
      console.log(res);
      if (res?.code === 200) {
        addProfile(res.details);
        toast({
          title: 'Profile update success',
          description: res.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        return null;
      }
      if (res?.code === 500) {
        return toast({
          title: 'Update fail',
          description: res?.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      return toast({
        title: 'Update fail',
        description: res?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
    [
      id,
      bio,
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
      user.auth,
    ],
  );

  const correctionSubmit = async () => {
    const oldData: any = [];
    const newData: any = [];

    for (const key in profileData) {
      if (correctionList.includes(key)) {
        oldData.push(profileData[key]);
      }
    }

    for (const key in data) {
      if (correctionList.includes(key)) {
        newData.push(data[key]);
      }
    }

    const isCorrect = oldData.map((item: any) => {
      if (newData.includes(item)) {
        toast({
          title: 'Submit Failed',
          description: `Please Correct ${item}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        return false;
      }
      return true;
    });

    if (!isCorrect.includes(false)) {
      const newObject = { ...data, isCorrected: true };

      const res = await updateProfileDataInput(newObject, auth);

      if (res?.code === 200) {
        addProfile(res.details);
        // console.log(res.details);
        // setCorrectionList([])
        toast({
          title: 'Profile update success',
          description: res.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        return null;
      }
      if (res?.code === 500) {
        return toast({
          title: 'Update failed',
          description: res?.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      return toast({
        title: 'Update failed',
        description: res?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    return 0;
  };

  return (
    <>
      <Box mx={['0px', '50px', '100px', '150px']} mb={2} bg={bgWhite} p="5">
        <Text fontSize="22px" my="10px" fontWeight="470" color={golden}>
          Edit Your Profile Information
        </Text>
        {correctionList?.length ? (
          <div style={{ display: 'flex' }}>
            <Text fontSize="15px" my="10px" fontWeight="bold" color="green">
              {' '}
              Please correct the following field(s) :{' '}
            </Text>

            {correctionList.map((item: any) => (
              <Text fontSize="15px" my="10px" fontWeight="470" color="tomato">
                {item},{' '}
              </Text>
            ))}
          </div>
        ) : null}
        <Accordion defaultIndex={0} allowToggle={true}>
          <AccordionItem
            mb="5px"
            boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.10)"
          >
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text fontSize="16px" fontWeight="500" color={golden}>
                        Edit Your Basic Information
                      </Text>
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize="12px" />
                    ) : (
                      <AddIcon fontSize="12px" />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('firstName')}
                          />
                          <Input
                            size="md"
                            variant="flushed"
                            type="text"
                            placeholder="Enter Your Last Name"
                            onChange={setLastName}
                            value={lastName}
                            color={golden}
                            isInvalid={correctionList.includes('lastName')}
                          />
                        </HStack>
                      </GridItem>
                    </Grid>

                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            <Radio
                              value="Male"
                              mr={3}
                              isInvalid={correctionList.includes('gender')}
                            >
                              Male
                            </Radio>
                            <Radio
                              value="Female"
                              isInvalid={correctionList.includes('gender')}
                            >
                              Female
                            </Radio>
                          </RadioGroup>
                        </HStack>
                      </GridItem>
                    </Grid>

                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('birthDate')}
                          />
                        </HStack>
                      </GridItem>
                    </Grid>

                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('religion')}
                          >
                            <option
                              // style={{ backgroundColor: 'black', color: 'white' }}
                              value="Islam"
                            >
                              Islam
                            </option>
                            <option
                              // style={{ backgroundColor: 'black', color: 'white' }}
                              value="Christianity"
                            >
                              Christianity
                            </option>
                            <option
                              // style={{ backgroundColor: 'black', color: 'white' }}
                              value="Buddhism"
                            >
                              Buddhism
                            </option>
                            <option
                              // style={{ backgroundColor: 'black', color: 'white' }}
                              value="Hinduism"
                            >
                              Hinduism
                            </option>
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
                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('maritalStatus')}
                          >
                            <option value="Never_Married">Never Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                            <option value="Awaiting_Divorce">
                              Awaiting Divorce
                            </option>
                          </Select>
                        </HStack>
                      </GridItem>
                    </Grid>
                  </Box>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem
            mb="5px"
            boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.10)"
          >
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontSize="16px"
                      fontWeight="500"
                      color={golden}
                    >
                      Edit Your Contact Information
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize="12px" />
                    ) : (
                      <AddIcon fontSize="12px" />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('contact')}
                          />
                        </HStack>
                      </GridItem>
                    </Grid>
                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('addressOne')}
                          />
                        </HStack>
                      </GridItem>
                    </Grid>

                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('addressTwo')}
                          />
                        </HStack>
                      </GridItem>
                    </Grid>

                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('state')}
                          />

                          <Input
                            size="md"
                            color={golden}
                            variant="flushed"
                            type="text"
                            placeholder="Enter Your City"
                            onChange={setCity}
                            value={city}
                            isInvalid={correctionList.includes('city')}
                          />
                        </HStack>
                      </GridItem>
                    </Grid>
                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('Countries')}
                          >
                            {countryListRender}
                          </Select>
                        </HStack>
                      </GridItem>
                    </Grid>
                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('zipCode')}
                          />
                        </HStack>
                      </GridItem>
                    </Grid>
                  </Box>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem
            mb="5px"
            boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.10)"
          >
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontSize="18px">
                      <Text fontSize="16px" fontWeight="500" color={golden}>
                        Education and Career Details
                      </Text>
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize="12px" />
                    ) : (
                      <AddIcon fontSize="12px" />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box mt={5}>
                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            placeholder="Degrees"
                            onChange={setDegree}
                            value={degree}
                            isInvalid={correctionList.includes('degree')}
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

                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('institute')}
                          />
                        </HStack>
                      </GridItem>
                    </Grid>
                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('profession')}
                          />
                        </HStack>
                      </GridItem>
                    </Grid>

                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('designation')}
                          />
                        </HStack>
                      </GridItem>
                    </Grid>

                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('companyName')}
                          />
                        </HStack>
                      </GridItem>
                    </Grid>

                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
                      <GridItem colSpan={2} alignSelf="center">
                        <Text color={golden} fontWeight="bold">
                          Annual Income (USD)
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
                            isInvalid={correctionList.includes('income')}
                          />
                        </HStack>
                      </GridItem>
                    </Grid>
                  </Box>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem mb="5px">
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.10)">
                    <Box
                      flex="1"
                      textAlign="left"
                      fontSize="16px"
                      fontWeight="450"
                    >
                      <Text fontSize="16px" fontWeight="500" color={golden}>
                        Physical Attribute And Lifestyle
                      </Text>
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize="12px" />
                    ) : (
                      <AddIcon fontSize="12px" />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('diet')}
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

                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('smoke')}
                          >
                            <Radio colorScheme="green" value="Yes" mr={3}>
                              Yes, I Smoke
                            </Radio>
                            <Radio colorScheme="green" value="No">
                              No, I Do Not Smoke
                            </Radio>
                          </RadioGroup>
                        </HStack>
                      </GridItem>
                    </Grid>

                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('drink')}
                          >
                            <Radio colorScheme="green" value="Yes" mr={3}>
                              Yes, I Drink
                            </Radio>
                            <Radio colorScheme="green" value="No">
                              No, I Do Not Drink
                            </Radio>
                          </RadioGroup>
                        </HStack>
                      </GridItem>
                    </Grid>

                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('height')}
                          />
                        </HStack>
                      </GridItem>
                    </Grid>

                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('weight')}
                          />
                        </HStack>
                      </GridItem>
                    </Grid>

                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('bodyType')}
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
                            <option
                              // style={{ backgroundColor: 'black', color: 'white' }}
                              value="Athletic"
                            >
                              Athletic
                            </option>
                          </Select>
                        </HStack>
                      </GridItem>
                    </Grid>

                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
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
                            isInvalid={correctionList.includes('skinTone')}
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
                              value="Black"
                            >
                              Brown
                            </option>
                            <option
                              // style={{ backgroundColor: 'Dark', color: 'white' }}
                              value="Black"
                            >
                              Dark
                            </option>
                          </Select>
                        </HStack>
                      </GridItem>
                    </Grid>
                  </Box>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem
            mb="5px"
            boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.10)"
          >
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontSize="16px"
                      fontWeight="500"
                      color={golden}
                    >
                      Edit Your Bio
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize="12px" />
                    ) : (
                      <AddIcon fontSize="12px" />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      mx={['15px', '40px']}
                      mb={7}
                    >
                      <GridItem colSpan={2} alignSelf="center">
                        <Text color={golden} fontWeight="bold">
                          Tell Me About Your Self
                        </Text>
                      </GridItem>
                      <GridItem colSpan={6}>
                        <HStack spacing={5}>
                          <Textarea
                            size="md"
                            color={golden}
                            variant="flushed"
                            placeholder="Write Something About You"
                            onChange={setAbout}
                            value={bio}
                            isInvalid={correctionList.includes('bio')}
                          />
                        </HStack>
                      </GridItem>
                    </Grid>
                  </Box>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      </Box>
      <Box bg={bgWhite} mx={['0px', '50px', '100px', '150px']} mb={2}>
        <Center py={5}>
          <Stack direction="row" spacing={4}>
            {/* <Button color={golden} colorScheme="red" variant="outline">
              Reset
            </Button> */}

            {correctionList?.length ? (
              <Button
                variant="solid"
                bg={golden}
                colorScheme="white"
                // disabled={true}
                onClick={() => correctionSubmit()}
              >
                Correction Submit
              </Button>
            ) : (
              <Button
                variant="solid"
                bg={golden}
                colorScheme="white"
                onClick={onSubmitHandler}
              >
                Save
              </Button>
            )}
          </Stack>
        </Center>
      </Box>
    </>
  );
});
export default EditProfileComponent;
