import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRootStore } from '@/models/root-store-provider';
import {
  useDisclosure,
  Drawer,
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Box,
  Text,
  Image,
  Avatar,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  InputRightAddon,
  Icon,
  InputLeftAddon,
  HStack,
  Progress,
} from '@chakra-ui/react';
import {
  AiFillPlusCircle,
  AiOutlineSend,
  AiOutlineUpload,
} from 'react-icons/ai';
import { TiArrowBack } from 'react-icons/ti';
import { RiImageAddFill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
// import { AiOutlineUpload } from 'react-icons/bi';
import { MdTextsms } from 'react-icons/md';
import { getConnected } from '@/api/profile/profile';
import ChatList from '@/components/main/chat/ChatList';
import { baseApiUrl } from '@/constants/api';
// import useFirestoreDoc from '@/components/hooks/firebase/use-firestore-doc';
import useFirestoreSubCollection from '@/components/hooks/firebase/use-firestore-sub-collection';
import getReply from '@/components/hooks/firebase/reply';
import { ChatIdentities } from '@/api/types/chatType';
import fetchDetailsOk from '@/api/utils/fetch-details-ok';
import attachmentResolver from '@/utils/convertAvatarUrl';
import fileSize from '@/utils/file-size';
// import initials from '@/utils/initials';
import imageProcess from '@/utils/imageProcess';
import { auth, storage } from '@/components/hooks/firebase/firebase';
import FirebaseFirestoreTypes from '@firebase/firestore-types';
import cuid from 'cuid';
import useAsyncEffect from 'use-async-effect';
import { useAsyncMemo } from 'use-async-memo';
import CustomFlatList from '../CustomFlatList';

type MessageTypes = 'text' | 'image' | 'link' | 'file';

export interface ChatMessage {
  uid: string;
  pid: string;
  type: MessageTypes;
  message: string;
  props?: Record<string, any>;
  [key: string]: any;
}

export interface MetaData {
  members: string[];
  lastMessage: string;
  lastMessageAt: FirebaseFirestoreTypes.Timestamp;
  lastMessageBy: string;
}

export interface Settings {
  hiddenMsg?: string[];
  blockedUser?: string[];
}

interface MessageProps {
  msg: string;
  t: MessageTypes;
  name: string;
  chatId: string;
  onClickFun?: any;
  props?: Record<string, any>;
}

const Message: React.FC<MessageProps> = ({
  msg,
  t,
  name,
  chatId,
  onClickFun,
  props,
}) => {
  const [reply, setReply] = useState<ChatMessage>();
  useAsyncEffect(
    async (isMounted) => {
      if (props?.replyTo) {
        const replyData = await getReply<ChatMessage>(props.replyTo, chatId);
        if (replyData && isMounted()) {
          setReply(replyData);
        }
      }
    },
    // eslint-disable-next-line react/destructuring-assignment
    [props?.replyTo],
  );
  const renderReply = () => {
    if (!reply) {
      return null;
    }
    return (
      <Flex>
        <Box d="flex" className="message-text">
          <Box>
            <Icon as={TiArrowBack} />
          </Box>
          <Box>
            <Text fontWeight="bold">{`Reply to: ${name}`}</Text>
            <Text fontSize="sm">
              {reply.type === 'text' ? reply.message : 'Media Message'}
            </Text>
            <Text fontSize="sm">{msg}</Text>
          </Box>
        </Box>
      </Flex>
    );
  };
  switch (t) {
    case 'image':
      return (
        <>
          {renderReply()}
          <div>
            <Image boxSize="200px" src={msg} alt="Segun Adebayo" />
          </div>
        </>
      );

    default:
      return (
        <>
          {renderReply()}
          <Text className="message-text">{msg}</Text>
        </>
      );
  }
};

const MessageMe: React.FC<MessageProps> = ({
  msg,
  t,
  name,
  chatId,
  onClickFun,
  props,
}) => {
  const [reply, setReply] = useState<ChatMessage>();
  useAsyncEffect(
    async (isMounted) => {
      if (props?.replyTo) {
        const replyData = await getReply<ChatMessage>(props.replyTo, chatId);
        if (replyData && isMounted()) {
          setReply(replyData);
        }
      }
    },
    // eslint-disable-next-line react/destructuring-assignment
    [props?.replyTo],
  );
  const renderReply = () => {
    if (!reply) {
      return null;
    }
    return (
      <Flex>
        <Box d="flex" className="message-text">
          <Box>
            <Icon as={TiArrowBack} />
          </Box>
          <Box>
            <Text fontWeight="bold">{`Reply to: ${name}`}</Text>
            <Text fontSize="sm">
              {reply.type === 'text' ? reply.message : 'Media Message'}
            </Text>
            <Text fontSize="sm">{msg}</Text>
          </Box>
        </Box>
      </Flex>
    );
  };
  switch (t) {
    case 'image':
      return (
        <>
          {renderReply()}
          <div>
            <Image
              boxSize="200px"
              src={msg}
              alt="Segun Adebayo"
              onClick={onClickFun}
            />
          </div>
        </>
      );

    default:
      return (
        <>
          {renderReply()}
          <Text className="message-text">
            <Menu>
              <MenuButton>
                <Icon
                  // onClick={onClickFun}
                  size="sm"
                  mr="8px"
                  as={BsThreeDotsVertical}
                />
              </MenuButton>
              <MenuList>
                {/* <MenuItem >Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem> */}
                <MenuItem onClick={() => onClickFun('delete')}>Delete</MenuItem>
              </MenuList>
            </Menu>
            <span>{msg}</span>
          </Text>
        </>
      );
  }
};

const SingleChatInbox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef;
  const { user } = useRootStore();
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  // const [isOpen, setIsOpen] = React.useState(false);
  // const onClose = () => setIsOpen(false);
  const [msgDeleteId, setMsgDeleteId] = useState<any>(null);
  const [data1, setData1] = useState<any>(null);
  const [myconnection, setConnected] = useState<any>(null);
  const [backupConnectiom, setBackupConnectiom] = useState<any>(null);
  const [inputType, setInpuType] = useState<any>('text');
  const singleData = (data: any) => {
    setData1(data);
  };
  const [uplodedImage, setImage] = useState<any>(null);
  console.log(myconnection);
  // fetch my connected profile
  const fetchMyConnection = async () => {
    const myConnected: any = await getConnected(
      user.auth,
      user.selectProfileId,
    );
    if (myConnected.code === 200) {
      setConnected(myConnected.details);
      setBackupConnectiom(myConnected.details);
    }
  };

  useEffect(() => {
    fetchMyConnection();
  }, [user.selectProfileId]);

  const handleSearch = (e: any) => {
    const keyword = e.target.value.toLowerCase();
    if (keyword.length > 2) {
      const data = myconnection.filter((item: any) =>
        item.firstName.toLowerCase().includes(keyword),
      );
      setConnected(data);
    } else {
      setConnected(backupConnectiom);
    }
  };
  const [typeMessage, setMessage] = useState<any>('');
  const [limit, setLimit] = useState(100);
  const loadMore = useCallback(() => setLimit((l) => l + 10), []);
  const uid = useMemo(() => auth.currentUser?.uid ?? '', []);
  const selfId = data1?.selfId;
  const chatId = data1?.chatId;
  const recId = data1?.recId;
  const initialMetaData = useMemo(
    () => ({
      members: [selfId, recId],
    }),
    [recId, selfId],
  );

  const [messages, metadata, add, update, remove] = useFirestoreSubCollection<
    ChatMessage,
    MetaData
  >(`messages/${chatId}/chats`, initialMetaData, limit);

  const names: any = useAsyncMemo(async () => {
    try {
      if (!metadata || !metadata.members) {
        return;
      }
      const data: ChatIdentities = await fetchDetailsOk(
        `${baseApiUrl}/chat/identity`,
        { profileId: metadata.members },
        'POST',
        200,
        user.auth,
      );
      const clean = Object.fromEntries(
        Object.entries(data).map(([key, identity]) => [
          key === selfId ? 'sender' : 'receiver',
          {
            ...identity,
            avatarUri: identity.avatar
              ? attachmentResolver(identity.avatar)
              : null,
          },
        ]),
      );

      // eslint-disable-next-line consistent-return
      return clean;
    } catch (error) {
      console.log(error);
    }
  }, [metadata, selfId]);

  const hiddnPath = useMemo(() => `settings/${uid}`, [uid]);
  // const [settings, setSettings] = useFirestoreDoc<Settings>(hiddnPath);
  const [progress, setProgress] = useState(50);
  const uploadPhoto = useCallback(async () => {
    try {
      const image: any = await imageProcess(uplodedImage);
      const filename = `${cuid()}.${uplodedImage.name.split('.').pop()}`;

      const str: any = storage.ref(`messages/${chatId}/${selfId}/${filename}`);
      console.log(str);
      const task = str.put(uplodedImage);
      console.log(task);
      task.on('state_changed', (state: any) => {
        if (state.error) {
          throw state.error;
        }
        return setProgress(state.bytesTransferred / state.totalBytes);
      });

      const res = await task;
      if (res.state !== 'success') {
        throw new Error('Failed to upload file.');
      }

      setProgress(0);
      const url = await str.getDownloadURL();
      add({
        uid,
        pid: selfId,
        type: 'image',
        message: url,
        props: {
          size: uplodedImage.size,
          sizestr: fileSize(uplodedImage.size),
          width: image.width,
          height: image.height,
          ratio: image?.width / image?.height,
          filename,
        },
      });
      // sendAdminNotification({ type: 'Photo', text: `${fullname} just added a photo. Click to view!` });
    } catch (error) {
      setProgress(0);
      console.log(error);
    }
  }, [add, uplodedImage, chatId, selfId, uid]);

  const removeDialog = (e: string, id: string) => {
    // setMsgDeleteId(id);
    // setIsOpen(true);
    console.log(e, id);
  };

  const renderMessage: any = (item: any, index: any) => {
    // if (
    //   settings?.hiddenMsg?.includes(item.id) ||
    //   settings?.blockedUser?.includes(item.uid)
    // ) {
    //   return null;
    // }
    const me = item.uid === uid;
    const same = index ? item.uid === messages[index - 1].uid : false;
    const isLikedByMe = item.props?.likes;

    return (
      <>
        {!me ? (
          <div className="message-row other-message">
            <div className="message-content">
              <Avatar
                size="sm"
                name={names?.receiver.name}
                src={names?.receiver.avatarUri}
              />
              <Message
                msg={item.message}
                t={item.type}
                name={names?.receiver.name ?? ''}
                chatId={chatId}
                props={item.props}
              />
            </div>
          </div>
        ) : (
          <div className="message-row you-message">
            <div className="message-content">
              <MessageMe
                msg={item.message}
                t={item.type}
                name={names?.receiver.name ?? ''}
                chatId={chatId}
                onClickFun={(e: string) => removeDialog(e, item.id)}
                props={item.props}
              />
            </div>
          </div>
        )}
      </>
    );
  };
  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Chat Now
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="lg"
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <div>
              <div id="chat-container">
                {/* <div id="chat-title">
           <Avatar h="35px" w="35px" name={data1?.name} src={data1?.avatarUrl} mr="30px" />
          <span> {data1?.name}</span>
        </div> */}

                <div id="chat-message-list">
                  <CustomFlatList
                    loadMoreFun={loadMore}
                    allMessages={messages}
                    renderMessage={renderMessage}
                  />
                </div>
                {/* <div id="chat-form" style={{ display: 'flex' }}>
          <InputGroup d={!data1 ? 'none' : 'flex'}>
            <InputLeftAddon
              fontSize="1.4em"
              children={
                <>
                  <HStack spacing="10px">
                    <Box onClick={() => setInpuType('text')}>
                      <Icon size="sm" as={MdTextsms} />
                    </Box>
                    <Box onClick={() => setInpuType('file')}>
                      <Icon size="sm" as={RiImageAddFill} />
                    </Box>
                  </HStack>
                </>
              }
            />

            {inputType === 'text' && (
              <>
                <Input
                  // size="sm"
                  style={{ paddingLeft: '5px' }}
                  variant="flushed"
                  value={typeMessage}
                  onChange={(e: any) => setMessage(e.target.value)}
                  type="text"
                  placeholder=" Start Typing"
                  onKeyPress={(e: any) => {
                    if (e.key === 'Enter') {
                      add({
                        uid,
                        pid: selfId,
                        type: 'text',
                        message: typeMessage,
                      });
                      setMessage('');
                    }
                  }}
                />
                <InputRightAddon
                  // color="green.500"
                  children={
                    <Icon
                      as={AiOutlineSend}
                      onClick={() => {
                        add({
                          uid,
                          pid: selfId,
                          type: 'text',
                          message: typeMessage,
                        });
                        setMessage('');
                      }}
                    />
                  }
                />
              </>
            )}

            {inputType === 'file' && (
              <>
                <Input
                  variant="flushed"
                  onChange={(e: any) => setImage(e.target.files[0])}
                  type="file"
                  onKeyPress={(e: any) => {
                    if (e.key === 'Enter') {
                      uploadPhoto();
                      setImage(null);
                    }
                  }}
                />
                <InputRightAddon
                  // color="green.500"
                  children={
                    <Icon
                      as={AiOutlineUpload}
                      onClick={() => {
                        uploadPhoto();
                        setImage(null);
                      }}
                    />
                  }
                />
              </>
            )}
          </InputGroup>

        </div> */}
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SingleChatInbox;
