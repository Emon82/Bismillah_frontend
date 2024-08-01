import SingleLine from '@/components/main/chat/SingleLine';
import { Grid } from '@chakra-ui/react';
import React from 'react';
import ConvertAvatarUrl from '@/utils/convertAvatarUrl';

const ChatList = ({ myconnection, user, func }: any) => {
  const sort = (...input: string[]) => input.sort().join();
  const data = myconnection?.map((singleProfile: any) => ({
    chatId: sort(singleProfile.id, user),
    recId: singleProfile.id,
    selfId: user,
    avatarUrl: ConvertAvatarUrl(singleProfile?.avatar),
    name: singleProfile.firstName,
    isActive: true,
  }));

  return (
    <div>
      <Grid>
        {data &&
          data.map((singleData: any, index: any) => (
            <SingleLine data={singleData} index={index} func={func} />
          ))}
      </Grid>
    </div>
  );
};

export default ChatList;
