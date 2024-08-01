import { useRootStore } from '@/models/root-store-provider';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  useToast,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { showGalleryImage, deleteGalleryImage } from '@/api/profile/profile';
import InputPhoto from './inputPhoto';
import Gallery from './gallery';

function Index() {
  const { user } = useRootStore();
  const toast = useToast();
  const { auth, selectProfileId } = user;
  const [galleryImage, setGalleryImage] = useState([]);
  const fetchData = async () => {
    const result: any = await showGalleryImage(auth, selectProfileId);
    console.log(result);
    if (result.code === 200) {
      setGalleryImage(result.details.gallery);
    }
  };

  const deleteImageHandle = async (id: string) => {
    const res: any = await deleteGalleryImage(auth, {
      profileId: selectProfileId,
      id,
    });
    // console.log(res)
    if (res.code === 200) {
      fetchData();
      toast({
        title: 'Success',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      toast({
        title: 'Delete failed',
        description: res.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    if (auth) {
      fetchData();
    }
  }, []);

  return (
    <Box>
      <Box
        //  mx={['5px', '10px', '200px', '200px']}
        boxShadow="md"
        bg="white"
        borderLeft="10px solid #429EDB "
        borderRight="10px solid #429EDB "
        borderRadius="40px"
        my="13px"
      >
        <Tabs isFitted variant="enclosed" size="sm">
          <TabList mb="1em">
            <Tab>Upload</Tab>
            <Tab onClick={() => fetchData()}> Gallery</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <InputPhoto />
            </TabPanel>
            <TabPanel>
              <Gallery
                galleryImage={galleryImage}
                deleteImageHandle={deleteImageHandle}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

export default Index;
