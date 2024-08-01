import { golden } from '@/themes/custom.color';
import {
  Box,
  HStack,
  Radio,
  RadioGroup,
  Select,
  Text,
  Grid,
  Button,
  Stack,
  Center,
  GridItem,
  useToast,
} from '@chakra-ui/react';
import React, { MouseEvent, useCallback } from 'react';
import { searchInput } from '@/api/search/search';
import useInput from '../../hooks/use-input';

export const Search = () => {
  const toast = useToast();
  const [gender, setGender] = useInput('');
  const [ageFrom, setAgeFrom] = useInput('');
  const [ageTo, setAgeTo] = useInput('');
  const [minHeight, setHeight] = useInput('');
  const [maxHeight, setMaxHeight] = useInput('');
  const [minWeight, setMinWeight] = useInput('');
  const [maxWeight, setMaxWeight] = useInput('');
  const [materialStatus, setMaterialStatus] = useInput('');
  const [haveChildren, setHaveChildren] = useInput('');
  const [religion, setReligion] = useInput('');
  const [motherTongue, setMotherTongue] = useInput('');
  const [community, setCommunity] = useInput('');
  const [states, setStates] = useInput('');
  const [city, setCity] = useInput('');
  const [food, setFood] = useInput('');
  const [salaryForm, setSalaryFrom] = useInput('');
  const [salaryTo, setSalaryTo] = useInput('');

  const searchHandler = useCallback(
    async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      const data = {
        gender,
        ageFrom,
        ageTo,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        materialStatus,
        haveChildren,
        religion,
        motherTongue,
        community,
        states,
        city,
        food,
        salaryForm,
        salaryTo,
      };
      const res = await searchInput(data);
      console.log(res);
      if (res?.status === 200) {
        console.log(res.details);
        // user.logIn(res.details);
        toast({
          title: 'Search Result',
          description: res.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        return null;
        // setIdentity('');
        // setPassword('');
        // return router.push('/main');
      }
      if (res?.status === 404) {
        return toast({
          title: 'Search faild',
          description: res?.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      console.log(data);
      return data;
    },
    [
      gender,
      ageFrom,
      ageTo,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
      materialStatus,
      haveChildren,
      religion,
      motherTongue,
      community,
      states,
      city,
      food,
      salaryForm,
      salaryTo,
      toast,
    ],
  );

  return (
    <div>
      <Box bg="gray.50" mx={['0px', '50px', '100px', '300px']} mb={2}>
        <Grid
          templateColumns="repeat(8, 1fr)"
          mx={['15px', '40px']}
          pt={10}
          mb={7}
        >
          <GridItem colSpan={2} alignSelf="center">
            <Text>Looking for</Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <RadioGroup>
                <Radio colorScheme="green" value="Male" mr={3}>
                  Male
                </Radio>
                <Radio colorScheme="green" value="Female">
                  Female
                </Radio>
              </RadioGroup>
            </HStack>
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
          <GridItem colSpan={2} alignSelf="center">
            <Text>Age</Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <Select
                size="sm"
                // variant="outline"
                placeholder="Age from"
                // value={ageFrom}
                onChange={setAgeFrom}
              >
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="21"
                >
                  21
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="22"
                >
                  22
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="23"
                >
                  23
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="24"
                >
                  24
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="25"
                >
                  25
                </option>
              </Select>
              <Select
                size="sm"
                variant="outline"
                placeholder="Age to"
                onChange={setAgeTo}
                // value={ageTo}
              >
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="31"
                >
                  31
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="32"
                >
                  32
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="33"
                >
                  33
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="34"
                >
                  34
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="35"
                >
                  35
                </option>
              </Select>
            </HStack>
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
          <GridItem colSpan={2} alignSelf="center">
            <Text>Height</Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <Select
                size="sm"
                variant="outline"
                placeholder="Min Height"
                onChange={setHeight}
              >
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="4.4"
                >
                  4.4
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="4.5"
                >
                  4.5
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="4.5"
                >
                  4.6
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="4.6"
                >
                  4.7
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="4.7"
                >
                  4.8
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="4.4"
                >
                  4.8
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="4.4"
                >
                  4.9
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="5"
                >
                  5
                </option>
              </Select>
              <Select
                size="sm"
                variant="outline"
                placeholder="Max Height"
                onChange={setMaxHeight}
              >
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="5.4"
                >
                  5.4
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="5.5"
                >
                  5.5
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="5.6"
                >
                  5.6
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="5.7"
                >
                  5.7
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="5.8"
                >
                  5.8
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="5.9"
                >
                  5.9
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="6"
                >
                  6
                </option>
              </Select>
            </HStack>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
          <GridItem colSpan={2} alignSelf="center">
            <Text>Weight</Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <Select
                size="sm"
                variant="outline"
                placeholder="Min Weight"
                onChange={setMinWeight}
              >
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="40"
                >
                  40
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="45"
                >
                  45
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="50"
                >
                  50
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="55"
                >
                  55
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="60"
                >
                  60
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="65"
                >
                  65
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="70"
                >
                  70
                </option>
              </Select>
              <Select
                size="sm"
                variant="outline"
                placeholder="Max Weight"
                onChange={setMaxWeight}
              >
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="55"
                >
                  55
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="60"
                >
                  60
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="65"
                >
                  65
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="70"
                >
                  70
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="75"
                >
                  75
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="80"
                >
                  80
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="85"
                >
                  85
                </option>
              </Select>
            </HStack>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
          <GridItem colSpan={2} alignSelf="center">
            <Text>Marital Status</Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <Select
                size="sm"
                variant="outline"
                placeholder="Options"
                onChange={setMaterialStatus}
              >
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Married"
                >
                  Married
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Unmarried"
                >
                  Unmarried
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Divorced"
                >
                  Divorced
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Dosen't Matter"
                >
                  Dosen&apos;t Matter
                </option>
              </Select>
            </HStack>
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
          <GridItem colSpan={2} alignSelf="center">
            <Text>Have Children?</Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <RadioGroup
              // defaultValue="false"
              // onChange={setHaveChildren}
              >
                <Radio colorScheme="green" value="Doesnt Matters">
                  Dosen&apos;t Matters
                </Radio>
                <Radio colorScheme="green" value="No" mx={4}>
                  No
                </Radio>
                <Radio colorScheme="green" value="Ok, not staying together">
                  Ok, not staying together
                </Radio>
              </RadioGroup>
            </HStack>
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
          <GridItem colSpan={2} alignSelf="center">
            <Text>Religion</Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <Select
                size="sm"
                variant="outline"
                placeholder="Religion"
                onChange={setReligion}
              >
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Muslim"
                >
                  Muslim
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Hindu"
                >
                  Hindu
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Sikh"
                >
                  Sikh
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Urdhu"
                >
                  Urdhu
                </option>
              </Select>
            </HStack>
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
          <GridItem colSpan={2} alignSelf="center">
            <Text>Mother Tongue</Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <Select
                size="sm"
                variant="outline"
                placeholder="Languages"
                onChange={setMotherTongue}
              >
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="English"
                >
                  English
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Bangla"
                >
                  Bangla
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Hindi"
                >
                  Hindi
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="French"
                >
                  French
                </option>
              </Select>
            </HStack>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
          <GridItem colSpan={2} alignSelf="center">
            <Text>Community</Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <Select
                size="sm"
                variant="outline"
                placeholder="Comunities"
                onChange={setCommunity}
              >
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Sunni"
                >
                  Sunni
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Shia"
                >
                  Shia
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Singh"
                >
                  Singh
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Cathlic"
                >
                  Cathlic
                </option>
              </Select>
            </HStack>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
          <GridItem colSpan={2} alignSelf="center">
            <Text>Address</Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <Select
                variant="outline"
                placeholder="States"
                onChange={setStates}
              >
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Alaska"
                >
                  Alaska
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Arizona"
                >
                  Arizona
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="California"
                >
                  California
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Florida"
                >
                  Florida
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Kansas"
                >
                  Kansas
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="New York"
                >
                  New York
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Texas"
                >
                  Texas
                </option>
              </Select>
              <Select
                variant="outline"
                placeholder="Cities"
                // value={city}
                onChange={setCity}
              >
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Los Angeles"
                >
                  Los Angeles
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Chicago"
                >
                  Chicago
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Phoenix"
                >
                  Phoenix
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="San Antonio"
                >
                  San Antonio
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="San Diego"
                >
                  San Diego
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Atlanta"
                >
                  Atlanta
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Miami"
                >
                  Miami
                </option>
              </Select>
            </HStack>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
          <GridItem colSpan={2} alignSelf="center">
            <Text>Food Preference</Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <Select
                size="sm"
                variant="outline"
                placeholder="Food type"
                onChange={setFood}
              >
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="veg"
                >
                  Veg.
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="non veg"
                >
                  Non Veg.
                </option>
                <option style={{ backgroundColor: 'black', color: 'white' }}>
                  Jain Food
                </option>
              </Select>
            </HStack>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
          <GridItem colSpan={2} alignSelf="center">
            <Text>Salary Range (Yearly)</Text>
          </GridItem>
          <GridItem colSpan={6}>
            <HStack spacing={5}>
              <Select
                variant="outline"
                placeholder="Salary from"
                onChange={setSalaryFrom}
              >
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="10k $"
                >
                  10k $
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="15k $"
                >
                  15k $
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="20k $"
                >
                  20k $
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="25k $"
                >
                  25k $
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="30k $"
                >
                  30k $
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="35k $"
                >
                  35k $
                </option>
              </Select>
              <Select
                size="sm"
                variant="outline"
                placeholder="Salary to"
                // value={salaryTo}
                onChange={setSalaryTo}
              >
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="50k $"
                >
                  50k $
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="60k $"
                >
                  60k $
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="70k $"
                >
                  70k $
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="80k $"
                >
                  80k $
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="100k $"
                >
                  100k $
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="120k $"
                >
                  120k $
                </option>
                <option
                  style={{ backgroundColor: 'black', color: 'white' }}
                  value="Infinity"
                >
                  Infinity
                </option>
              </Select>
            </HStack>
          </GridItem>
        </Grid>
        <Center py={5}>
          <Stack direction="row" spacing={4}>
            <Button color={golden} colorScheme="red" variant="outline">
              Reset
            </Button>
            <Button
              variant="solid"
              bg={golden}
              colorScheme="red"
              onClick={searchHandler}
            >
              Search for matches
            </Button>
          </Stack>
        </Center>
      </Box>
    </div>
  );
};
