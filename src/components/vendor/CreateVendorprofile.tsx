import React, { useState, MouseEvent, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRootStore } from '@/models/root-store-provider';
import { observer } from 'mobx-react-lite';
import {
  Grid,
  Box,
  GridItem,
  HStack,
  Text,
  Button,
  Input,
  Textarea,
  useToast,
  Center,
  Select,
} from '@chakra-ui/react';
import { golden, csBackground } from '@/themes/custom.color';
import countryList from '@/api/utils/countryList';
import { createVendorProfileInput } from '@/api/vendor/vendor';
import useInput from '../hooks/use-input';
import CustomCheckbox from './checkBox';

const CreateVendorprofile = observer(() => {
  const toast = useToast();
  const { vendor } = useRootStore();
  const info = vendor.profile;
  // console.log( info?.businessHours[0] , info?.businessHours[1])

  const router = useRouter();
  const [companyName, setCompanyName] = useInput(
    info?.companyName ? info?.companyName : '',
  );
  const [businessDays, setBusinessDays] = useState<any>(
    info?.businessDays ? info?.businessDays : [],
  );
  const [businessType, setBusinessType] = useInput(
    info?.businessType ? info?.businessType : '',
  );
  const [city, setCity] = useInput(info?.city ? info?.city : '');
  const [state, setState] = useInput(info?.state ? info?.state : '');
  const [country, setCountry] = useInput(info?.country ? info?.country : '');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showStartTime, setShowStartTime] = useState(info?.businessHours[0]);
  const [showEndTime, setShowEndTime] = useState(info?.businessHours[1]);
  const [description, setWorkDescription] = useInput(
    info?.description ? info?.description : '',
  );
  const countryListRender = countryList.map((item) => (
    <option value={item.name}>{item.name}</option>
  ));

  const addItem = (d: string) => {
    setBusinessDays(
      businessDays.some((day: string) => day === d)
        ? businessDays.filter((day: string) => day !== d)
        : [...businessDays, d],
    );
  };
  const handleInputChange = (event: any) => {
    addItem(event.target.name);
  };
  const handleStartTime = (e: any) => {
    setShowStartTime(e.target.value);
    console.log(e.target.value);
    const timeSplit = e.target.value.split(':');
    let meridian;
    const h = timeSplit[0];
    let hours = h;
    const m = timeSplit[1];
    const minutes = m;
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours === 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    setStartTime(`${hours}:${minutes}:${meridian}`);
  };

  const handleEndTime = (e: any) => {
    setShowEndTime(e.target.value);
    const timeSplit = e.target.value.split(':');
    let meridian;
    const h = timeSplit[0];
    let hours = h;
    const m = timeSplit[1];
    const minutes = m;
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours === 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    setEndTime(`${hours}:${minutes}:${meridian}`);
  };

  console.log(businessDays.includes('Saturday'));

  const submitHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      if (
        companyName === '' ||
        businessDays === [] ||
        // startTime === '' ||
        // endTime === '' ||
        businessType === '' ||
        city === '' ||
        state === '' ||
        country === '' ||
        description === ''
      ) {
        return toast({
          title: 'Failed',
          description: 'All fields are required',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }

      const data = {
        // id: vendor.details?.id,
        companyName,
        businessDays,
        businessType,
        businessHours: [startTime, endTime],
        city,
        state,
        country,
        description,
      };
      console.log(data);
      const res: any = await createVendorProfileInput(data, vendor.auth);

      if (res?.code === 200) {
        // console.log(res.details);
        vendor.addVendorProfile(res.details);
        toast({
          title: 'Success',
          description: res.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        return null;
        // return router.push('/main');
      }
      return toast({
        title: 'Failed',
        description: res?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
    [
      companyName,
      businessDays,
      businessType,
      startTime,
      endTime,
      city,
      state,
      country,
      description,
      router,
      toast,
    ],
  );

  const handleStartDate = (date: any) => {
    const sdate = date.split(':');
    setShowStartTime(`${sdate[0]}:${sdate[1]}`);
  };

  const handleEndDate = (date: any) => {
    const edate = date.split(':');
    // setShowEndTime(`${edate[0]}:${edate[1]}`)
    let hr;
    if (edate[2] === 'PM') {
      // eslint-disable-next-line radix
      hr = parseInt(edate[0]) + 12;
      setShowEndTime(`${hr}:${edate[1]}`);
    } else {
      setShowEndTime(`${edate[0]}:${edate[1]}`);
    }
  };

  useEffect(() => {
    handleStartDate(info?.businessHours[0]);
    handleEndDate(info?.businessHours[1]);
  }, [info]);

  console.log(showStartTime, showEndTime);

  return (
    <div>
      <Grid
        mt="40px"
        p={['3px', '5px']}
        borderWidth="1px"
        boxShadow="md"
        // bg="white"
        // borderLeft={['2px solid #429EDB', '10px solid #429EDB']}
        // borderRight={['2px solid #429EDB', '10px solid #429EDB']}
        // borderRadius="60px "
        mx={['5px', '10px', '50px', '150px']}
      >
        <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
          <GridItem colSpan={2} alignSelf="center">
            <Text color={golden} fontWeight="bold">
              Business Type
            </Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <Input
                size="md"
                variant="flushed"
                type="text"
                placeholder="Enter Your Business Type"
                onChange={setBusinessType}
                value={businessType}
                color={golden}
              />
            </HStack>
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
          <GridItem colSpan={2} alignSelf="center">
            <Text color={golden} fontWeight="bold">
              Company Name
            </Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <Input
                size="md"
                variant="flushed"
                type="text"
                placeholder="Enter Your Comapny Name"
                onChange={setCompanyName}
                value={companyName}
                color={golden}
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
              Business Country
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
              Business Days
            </Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={3}>
              <CustomCheckbox
                checked={businessDays.includes('Saturday')}
                lebel="Saturday"
                name="Saturday"
                value={businessDays}
                handleInputChange={handleInputChange}
              />
              <CustomCheckbox
                checked={businessDays.includes('Sunday')}
                lebel="Sunday"
                name="Sunday"
                value={businessDays}
                handleInputChange={handleInputChange}
              />
              <CustomCheckbox
                checked={businessDays.includes('Monday')}
                lebel="Monday"
                name="Monday"
                value={businessDays}
                handleInputChange={handleInputChange}
              />
              <CustomCheckbox
                checked={businessDays.includes('Tuesday')}
                lebel="Tuesday"
                name="Tuesday"
                value={businessDays}
                handleInputChange={handleInputChange}
              />
              <CustomCheckbox
                checked={businessDays.includes('Wednesday')}
                lebel="Wednesday"
                name="Wednesday"
                value={businessDays}
                handleInputChange={handleInputChange}
              />
              <CustomCheckbox
                checked={businessDays.includes('Thursday')}
                lebel="Thursday"
                name="Thursday"
                value={businessDays}
                handleInputChange={handleInputChange}
              />
              <CustomCheckbox
                checked={businessDays.includes('Friday')}
                lebel="Friday"
                name="Friday"
                value={businessDays}
                handleInputChange={handleInputChange}
              />
            </HStack>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
          <GridItem colSpan={2} alignSelf="center">
            <Text color={golden} fontWeight="bold">
              Business Hours
            </Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <Input
                size="md"
                color={golden}
                // variant="flushed"
                type="time"
                // placeholder="Enter Your State"
                onChange={handleStartTime}
                value={showStartTime}
              />

              <Input
                size="md"
                color={golden}
                // variant="flushed"
                type="time"
                // placeholder="Enter Your City"
                onChange={handleEndTime}
                value={showEndTime}
              />
            </HStack>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
          <GridItem colSpan={2} alignSelf="center">
            <Text color={golden} fontWeight="bold">
              Write Something Your Work
            </Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <Textarea
                size="md"
                color={golden}
                placeholder="Enter Description"
                onChange={setWorkDescription}
                value={description}
              />
            </HStack>
          </GridItem>
        </Grid>
        <Box>
          <Center py={5}>
            <Button
              color={golden}
              colorScheme="red"
              variant="outline"
              onClick={submitHandler}
            >
              Submit
            </Button>
          </Center>
        </Box>
      </Grid>
    </div>
  );
});

export default CreateVendorprofile;
