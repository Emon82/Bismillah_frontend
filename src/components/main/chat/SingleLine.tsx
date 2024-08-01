import { Box, Avatar, AvatarBadge } from '@chakra-ui/react';
import React from 'react';

const SingleLine = (props: any) => {
  const { data, index, func } = props;

  const clickHandler = () => {
    func(data);
  };
  return (
    <>
      {data && data.isActive ? (
        <Box
          className="conversation active"
          onClick={clickHandler}
          key={data.key}
        >
          <Avatar h="35px" w="35px" name={data?.name} src={data?.avatarUrl} />
          <Box className="title-text">{data && data.name}</Box>
        </Box>
      ) : (
        <Box className="conversation" onClick={clickHandler} key={data.key}>
          <Avatar h="35px" w="35px" name={data?.name} src={data?.avatarUrl} />
          <Box className="title-text">{data && data.name}</Box>
        </Box>
      )}
    </>
  );
};

export default SingleLine;
