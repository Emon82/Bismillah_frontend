import { Box } from '@chakra-ui/react';
import React from 'react';

const CustomFlatList = ({ loadMoreFun, allMessages, renderMessage }: any) => {
  console.log('flast list');
  // const scrollhnadle = (e:any) => {
  //   console.log(e, 'gg');
  // };
  // // onScroll={(e) => scrollhnadle(e)}
  return (
    <Box>
      {allMessages.map((item: any, index: any) => (
        <span>{renderMessage(item, index)}</span>
      ))}
    </Box>
  );
};

export default CustomFlatList;

// import { Box } from '@chakra-ui/react';
// import React from 'react';
// import {InfiniteLoader, List } from 'react-virtualized';

// const CustomFlatList = ({ loadMoreFun, allMessages, renderMessage }: any) => {
//   console.log('flast list');
//   const scrollhnadle = (e) => {
//     console.log(e,'gg')
//   }
//   const remoteRowCount:any

// function isRowLoaded ({ index }) {
//   return !!allMessages[index];
// }

//   return (
//     <>
//  <InfiniteLoader
//     isRowLoaded={isRowLoaded}
//     loadMoreRows={loadMoreFun}
//     rowCount={remoteRowCount}
//   >
//     {({ onRowsRendered, registerChild }) => (
//       <List
//         height={200}
//         onRowsRendered={onRowsRendered}
//         ref={registerChild}
//         rowCount={remoteRowCount}
//         rowHeight={20}
//         rowRenderer={renderMessage}
//         width={300}
//       />
//     )}
//   </InfiniteLoader>,
//   </>
//   );
// };

// export default CustomFlatList;
