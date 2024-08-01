import React, { useState, useEffect } from 'react';
import { useRootStore } from '@/models/root-store-provider';
import { observer } from 'mobx-react-lite';
import { golden, bgGray } from '@/themes/custom.color';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, useBreakpointValue, Text, Image } from '@chakra-ui/react';
import { getMatch } from '@/api/profile/getMatch';
import ConvertAvatarUrl from '@/utils/convertAvatarUrl';
import MatchSlider from './main/MatchSlider';

const ImproveProfileBanner = observer(() => {
  const { user } = useRootStore();
  const { selectProfileId } = user;
  const cardSliderResize = useBreakpointValue([50, 30, 30, 28]);
  const [matchData, setMatchData] = useState([]);
  const fetchData = async () => {
    const getMatchResult: any = await getMatch(user.auth, selectProfileId);
    console.log(getMatchResult);
    if (getMatchResult.code === 200) {
      setMatchData(getMatchResult.details);
    }
  };
  useEffect(() => {
    // if token than api call
    if (user.auth) {
      fetchData();
    }
  }, [selectProfileId]);

  console.log(matchData);

  return (
    <div>
      {matchData.length ? (
        <>
          <Box
            boxShadow="md"
            borderRadius="lg"
            bg="white"
            w={['355px', '374px', '420px', '920px']}
            pb="5px"
          >
            <Box py="4px" pl="10px">
              Suggestions For You
            </Box>
            <Box py="8px">
              <Carousel
                autoPlay={true}
                centerMode={true}
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                infiniteLoop={true}
                interval={2000}
                centerSlidePercentage={cardSliderResize}
              >
                {matchData.slice(0, 15).map((data: any) => (
                  <MatchSlider
                    id={data.id}
                    name={data.firstName}
                    image={ConvertAvatarUrl(data.avatar)}
                  />
                ))}
              </Carousel>
            </Box>
          </Box>
        </>
      ) : (
        <Box boxShadow="md" minH="210px" bg="white" rounded="md">
          <Text lineHeight="210px" textAlign="center">
            Suggestions Not Found
          </Text>
        </Box>
      )}
    </div>
  );
});

export default ImproveProfileBanner;
