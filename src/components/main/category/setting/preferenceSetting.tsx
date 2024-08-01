import { useRootStore } from '@/models/root-store-provider';
import { golden } from '@/themes/custom.color';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Text,
  Grid,
  GridItem,
  HStack,
  Select,
  RadioGroup,
  Radio,
  Button,
  Input,
  Center,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { resType } from '@/api/schemas/responseType';
import {
  preferenceInput,
  preferenceEditInput,
  getPreference,
} from '@/api/preference/preference';

const PreferenceSetting = observer(() => {
  const toast = useToast();
  const { user } = useRootStore();
  const { selectProfileId, auth } = user;

  const [preferenceData, setPreferenceData] = useState<any>(null);

  const [religion, setReligion] = useState('');
  const [maritalStatus, setMaterialStatus] = useState('');
  const [income, setAnnualIncome] = useState('');
  const [smoke, setSmoke] = useState('No');
  const [drink, setDrink] = useState('No');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [skinTone, setSkinTone] = useState('');

  // api call
  const fetchPreference = async () => {
    const result: any = await getPreference(auth, selectProfileId);
    if (result.code === 200) {
      if (result.details) {
        setPreferenceData(result.details);
        setReligion(result.details.religion);
        setMaterialStatus(result.details.maritalStatus);
        setAnnualIncome(result.details.income);
        setSmoke(result.details.smoke ? 'Yes' : 'No');
        setDrink(result.details.drink ? 'Yes' : 'No');
        setHeight(result.details.height);
        setWeight(result.details.weight);
        setBodyType(result.details.bodyType);
        setSkinTone(result.details.skinTone);
      } else {
        setPreferenceData('');
        setReligion('');
        setMaterialStatus('');
        setAnnualIncome('');
        setSmoke('No');
        setDrink('No');
        setHeight('');
        setWeight('');
        setBodyType('');
        setSkinTone('');
      }
    }
  };

  useEffect(() => {
    if (user.auth) {
      fetchPreference();
    }
    // if profile switching than data will be update for this dependency
  }, [selectProfileId]);

  // if preference data not exists in database than it will be submit
  const submitPreferenceHandler = async () => {
    const submitData = {
      profileId: selectProfileId,
      religion,
      maritalStatus,
      income: Number(income),
      drink: drink === 'Yes',
      smoke: smoke === 'Yes',
      height: Number(height),
      weight: Number(weight),
      bodyType,
      skinTone,
    };

    const res: any = await preferenceInput(submitData, auth);
    if (res?.code === 201) {
      fetchPreference();
      toast({
        title: 'Success',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return null;
    }

    return toast({
      title: 'Submit Failed',
      description: res?.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  // if preference data already exists in database than it will be update
  const UpdatePreferenceHandler = async () => {
    const submitData = {
      profileId: selectProfileId,
      religion: religion === '' ? null : religion,
      maritalStatus: maritalStatus === '' ? null : maritalStatus,
      income: income === '' || income ? null : Number(income),
      drink: drink === 'Yes',
      smoke: smoke === 'Yes',
      height: height === '' || height === '0' ? null : Number(height),
      weight: weight === '' || weight === '0' ? null : Number(weight),
      bodyType: bodyType === '' ? null : bodyType,
      skinTone: skinTone === '' ? null : skinTone,
    };

    const res: any = await preferenceEditInput(submitData, auth);

    if (res?.code === 200) {
      fetchPreference();
      toast({
        title: 'Success',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return null;
    }

    return toast({
      title: 'Save Failed',
      description: res?.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <div>
      <Box
        mx={['5px', '10px', '50px', '150px']}
        boxShadow="dark-lg"
        bg="white"
        borderLeft="10px solid #429EDB "
        borderRight="10px solid #429EDB "
        borderRadius="40px"
      >
        <Text fontSize="20px" pt="5" pl="5" color={golden} fontWeight="bold">
          Tell us what you are looking for in a life partner
        </Text>
        <Box py="18px">
          <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
            <GridItem colSpan={2} alignSelf="center">
              <Text color={golden}>Marital Status</Text>
            </GridItem>
            <GridItem colSpan={6}>
              <HStack spacing={5}>
                <Select
                  variant="outline"
                  placeholder="Status"
                  onChange={(e) => setMaterialStatus(e.target.value)}
                  value={maritalStatus}
                  color={golden}
                >
                  <option
                    style={{
                      backgroundColor: '#6f5524',
                      color: 'white',
                    }}
                    value="Never_Married"
                  >
                    Never Married
                  </option>
                  <option
                    style={{
                      backgroundColor: '#6f5524',
                      color: 'white',
                    }}
                    value="Divorced"
                  >
                    Divorced
                  </option>
                  <option
                    style={{
                      backgroundColor: '#6f5524',
                      color: 'white',
                    }}
                    value="Widowed"
                  >
                    Widowed
                  </option>
                  <option
                    style={{
                      backgroundColor: '#6f5524',
                      color: 'white',
                    }}
                    value="Awaiting_Divorce"
                  >
                    Awaiting Divorce
                  </option>
                  <option
                    style={{
                      backgroundColor: '#6f5524',
                      color: 'white',
                    }}
                    value=""
                  >
                    Any
                  </option>
                </Select>
              </HStack>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
            <GridItem colSpan={2} alignSelf="center">
              <Text color={golden}>Religion</Text>
            </GridItem>
            <GridItem colSpan={6}>
              <HStack spacing={5}>
                <Select
                  value={religion}
                  variant="outline"
                  placeholder="Religion"
                  onChange={(e) => setReligion(e.target.value)}
                  color={golden}
                >
                  <option
                    style={{
                      backgroundColor: '#6f5524',
                      color: 'white',
                    }}
                    value="Islam"
                  >
                    Islam
                  </option>
                  <option
                    style={{
                      backgroundColor: '#6f5524',
                      color: 'white',
                    }}
                    value="Christianity"
                  >
                    Christianity
                  </option>
                  <option
                    style={{
                      backgroundColor: '#6f5524',
                      color: 'white',
                    }}
                    value="Buddhism"
                  >
                    Buddhism
                  </option>
                  <option
                    style={{
                      backgroundColor: '#6f5524',
                      color: 'white',
                    }}
                    value="Hinduism"
                  >
                    Hinduism
                  </option>
                  <option
                    style={{
                      backgroundColor: '#6f5524',
                      color: 'white',
                    }}
                    value="Judaism"
                  >
                    Judaism
                  </option>
                  <option
                    style={{
                      backgroundColor: '#6f5524',
                      color: 'white',
                    }}
                    value="Other"
                  >
                    Other
                  </option>
                  <option
                    style={{
                      backgroundColor: '#6f5524',
                      color: 'white',
                    }}
                    value=""
                  >
                    Any
                  </option>
                </Select>
              </HStack>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
            <GridItem colSpan={2} alignSelf="center">
              <Text color={golden}>Annual Income (USD) UpTo</Text>
            </GridItem>
            <GridItem colSpan={6}>
              <HStack spacing={5}>
                <Input
                  size="sm"
                  variant="flushed"
                  type="number"
                  placeholder="Enter Annual Income (USD"
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  value={income}
                  color={golden}
                />
              </HStack>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
            <GridItem colSpan={2} alignSelf="center">
              <Text color={golden}>Smoke</Text>
            </GridItem>
            <GridItem colSpan={6}>
              <HStack spacing={5}>
                <RadioGroup
                  value={smoke}
                  onChange={(e: string) => setSmoke(e)}
                  color={golden}
                >
                  <Radio colorScheme="green" value="Yes" mr={3} color={golden}>
                    Yes
                  </Radio>
                  <Radio colorScheme="green" value="No" color={golden}>
                    No
                  </Radio>
                </RadioGroup>
              </HStack>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
            <GridItem colSpan={2} alignSelf="center">
              <Text color={golden}>Drink</Text>
            </GridItem>
            <GridItem colSpan={6}>
              <HStack spacing={5}>
                <RadioGroup
                  value={drink}
                  onChange={(e: string) => setDrink(e)}
                  color={golden}
                >
                  <Radio colorScheme="green" value="Yes" mr={3}>
                    Yes
                  </Radio>
                  <Radio colorScheme="green" value="No">
                    No
                  </Radio>
                </RadioGroup>
              </HStack>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
            <GridItem colSpan={2} alignSelf="center">
              <Text color={golden}>Height (cm) Up To</Text>
            </GridItem>
            <GridItem colSpan={6}>
              <HStack spacing={5}>
                <Input
                  size="sm"
                  variant="flushed"
                  type="number"
                  placeholder="Enter Your Height"
                  onChange={(e) => setHeight(e.target.value)}
                  value={height}
                  color={golden}
                />
              </HStack>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
            <GridItem colSpan={2} alignSelf="center">
              <Text color={golden}>Weight (Kg) Up To</Text>
            </GridItem>
            <GridItem colSpan={6}>
              <HStack spacing={5}>
                <Input
                  size="sm"
                  variant="flushed"
                  type="number"
                  placeholder="Enter Your Weight"
                  onChange={(e) => setWeight(e.target.value)}
                  value={weight}
                  color={golden}
                />
              </HStack>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
            <GridItem colSpan={2} alignSelf="center">
              <Text color={golden}>Body Type</Text>
            </GridItem>
            <GridItem colSpan={6}>
              <HStack spacing={5}>
                <Select
                  variant="outline"
                  placeholder="Select Body type"
                  onChange={(e) => setBodyType(e.target.value)}
                  value={bodyType}
                  color={golden}
                >
                  <option value="Slim">Slim</option>
                  <option value="Fat">Fat</option>
                  <option value="Athletic">Athletic</option>
                  <option value="">Any</option>
                </Select>
              </HStack>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(8, 1fr)" mx={['15px', '40px']} mb={7}>
            <GridItem colSpan={2} alignSelf="center">
              <Text color={golden}>Skin Tone</Text>
            </GridItem>
            <GridItem colSpan={6}>
              <HStack spacing={5}>
                <Select
                  variant="outline"
                  placeholder="Select Skin tone"
                  onChange={(e) => setSkinTone(e.target.value)}
                  value={skinTone}
                  color={golden}
                >
                  <option value="Fair">Fair</option>
                  <option value="Honey">Honey</option>
                  <option value="Ivory">Ivory</option>
                  <option value="Black">Brown</option>
                  <option value="Black">Dark</option>
                  <option value="">Any</option>
                </Select>
              </HStack>
            </GridItem>
          </Grid>
        </Box>

        <Center>
          {!preferenceData ? (
            <Button
              mb="5"
              variant="solid"
              bg={golden}
              colorScheme="white"
              onClick={() => submitPreferenceHandler()}
            >
              Submit
            </Button>
          ) : (
            <Button
              mb="5"
              variant="solid"
              bg={golden}
              colorScheme="white"
              onClick={() => UpdatePreferenceHandler()}
            >
              Save & Continue
            </Button>
          )}
        </Center>
      </Box>
    </div>
  );
});

export default PreferenceSetting;
